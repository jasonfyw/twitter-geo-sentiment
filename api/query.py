from flask import Blueprint, jsonify, request, abort
from bson.objectid import ObjectId
import json

from analyse_tweets import analyse_collated_tweets
from retrieve_tweets import collate_tweets
from mongodb_connection import queries, fs, serialise_id

query = Blueprint('query', __name__)


# generate a new query; store and return results of analysis to MongoDB
@query.route('/queries', methods = ['POST'])
def create_query():
    if not request.json or not 'keywords' in request.json:
        abort(400)

    keywords = request.json['keywords']
    max_tweets_per_request = request.json.get('max_tweets_per_request', 50)

    # collect tweets from twitter API
    tweets = collate_tweets(keywords, max_tweets_per_request)
    # analyse tweets sentiment and get tweet count
    tweet_sentiments, total_tweets = analyse_collated_tweets(tweets)

    # convert raw tweets to stringified json and store in MongoDB using GridFS
    # GridFS is used to store documents larger than 16mb
    # the document is split into and stored as binary chunks which are reconstructed on retrieval
    raw_tweets_id = fs.put(str(json.dumps(tweets)), encoding = 'utf-8')

    # create json object to store query and insert into MongoDB collection
    query = {
        'keywords': keywords,
        'totaltweets': total_tweets,
        'sentiment': tweet_sentiments,
        'rawtweetsid': raw_tweets_id
    }
    # insert new query object into MongoDB and return the query to display to user
    query_id = queries.insert_one(query).inserted_id

    return jsonify({
        'keywords': keywords,
        'totaltweets': total_tweets,
        'sentiment': tweet_sentiments
    }), 201


# get all past queries
@query.route('/queries', methods = ['GET'])
def get_all_queries():
    all_queries = list(queries.find())

    if len(all_queries) == 0:
        abort(404)

    for query in all_queries:
        query = serialise_id(query)


    return jsonify({ 'queries': all_queries })


# get query by id
@query.route('/queries/<string:query_id>', methods = ['GET'])
def get_post(query_id):
    query = queries.find_one({ '_id': ObjectId(query_id) })

    if not query:
        abort(404)

    return jsonify(serialise_id(query))

    


