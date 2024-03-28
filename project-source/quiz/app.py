from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
import os
from flask import Flask, url_for, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/questionnaire/api/v1.0/*": {"origins": "http://localhost:5173"}})

def mkpath(p):
    return os.path.normpath(
        os.path.join(
            os.path.dirname(__file__), p
        )
    )

app.config['SQLALCHEMY_DATABASE_URI'] = ('sqlite:///' + mkpath('./database.db'))

db = SQLAlchemy(app)