from flask import Flask

from query import query

# create Flask application interface
app = Flask(__name__)

# register blueprint routes
app.register_blueprint(query)

