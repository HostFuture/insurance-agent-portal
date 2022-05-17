from database.database import db, bcrypt, ma


class User(db.Model):
  __tablename__ = "Users"
  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(150))
  last_name = db.Column(db.String(150))
  email = db.Column(db.String(150), unique=True)
  password = db.Column(db.String(1024))

  def __init__(self, first_name, last_name, email, password, id=None):
    self.id = id
    self.first_name = first_name
    self.last_name = last_name
    self.email = email
    self.password = bcrypt.generate_password_hash(password)

  def check_password(self, password):
    return bcrypt.check_password_hash(self.password, password)

  def is_authenticated(self):
    return True
 
  def is_active(self):
    return True

  def is_anonymous(self):
    return False
 
  def get_id(self):
    return self.id
  
  def __repr__(self):
    return "<User %r>" % self.email


class UserSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    fields = ("id", "first_name", "last_name", "email")
    strict = True
    model = User

user_schema = UserSchema(many=False)