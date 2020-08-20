from flask import Flask, request
import numpy as np
import os
import pickle

from retrieve_tweets import retrieve_tweets
from analyse_tweets import analyse_tweets

app = Flask(__name__)

# register blueprint routes
app.register_blueprint(retrieve_tweets)
app.register_blueprint(analyse_tweets)

