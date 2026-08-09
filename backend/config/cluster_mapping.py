"""
Cluster -> Segment / Risk mapping.

This mapping is NOT arbitrary. It was derived by inspecting the actual
cluster centers produced by the trained K-Means model (see
notebooks/01-kmeans-customer-segmentation.ipynb), which was fit on
two features: Annual Income (k$) and Spending Score (1-100).

Cluster centers (Annual Income, Spending Score):
  0 -> ( 55.30,  49.52)  mid income   / mid spending    -> Standard Customer
  1 -> ( 86.54,  82.13)  high income  / high spending   -> Premium Customer
  2 -> ( 25.73,  79.36)  low income   / high spending   -> Impulsive Spender
  3 -> ( 88.20,  17.11)  high income  / low spending    -> Conservative Customer
  4 -> ( 26.30,  20.91)  low income   / low spending    -> Budget / At-Risk Customer

"Risk" here means engagement / churn risk from a business standpoint
(how likely the customer is to disengage or contribute little value),
NOT a credit or financial-default risk score. This is a cluster-based
customer risk CLASSIFICATION, not a predicted probability.

If the model is retrained on a different dataset, regenerate this
mapping by inspecting model.cluster_centers_ again -- do not assume
these numbers stay valid.
"""

CLUSTER_MAPPING = {
    0: {
        "segment": "Standard Customer",
        "risk": "Medium Risk",
        "description": (
            "Mid-range income and spending. Behaves like a typical customer "
            "with steady but unremarkable engagement."
        ),
    },
    1: {
        "segment": "Premium Customer",
        "risk": "Low Risk",
        "description": (
            "High income paired with high spending. The most valuable and "
            "engaged customer group."
        ),
    },
    2: {
        "segment": "Impulsive Spender",
        "risk": "Medium Risk",
        "description": (
            "Lower income but high spending score. Highly engaged, but "
            "spending may outpace income, which carries some financial risk."
        ),
    },
    3: {
        "segment": "Conservative Customer",
        "risk": "Medium Risk",
        "description": (
            "High income but low spending score. Strong purchasing power that "
            "isn't being converted into engagement -- a good upsell target."
        ),
    },
    4: {
        "segment": "Budget / At-Risk Customer",
        "risk": "High Risk",
        "description": (
            "Low income and low spending. The least engaged group and the "
            "most likely to churn."
        ),
    },
}

# Human-readable feature names, in the exact order the model expects them.
FEATURE_ORDER = ["Annual Income (k$)", "Spending Score (1-100)"]
