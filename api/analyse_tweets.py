from flask import Blueprint, jsonify, request
import pickle
import re
import json


# unpickle pre-trained classifiers and vectrisers
stock_sa_clf = pickle.load(open('sentiment_analysis/nb_sentiment_model.p', 'rb'))
stock_sa_vectoriser = pickle.load(open('sentiment_analysis/vectoriser.p', 'rb'))

general_sa_clf = pickle.load(open('sentiment_analysis/nb_general_sentiment_model.p', 'rb'))
general_sa_vectoriser = pickle.load(open('sentiment_analysis/vectoriser_general.p', 'rb'))


# remove unecessary elements from tweet
def process_tweet(text):
    text = text.lower() # convert text to lowercase
    text = re.sub('((www\.[^\s]+)|(https?://[^\s]+))', 'URL', text) # remove URLs
    text = re.sub('@[^\s]+', 'AT_USER', text) # remove usernames
    text = re.sub(r'#([^\s]+)', r'\1', text) # remove the # in hashtags
    return text


# perform sentiment and numerical analysis on a dictionary of tweets with location as keys
def analyse_collated_tweets(tweets):
    collated_predictions = {}
    total_tweets = 0

    # iterate through tweets from each location
    for location in tweets.keys():

        if len(tweets[location]) > 0:

            # extract tweets' text and create an array for every location
            tweet_texts = []
            for tweet in tweets[location]:
                total_tweets += 1

                text = tweet['text']
                processed_text = process_tweet(text)

                tweet_texts.append(processed_text)

            # generate an array of sentiment predictions corresponding to each tweet
            general_sa_predictions = general_sa_clf.predict(
                general_sa_vectoriser.transform(tweet_texts)
            )
            # conver to binary classifiction (0 or 1)
            general_sa_predictions = [1 if res == 4 else int(res) for res in general_sa_predictions]

            # calculate averages
            mean_average = round(sum(general_sa_predictions) / len(general_sa_predictions), 2)

            collated_predictions[location] = {
                "mean": mean_average,
                "total_tweets": len(general_sa_predictions),
                "raw_predictions": list(general_sa_predictions)
            }

        else:
            # if no data present, return empty result for location
            collated_predictions[location] = {
                "mean": 0,
                "total_tweets": 0,
                "raw_predictions": []
            }

    return collated_predictions, total_tweets

