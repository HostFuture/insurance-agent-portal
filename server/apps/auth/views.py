from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token
from apps.auth.models import User, user_schema
from database.database import db


auth_view = Blueprint("auth", __name__)


@auth_view.route("/register", methods=["GET", "POST"])
def register_user():
  if request.method != "POST":
    return jsonify({ "error": "Method not Allowed", "message": "The method is not allowed for the requested url", "status": 405 }), 200

  req = request.get_json(force=True)
  first_name = req["first_name"]
  last_name = req["last_name"]
  email = req["email"]
  password = req["password"]

  if first_name == "" or last_name == "" or email == "" or password == "":
    return jsonify({ "error": "Missing Mandatory Field", "message": "All the fields are mandatory for this request", "status": 406 }), 200
  
  if User.query.filter_by(email=email).count() > 0:
    return jsonify({ "error": "Existing Account Found", "message": f"There is an user associated with email address { email }", "status": 409 }), 200

  user = User(first_name, last_name, email, password)
  db.session.add(user)
  db.session.commit()

  return jsonify({ "message": f"Your account has been created successfully", "status": 201 }), 200


@auth_view.route("/login", methods=["GET", "POST"])
def login_user():
  if request.method != "POST":
    return jsonify({ "error": "Method not Allowed", "message": "The method is not allowed for the requested url", "status": 405 }), 200

  req = request.get_json(force=True)
  email = req["email"]
  password = req["password"]

  if email == "" or password == "":
    return jsonify({ "error": "Missing Mandatory Field", "message": "All the fields are mandatory for this request", "status": 406 }), 200
  
  user = User.query.filter_by(email=email)

  if user.count() == 0:
    return jsonify({ "error": "No Account Found", "message": f"There is no user account associated with the email address { email }", "status": 404 }), 200

  user = user.first()
  if not user.check_password(password):
    return jsonify({ "error": "Invalid User Credentials", "message": "The email and password combination doesn't match for the user", "status": 401 }), 200

  return jsonify({ 
    "message": "The user is successfully authenticated", 
    "token": { 
      "accessToken": create_access_token(identity=user.id), 
      "refreshToken": create_refresh_token(identity=user.id)
    },
    "status": 200
  }), 200


@auth_view.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh_token():
  try:
    identity = get_jwt_identity()
    access = {
      "accessToken": create_access_token(identity=identity),
      "refreshToken": create_refresh_token(identity=identity)
    }
    return jsonify({ "message": "Successfully refreshed the token", "token": access, "status": 200 }), 200
  except BaseException as error:
    return jsonify({ "error": "Error encounted while token refresh", "message": error, "status": 500 }), 200


@auth_view.route("/user", methods=["GET"])
@jwt_required()
def get_auth_user():
  user_id = get_jwt_identity()
  user = User.query.get(user_id)
  
  if not user:
    return jsonify({ "error": "No Account Found", "message": "There is no user account associated with the user id", "status": 404 }), 200
  
  return jsonify({ "message": "User details found", "user": user_schema.dump(user), "status": 200 }), 200
