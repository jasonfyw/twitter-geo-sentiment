from flask import Blueprint, jsonify, request, abort
from searchtweets import load_credentials, collect_results


# load and generate a bearer token for the Premium Twitter Search API
# keys stored in twitter_cred.yaml 
search_args = load_credentials(
        'twitter_cred.yaml',
        yaml_key = "search_tweets_30_day_dev",
        env_overwrite = False
    )

states_list = ["California", "Colorado", "Connecticut", "New Jersey", "Delaware", "New York", "Pennsylvania"]

"""
Perform searches to the Twitter API for tweets

multiple API requests by location and collate into large collection
@param keywords: string of keywords to search the Twitter API on
@param max_tweets_per_request: integer for the approximate number of tweets to be retrieved for every location
@param locations: an array of strings; the long form name of each location
returns a dictionary with locations as keys and an array of tweet objects as values
"""
def collate_tweets(
    keywords, 
    max_tweets_per_request = 100,
    locations = states_list,
):
    tweets_by_location = {}

    for location in locations:
        query = '{} place:"{}"'.format(keywords, '{}, USA'.format(location))

        tweets = collect_results(
            {
                "query": query
            },
            max_results = max_tweets_per_request,
            result_stream_args = search_args
        )

        tweets_by_location[location] = tweets

    return tweets_by_location
