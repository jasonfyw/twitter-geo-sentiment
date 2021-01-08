# twitter-geo-sentiment
twitter-geo-sentiment is web app built with a ReactJS interface connected to a RESTful Flask API to analyse the sentiment of collected geo-tagged tweets, providing data visualisation based upon the collated data.

The Premium 30-day Twitter Search API is used to collect the most recent tweets based on given keywords by location. A naive-bayes sentiment classifier trained on tweets determines the sentiment of individual tweets, which are then aggregated to provide a mean sentiment for a region. A React frontend receives all this and provides data visualisations illustrating sentiment regarding a specific topic across states or countries.

*This repository is the source code for my submission for the IB Computer Science Internal Assessment.*



## Installing
### Prerequisites
* [Twitter API](https://developer.twitter.com/en/docs/getting-started) (sign up and complete approval process – may take a few days)
* [MongoDB Atlas](https://docs.atlas.mongodb.com/getting-started) (create account, create a cluster and connect to database)
* NodeJS

### Dependencies
The JS dependencies of the ReactJS frontend are detailed in `package.json`.

The Python dependencies of the backend API are detailed in `requirements.txt`.

### User installation
Clone the repository in a directory of your choosing:
```
$ git clone https://github.com/jasonfyw/twitter-geo-sentiment.git
```
Change directory into the cloned repository:
```
$ cd twitter-geo-sentiment
```
Then, install the JS dependencies from `package.json` using `npm`:
```
$ npm install
```
Now, change into the `api` directory to set up and enter a virtual Python environment using `venv`:
```
$ cd api
$ python3 -m venv venv
$ source venv/bin/activate
```
We can now safely install the Python dependencies and run the scripts properly. Using `requirements.txt`, we can do this pretty painlessly (although it might take a few minutes):
``` 
$ pip install -r ../requirements.txt
```
### User setup
In the `api` directory, create two files with the following names and content contained within them.

`.env` – this file contains details to access your MongoDB cluster. Paste the following into the file. Then, replace `[your_URI]` with your URI connection string from MongoDB Atlas and `[database_name]` with the name you want to call the database *(note: in your URI, make sure to include your password, as well as the value for `[database_name]`. To avoid an SSL certificate error, add `&ssl=true&ssl_cert_reqs=CERT_NONE` to the end of your URI as well)*:
```
MONGODB_URI=[your_URI]
DB_NAME=[database_name]
```

`twitter_cred.yaml` – this file contains your secret keys for access to the Twitter API. Paste the following, replacing `[consumer_key]` and `[consumer_secret_key]` with the respective values from your Twitter developer account.
```yaml
search_tweets_30_day_dev:
  account_type: premium
  endpoint: https://api.twitter.com/1.1/tweets/search/30day/dev.json
  consumer_key: [consumer_key]
  consumer_secret: [consumer_secret_key]
```

## Usage
You're now able to launch the web app! In the command line, start the backend API on your machine by running:
```
$ yarn start-api
```
Then, open another terminal prompt and navigate to the repository. Then, launch the ReactJS frontend by running:
```
$ npm start
```
You should now be able to access the web app at `http://localhost:3000`. It is also possible to access it from across your local network, however, adjustments need to be made to the API.

## Contributing
As this represents the codebase for my IB Computer Science Internal Assessment, I will not be accepting contributions to this project. That said, feel free to fork this repo and go crazy.
