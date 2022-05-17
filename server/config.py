import os
from datetime import timedelta

class Config(object):
  DEBUG = False
  TESTING = False
  CSRF_ENABLED = True
  JSON_SORT_KEYS = False
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SECRET_KEY = 'APxCV2UAX5TdzvfvEvlMpQsHkZUoyoJ7'
  JWT_SECRET_KEY = 'VuimWBFu6QhC5kWkw4909wxdvLM5PW6L'

class ProductionConfig(Config):
  DEBUG = False
  JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
  JWT_REFRESH_TOKEN_EXPIRES = timedelta(hours=18)
  SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

class DevelopmentConfig(Config):
  DEBUG=True
  DEVELOPMENT=True
  ENV="development"
  JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=10)
  JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=365)
  SQLALCHEMY_DATABASE_URI="sqlite:///development_database.db"