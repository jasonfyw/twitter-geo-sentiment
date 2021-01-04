# twitter-geo-sentiment
twitter-geo-sentiment is web app built with a ReactJS interface connected to a RESTful Flask API to analyse the sentiment of collected geo-tagged tweets, providing data visualisation based upon the collated data.

The Premium 30-day Twitter Search API is used to collect the most recent tweets based on given keywords by location. A naive-bayes sentiment classifier trained on tweets determines the sentiment of individual tweets, which are then aggregated to provide a mean sentiment for a region. A React frontend receives all this and provides data visualisations illustrating sentiment regarding a specific topic across states or countries.

*This repository is the source code for my submission for the IB Computer Science Internal Assessment.*