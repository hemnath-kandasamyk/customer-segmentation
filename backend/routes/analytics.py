from flask import Blueprint, jsonify

from services.analytics_service import (
    get_statistics,
    get_segments,
    get_cluster_analysis,
    get_scatter_points,
    get_segment_distribution,
)

analytics_bp = Blueprint("analytics", __name__)


def _safe(fn):
    try:
        return jsonify(fn()), 200
    except FileNotFoundError:
        return jsonify({"success": False, "error": "Dataset is unavailable right now."}), 503
    except Exception:
        return jsonify({"success": False, "error": "Something went wrong loading analytics."}), 500


@analytics_bp.route("/api/statistics", methods=["GET"])
def statistics_route():
    return _safe(get_statistics)


@analytics_bp.route("/api/segments", methods=["GET"])
def segments_route():
    return _safe(lambda: {"segments": get_segments()})


@analytics_bp.route("/api/cluster-analysis", methods=["GET"])
def cluster_analysis_route():
    return _safe(lambda: {"clusters": get_cluster_analysis()})


@analytics_bp.route("/api/scatter-data", methods=["GET"])
def scatter_data_route():
    return _safe(lambda: {"points": get_scatter_points()})


@analytics_bp.route("/api/segment-distribution", methods=["GET"])
def segment_distribution_route():
    return _safe(lambda: {"distribution": get_segment_distribution()})
