"""
Analytics service.

Reads the labeled customer dataset ONCE at import time and derives all
statistics/segment/analytics numbers from it. Nothing here is
hard-coded -- every count and average is computed from data/customers.csv.
"""

import os
import pandas as pd

from config.cluster_mapping import CLUSTER_MAPPING

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "customers.csv")

_df = None


def load_data():
    global _df
    if _df is None:
        if not os.path.exists(DATA_PATH):
            raise FileNotFoundError(f"Dataset not found at {DATA_PATH}")
        _df = pd.read_csv(DATA_PATH)
    return _df


def get_statistics():
    df = load_data()
    risk_counts = {"Low Risk": 0, "Medium Risk": 0, "High Risk": 0}

    for cluster_id, count in df["Cluster"].value_counts().items():
        mapping = CLUSTER_MAPPING.get(int(cluster_id))
        if mapping:
            risk_counts[mapping["risk"]] += int(count)

    return {
        "total_customers": int(len(df)),
        "total_segments": int(df["Cluster"].nunique()),
        "low_risk": risk_counts["Low Risk"],
        "medium_risk": risk_counts["Medium Risk"],
        "high_risk": risk_counts["High Risk"],
    }


def get_segments():
    df = load_data()
    segments = []

    for cluster_id in sorted(df["Cluster"].unique()):
        subset = df[df["Cluster"] == cluster_id]
        mapping = CLUSTER_MAPPING.get(int(cluster_id), {})
        segments.append(
            {
                "cluster": int(cluster_id),
                "segment": mapping.get("segment", f"Cluster {cluster_id}"),
                "risk": mapping.get("risk", "Unknown"),
                "description": mapping.get("description", ""),
                "customers": int(len(subset)),
                "avg_income": round(float(subset["Annual Income (k$)"].mean()), 2),
                "avg_spending_score": round(
                    float(subset["Spending Score (1-100)"].mean()), 2
                ),
                "avg_age": round(float(subset["Age"].mean()), 2),
            }
        )

    return segments


def get_cluster_analysis():
    df = load_data()
    analysis = []

    for cluster_id in sorted(df["Cluster"].unique()):
        subset = df[df["Cluster"] == cluster_id]
        analysis.append(
            {
                "cluster": int(cluster_id),
                "segment": CLUSTER_MAPPING.get(int(cluster_id), {}).get(
                    "segment", f"Cluster {cluster_id}"
                ),
                "customers": int(len(subset)),
                "avg_age": round(float(subset["Age"].mean()), 2),
                "avg_income": round(float(subset["Annual Income (k$)"].mean()), 2),
                "avg_spending_score": round(
                    float(subset["Spending Score (1-100)"].mean()), 2
                ),
            }
        )

    return analysis


def get_scatter_points():
    """Income vs spending points grouped by cluster, for the scatter chart."""
    df = load_data()
    return [
        {
            "income": float(row["Annual Income (k$)"]),
            "spending_score": float(row["Spending Score (1-100)"]),
            "cluster": int(row["Cluster"]),
            "segment": CLUSTER_MAPPING.get(int(row["Cluster"]), {}).get(
                "segment", f"Cluster {row['Cluster']}"
            ),
        }
        for _, row in df.iterrows()
    ]


def get_segment_distribution():
    df = load_data()
    dist = []
    for cluster_id, count in df["Cluster"].value_counts().sort_index().items():
        mapping = CLUSTER_MAPPING.get(int(cluster_id), {})
        dist.append(
            {
                "segment": mapping.get("segment", f"Cluster {cluster_id}"),
                "count": int(count),
            }
        )
    return dist
