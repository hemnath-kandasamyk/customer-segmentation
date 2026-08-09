from flask import Blueprint, request, jsonify

from services.prediction_service import predict, ValidationError

prediction_bp = Blueprint("prediction", __name__)


@prediction_bp.route("/api/predict", methods=["POST"])
def predict_route():
    payload = request.get_json(silent=True)
    if payload is None:
        return jsonify({"success": False, "error": "Invalid or missing JSON body"}), 400

    try:
        result = predict(payload)
        return jsonify(result), 200
    except ValidationError as e:
        return jsonify({"success": False, "error": str(e)}), 400
    except FileNotFoundError as e:
        return jsonify(
            {"success": False, "error": "Prediction service is unavailable right now."}
        ), 503
    except Exception:
        # Never leak stack traces to the client.
        return jsonify(
            {"success": False, "error": "Something went wrong while analyzing this customer."}
        ), 500
