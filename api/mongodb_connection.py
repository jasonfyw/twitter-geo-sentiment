from pymongo import MongoClient
import gridfs
import os
from dotenv import load_dotenv, find_dotenv


"""
MongoDB setup
"""
# load MongoDB details from .env file
load_dotenv(find_dotenv())
MONGODB_URI = os.environ.get('MONGODB_URI')
DB_NAME = os.environ.get('DB_NAME')

# create MongoDB client, connect to queries collection in given db
client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
fs = gridfs.GridFS(db)
queries = db.queries


"""
Make query JSON serialisable
"""

# convert _id field in a document from ObjectId into a serialisable string
def serialise_id(query):
    query['_id'] = str(query['_id'])
    query['rawtweetsid'] = str(query['rawtweetsid'])

    return query

