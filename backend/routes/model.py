from flask import Blueprint, jsonify

from services.prediction_service import load_model
from config.cluster_mapping import CLUSTER_MAPPING, FEATURE_ORDER

model_bp = Blueprint("model", __name__)


@model_bp.route("/api/model-info", methods=["GET"])
def model_info_route():
    try:
        model = load_model()
        return jsonify(
            {
                "algorithm": "K-Means Clustering",
                "learning_type": "Unsupervised Learning",
                "features_used": FEATURE_ORDER,
                "number_of_clusters": int(model.n_clusters),
                "preprocessing": "None (model trained on raw feature values)",
                "model_status": "Pre-trained (loaded once at server startup)",
                "prediction_type": "Cluster-based Customer Risk Classification",
                "note": (
                    "K-Means groups customers by similarity in income and "
                    "spending behavior. Risk status is a business-defined "
                    "interpretation of each cluster, not a predicted probability."
                ),
                "segments": [
                    {"cluster": k, **v} for k, v in sorted(CLUSTER_MAPPING.items())
                ],
            }
        ), 200
    except FileNotFoundError:
        return jsonify({"success": False, "error": "Model is unavailable right now."}), 503
    except Exception:
        return jsonify({"success": False, "error": "Could not load model information."}), 500
