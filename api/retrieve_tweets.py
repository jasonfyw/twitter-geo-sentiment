from flask import Blueprint, jsonify, request, abort
from searchtweets import load_credentials, collect_results
import json


retrieve_tweets = Blueprint('retrieve_tweets', __name__)

search_args = load_credentials(
        'twitter_cred.yaml',
        yaml_key = "search_tweets_30_day_dev",
        env_overwrite = False
    )

states_list = ["Alaska", "Alabama", "Arkansas", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"]



# multiple API request and collate into large collection
@retrieve_tweets.route('/collate_tweets', methods = ['POST'])
def collate_tweets():
    # TODO – add error handling
    keywords = request.json['keywords']
    save_locally = request.json.get('save_locally', False)

    tweets_by_location = {}

    for state in states_list:
        query = '{} place:"{}"'.format(keywords, '{}, USA'.format(state))

        tweets = collect_results(
            {
                "query": query
            },
            max_results = 100,
            result_stream_args = search_args
        )

        tweets_by_location[state] = tweets

    # dump json to file
    if save_locally:
        with open('data/usa_data_output.txt', 'w+') as output:
            json.dump(tweets_by_location, output)

    return jsonify({ 'tweets': tweets_by_location })


# returns sample tweets saved in file
@retrieve_tweets.route('/get_sample_tweets', methods = ['GET'])
def get_sample_tweets():
    with open('usa_data_output.txt') as f:
        data = json.load(f)

    return jsonify({ 'tweets': data })




