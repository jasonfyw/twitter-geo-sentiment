from flask import Blueprint, jsonify, request
import pickle
import re
import json


analyse_tweets = Blueprint('analyse_tweets', __name__)

# unpickle pre-trained classifiers and vectrisers
stock_sa_clf = pickle.load(open('sentiment_analysis/nb_sentiment_model.p', 'rb'))
stock_sa_vectoriser = pickle.load(open('sentiment_analysis/vectoriser.p', 'rb'))

general_sa_clf = pickle.load(open('sentiment_analysis/nb_general_sentiment_model.p', 'rb'))
general_sa_vectoriser = pickle.load(open('sentiment_analysis/vectoriser_general.p', 'rb'))


def process_tweet(text):
    text = text.lower() # convert text to lower-case
    text = re.sub('((www\.[^\s]+)|(https?://[^\s]+))', 'URL', text) # remove URLs
    text = re.sub('@[^\s]+', 'AT_USER', text) # remove usernames
    text = re.sub(r'#([^\s]+)', r'\1', text) # remove the # in #hashtag
    return text


@analyse_tweets.route('/analyse_tweets_list', methods = ['POST'])
def analyse_tweets_list():
    req = request.get_json()

    predictions = general_sa_clf.predict(
        general_sa_vectoriser.transform(req['tweets'])
    )

    # 1: positive outlook, -1: negative outlook
    return {
        'results': predictions.tolist()
    }


@analyse_tweets.route('/analyse_collated_tweets', methods = ['POST'])
def analyse_collated_tweets():
    # TODO – add error handling
    tweets = request.json['tweets']

    collated_predictions = {}

    for state in tweets.keys():
        tweet_texts = []

        for tweet in tweets[state]:
            text = tweet['text']
            processed_text = process_tweet(text)

            tweet_texts.append(processed_text)

        general_sa_predictions = general_sa_clf.predict(
            general_sa_vectoriser.transform(tweet_texts)
        )
        general_sa_predictions = [1 if res == 4 else int(res) for res in general_sa_predictions]

        mean_average = round(sum(general_sa_predictions) / len(general_sa_predictions), 2)
        collated_predictions[state] = {
            "mean": mean_average,
            "raw_predictions": general_sa_predictions
        }


    return jsonify({ 'results': collated_predictions })

@analyse_tweets.route('/analyse_sample_tweets', methods = ['GET'])
def analyse_sample_tweets():

    with open('usa_data_output.txt') as f:
        tweets = json.load(f)

    collated_predictions = {}

    for state in tweets.keys():
        tweet_texts = []

        for tweet in tweets[state]:
            text = tweet['text']
            processed_text = process_tweet(text)

            tweet_texts.append(processed_text)

        general_sa_predictions = general_sa_clf.predict(
            general_sa_vectoriser.transform(tweet_texts)
        )
        general_sa_predictions = [1 if res == 4 else int(res) for res in general_sa_predictions]

        mean_average = round(sum(general_sa_predictions) / len(general_sa_predictions), 5)
        collated_predictions[state] = {
            "mean": mean_average
        }


    return jsonify({ 'results': collated_predictions })


