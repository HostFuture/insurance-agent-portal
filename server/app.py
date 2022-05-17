from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from database import database

# blueprint import
from apps.auth.views import auth_view
from apps.policy.views import policy_view


def create_app():
  app = Flask(__name__)

  # setup with the configuration provided
  app.config.from_object('config.DevelopmentConfig')

  # setup JWT (JSON Web Token) & Bcrypt configuration
  jwt = JWTManager(app)

  # setup all our dependencies
  database.init_app(app)

  # register blueprint
  app.register_blueprint(auth_view, url_prefix="/auth")
  app.register_blueprint(policy_view, url_prefix="/policy")

  # error handler for Not Found (404) error
  @app.errorhandler(404)
  def page_not_found(e):
    return jsonify({ "msg": str(e) }), 404

  return app


if __name__ == "__main__":
  create_app().run()