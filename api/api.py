from flask import Flask, request
import numpy as np
import os
import pickle

from query import query

app = Flask(__name__)

# register blueprint routes
app.register_blueprint(query)

