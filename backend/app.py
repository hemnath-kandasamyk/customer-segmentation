from flask import Flask, jsonify
from flask_cors import CORS

from routes.prediction import prediction_bp
from routes.analytics import analytics_bp
from routes.model import model_bp
from services.prediction_service import load_model
from services.analytics_service import load_data


def create_app():
    app = Flask(__name__)
    CORS(app)  # allow the static frontend (different origin/port) to call this API

    # Load the model and dataset ONCE at startup, not per-request.
    with app.app_context():
        try:
            load_model()
            load_data()
            app.logger.info("Model and dataset loaded successfully.")
        except FileNotFoundError as e:
            app.logger.warning(f"Startup warning: {e}")

    app.register_blueprint(prediction_bp)
    app.register_blueprint(analytics_bp)
    app.register_blueprint(model_bp)

    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok"}), 200

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"success": False, "error": "Not found"}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"success": False, "error": "Internal server error"}), 500

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
