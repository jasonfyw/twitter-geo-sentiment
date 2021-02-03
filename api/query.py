from flask import Blueprint, jsonify, request, abort
from bson.objectid import ObjectId
import json

from analyse_tweets import analyse_collated_tweets
from retrieve_tweets import collate_tweets
from mongodb_connection import queries, fs, serialise_id

# register a blueprint, an abstraction over the endpoints allowing them to be assigned to the API in api.py
query = Blueprint('query', __name__)


"""
Create a new query

endpoint to generate a new query; to generate sentiment analysis information and to save it into MongoDB
"""
# Flask decorator function to execute create_query() when a POST request is made to the /queries endpoint
@query.route('/queries', methods = ['POST'])
def create_query():
    # validating POST request ensuring a valid request body is provided
    if not request.json or not 'keywords' in request.json:
        abort(400)

    keywords = request.json['keywords']
    max_tweets_per_request = request.json.get('max_tweets_per_request', 50)
    locations = request.json.get('locations', [])

    # collect tweets from twitter API 
    tweets = collate_tweets(keywords, max_tweets_per_request, locations)
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


""" 
Return all previously made queries from database

retrieve all every query document in the database when the /queries endpoint is accessed with a GET request
"""
@query.route('/queries', methods = ['GET'])
def get_all_queries():
    # retrieve all documents in the queries table in the database
    all_queries = list(queries.find())

    # return 404 error if no queries are found
    if len(all_queries) == 0:
        abort(404)

    # convert the ObjectId() object into a string to allow conversion to JSON
    for query in all_queries:
        query = serialise_id(query)


    return jsonify({ 'queries': all_queries })

"""
Return a specific previously made query from database

# get a particular query by a specified id when the /queries/<query_id> endpoint is accessed with a GET request
# where <query_id> is a string
"""
@query.route('/queries/<string:query_id>', methods = ['GET'])
def get_query(query_id):
    # search for one document in the database matching the id provided with the request
    query = queries.find_one({ '_id': ObjectId(query_id) })

    # return 404 error if no query is found 
    if not query:
        abort(404)

    return jsonify(serialise_id(query))

    


