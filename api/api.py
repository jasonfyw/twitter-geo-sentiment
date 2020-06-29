from flask import Flask, request
import numpy as np
import os
import pickle
import twitter

app = Flask(__name__)

# unpickle pre-trained NB classifier and vectoriser
clf = pickle.load(open('sentiment_analysis/nb_sentiment_model.p', 'rb'))
vectoriser = pickle.load(open('sentiment_analysis/vectoriser.p', 'rb'))

# instantiate twitter api object
# auth using keys from .env file
api = twitter.Api(
    consumer_key = os.getenv('TWITTER_CONSUMER_KEY'),
    consumer_secret = os.getenv('TWITTER_CONSUMER_SECRET'),
    access_token_key = os.getenv('TWITTER_ACCESS_TOKEN_KEY'),
    access_token_secret = os.getenv('TWITTER_ACCESS_TOKEN_SECRET')
)

# get sentiment from a json array of strings
@app.route('/predict_tweets', methods = ['POST'])
def predict_tweets():
    req = request.get_json()

    predictions = clf.predict(
        vectoriser.transform(req['tweets'])
    )

    # 1: positive outlook, -1: negative outlook
    return {
        'predictions': predictions.tolist()
    }


    