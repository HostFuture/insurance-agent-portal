from database.database import db, ma
from enum import IntEnum
from marshmallow import fields


class FuelType(IntEnum):
  CNG = 1
  Petrol = 2
  Diesel = 3

class VehicleType(IntEnum):
  A = 1
  B = 2
  C = 3

class GenderType(IntEnum):
  Male = 1
  Female = 2

class RegionType(IntEnum):
  North = 1
  South = 2
  East = 3
  West = 4



class Policy(db.Model):
  __tablename__ = "Policies"
  id = db.Column(db.Integer, primary_key=True)
  purchase_date = db.Column(db.DateTime)
  customer_id = db.Column(db.Integer, nullable=False)
  fuel = db.Column(db.Enum(FuelType), default=FuelType.CNG.name, nullable=False)
  vehicle_segment = db.Column(db.Enum(VehicleType), default=VehicleType.C.name, nullable=False)
  premium = db.Column(db.Integer, nullable=False)
  bodily_injury_liability = db.Column(db.Boolean, default=False, nullable=False)
  personal_injury_protection = db.Column(db.Boolean, default=False, nullable=False)
  property_damage_liability = db.Column(db.Boolean, default=False, nullable=False)
  collision = db.Column(db.Boolean, default=False, nullable=False)
  comprehensive = db.Column(db.Boolean, default=False, nullable=False)
  customer_gender = db.Column(db.Enum(GenderType), default=GenderType.Male.name, nullable=False)
  customer_income_group = db.Column(db.String(10), nullable=False)
  cusromer_region = db.Column(db.Enum(RegionType), default=RegionType.North.name, nullable=False)
  customer_marital_status = db.Column(db.Boolean, default=False, nullable=False)

  def __init__(
    self, 
    id,
    purchase_date, 
    customer_id, 
    fuel, 
    vehicle_segment, 
    premium, 
    bodily_injury_liability, 
    personal_injury_protection,
    property_damage_liability,
    collision,
    comprehensive,
    customer_gender,
    customer_income_group,
    customer_region,
    customer_marital_status
  ):
    self.id = id
    self.purchase_date  = purchase_date 
    self.customer_id  = customer_id 
    self.fuel  = fuel 
    self.vehicle_segment  = vehicle_segment 
    self.premium  = premium 
    self.bodily_injury_liability  = bodily_injury_liability 
    self.personal_injury_protection = personal_injury_protection
    self.property_damage_liability = property_damage_liability
    self.collision = collision
    self.comprehensive = comprehensive
    self.customer_gender = customer_gender
    self.customer_income_group = customer_income_group
    self.customer_region = customer_region
    self.customer_marital_status = customer_marital_status

  def __repr__(self):
    return '<Policy %r>' % self.id


class PolicySchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Policy
  fuel = fields.Str()
  vehicle_segment = fields.Str()
  customer_gender = fields.Str()
  cusromer_region = fields.Str()

policies_schema = PolicySchema(many=True)