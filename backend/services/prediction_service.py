"""
Prediction service.

Loads the pre-trained K-Means model ONCE at import time and exposes a
single predict(...) function used by the /api/predict route.

IMPORTANT: The trained model (see notebooks/01-kmeans-customer-segmentation.ipynb)
was fit directly on two RAW (unscaled) features:
    - Annual Income (k$)
    - Spending Score (1-100)

No StandardScaler was used during training, so none is applied here.
Introducing one now would silently change the meaning of every cluster
and break parity with the model that was actually trained -- so we
deliberately do not "invent" a scaler that was never part of the
pipeline. If a future model version is trained with a scaler, save it
alongside the model and load it the same way (joblib.load), then call
scaler.transform() -- never scaler.fit_transform() -- here.
"""

import os
import joblib
import pandas as pd

from config.cluster_mapping import CLUSTER_MAPPING, FEATURE_ORDER

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "kmeans_model.pkl")

# Loaded once at startup, not per-request.
_model = None


def load_model():
    global _model
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                f"Model file not found at {MODEL_PATH}. "
                "Train and export it first (see notebooks/)."
            )
        _model = joblib.load(MODEL_PATH)
    return _model


class ValidationError(Exception):
    pass


def validate_input(payload: dict):
    """Validate raw request payload. Raises ValidationError with a
    user-safe message on failure."""
    required = ["annual_income", "spending_score"]
    for field in required:
        if field not in payload or payload[field] in (None, ""):
            raise ValidationError(f"Missing required field: {field}")

    try:
        annual_income = float(payload["annual_income"])
        spending_score = float(payload["spending_score"])
    except (TypeError, ValueError):
        raise ValidationError("annual_income and spending_score must be numeric")

    if annual_income < 0:
        raise ValidationError("annual_income cannot be negative")
    if annual_income > 1000:
        raise ValidationError("annual_income seems out of expected range (0-1000 k$)")

    if not (1 <= spending_score <= 100):
        raise ValidationError("spending_score must be between 1 and 100")

    # Age is optional -- collected for display only, the trained model
    # does not use it as a clustering feature.
    age = payload.get("age")
    if age not in (None, ""):
        try:
            age = float(age)
        except (TypeError, ValueError):
            raise ValidationError("age must be numeric")
        if not (18 <= age <= 100):
            raise ValidationError("age must be between 18 and 100")

    return {
        "annual_income": annual_income,
        "spending_score": spending_score,
        "age": age,
        "customer_name": payload.get("customer_name") or None,
    }


def predict(payload: dict):
    """Validate, build the feature frame in the exact training order,
    run the pre-trained model, and map the cluster to a segment."""
    clean = validate_input(payload)
    model = load_model()

    features = pd.DataFrame(
        [
            {
                "Annual Income (k$)": clean["annual_income"],
                "Spending Score (1-100)": clean["spending_score"],
            }
        ]
    )[FEATURE_ORDER]  # enforce exact training feature order

    cluster = int(model.predict(features)[0])
    mapping = CLUSTER_MAPPING.get(cluster)

    if mapping is None:
        raise RuntimeError(f"No segment mapping configured for cluster {cluster}")

    return {
        "success": True,
        "cluster": cluster,
        "segment": mapping["segment"],
        "risk_status": mapping["risk"],
        "description": mapping["description"],
        "input": clean,
    }
