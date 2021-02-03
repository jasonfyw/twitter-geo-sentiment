from pymongo import MongoClient
import gridfs
import os
from dotenv import load_dotenv, find_dotenv


"""
MongoDB setup
"""
# load MongoDB details as environmental variables from .env file
load_dotenv(find_dotenv())
MONGODB_URI = os.environ.get('MONGODB_URI')
DB_NAME = os.environ.get('DB_NAME')

# create MongoDB client, connect to queries collection in given database
client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
fs = gridfs.GridFS(db)
queries = db.queries


"""
Make query JSON serialisable
"""

# make a document object json serialisable
def serialise_id(query):
    # extract query create date from ObjectId and store as separate attribute
    # (ObjectId contains information including the time of creation)
    date = query['_id'].generation_time
    query['createtime'] = date

    # cnvert ObjectIds into strings
    query['_id'] = str(query['_id'])
    query['rawtweetsid'] = str(query['rawtweetsid'])

    return query

