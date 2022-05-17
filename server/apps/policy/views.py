from re import S
from flask import Blueprint, jsonify, request
from sqlalchemy import create_engine
from flask_jwt_extended import jwt_required, get_jwt_identity
from apps.policy.models import Policy, policies_schema
from database.database import db
from config import DevelopmentConfig
from datetime import datetime
import pandas as pd


policy_view = Blueprint("policy", __name__)


@policy_view.route("/import", methods=["GET"])
@jwt_required()
def import_data():
  try:
    config = DevelopmentConfig()
    df = pd.read_csv("./Insurance Client.csv")
    df["purchase_date"] = df["purchase_date"].apply(lambda x: datetime.strptime(x, "%m/%d/%y"))

    engine = create_engine(config.SQLALCHEMY_DATABASE_URI)
    connection = engine.raw_connection()
    df.to_sql(name="Policies", con=connection, if_exists="append", index=False)
    
    return jsonify({ "message": "Data Imported Successfully", "status": 500 }), 200 
  except BaseException as e:
    return jsonify({ "error": "System Error", "message": str(e), "status": 500 }), 200 


@policy_view.route("/stats", methods=["POST"])
@jwt_required()
def get_stats():
  req = request.get_json(force=True)
  
  if not "query" in req.keys() or len(req["query"]) == 0:
    df = pd.read_sql(db.session.query(Policy).statement, db.session.bind)
  else:
    df = pd.read_sql(db.session.query(Policy).filter(Policy.cusromer_region.in_(req["query"])).statement, db.session.bind)
  
  if df.empty:
    return jsonify({ "error": "No data found", "message": "There is no data available for the query", "status": 404 }), 200

  df.purchase_date = pd.to_datetime(df.purchase_date)
  df["month"] = df.purchase_date.apply(lambda x: datetime(x.year, x.month, 1))
  grouped = df.groupby(by=[ df.month ]).size().reset_index(name="count")
  grouped.month = grouped.month.apply(lambda x: datetime.strftime(x, "%b '%y"))
  
  return jsonify({ "message": f"There are {len(grouped)} month(s) data available for this query", "data": grouped.to_dict(orient="list"), "status": 200 }), 200


@policy_view.route("/find/<id>", methods=["GET"])
@jwt_required()
def find_policy(id):
  policy = Policy.query.filter((Policy.id == id) | (Policy.customer_id == id)).all()

  if not policy:
    return jsonify({ "error": "No data found", "message": "There is no data available for the query", "status": 404 }), 200
  
  return jsonify({ "message": f"There are { len(policy) } policy(ies) data available for this query", "data": policies_schema.dump(policy), "status": 200 }), 200


@policy_view.route("/update/<id>", methods=["POST"])
@jwt_required()
def update_policy(id):
  req = request.get_json(force=True)

  if not "premium" in req.keys() or req["premium"] is None:
    return jsonify({ "error": "Missing Update Criteria", "message": "There is no update criteria available for this query", "status": 404 }), 200
  elif req["premium"] <= 0 or req["premium"] >= 1000000: 
    return jsonify({ "error": "Premium out of range", "message": "The updated premium must be between 0 and 1000000", "status": 500 }), 200
  else:
    policy = Policy.query.get(id)
    policy.premium = req["premium"]
    cdb = db.session.object_session(policy)
    cdb.commit()

    return jsonify({ "message": "Premium is updated successfully", "status": 200 }), 200