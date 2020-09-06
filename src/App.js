import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './components/Sidebar';
import Content from './components/Content';


class App extends Component {
    state = {
        showOutput: false,
        query: null
    }

    // pass new query to Content component for it to be created
    submitQuery = (keywords) => {
        const query = {
            keywords: keywords,
            max_tweets_per_request: 20
        }
        this.setState({ 
            showOutput: true,
            query: query
        })
    }


    render() {

        return (
            <div className="App">
                <Sidebar createQuery={this.submitQuery} />
                <Content showOutput={this.state.showOutput} newQuery={this.state.query} />
            </div>
        );
    }
}

export default App;
