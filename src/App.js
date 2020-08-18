import React, { Component } from 'react';
import Axios from 'axios';
import ReactTooltip from "react-tooltip";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Map from './components/Map';

class App extends Component {
    state = {
        sentimentByState: null,
        tooltipContent: ''
    }

    setTooltipContent = (content) => {
        this.setState({ tooltipContent: content })
        console.log(content)
    }

    componentDidMount() {
        Axios.get('http://localhost:3000/analyse_sample_tweets')
            .then(res => this.setState({ sentimentByState: res.data }));
    }


    render() {
        // const renderedComponent = (this.state.sentimentByState.length > 0) ? <Map sentimentByState={this.state.sentimentByState} /> : <div /> 
        // console.log((this.state.sentimentByState.length > 0) ? 'results' : 'no results')

        const response = this.state.sentimentByState;

        if (response === null) { return null }


        return (
            <div className="App">
                {
                    !(response === null) && (
                        <React.Fragment>
                            <Map sentimentByState={response.results} setTooltipContent={this.setTooltipContent} />
                            <ReactTooltip>{this.state.tooltipContent}</ReactTooltip>
                        </React.Fragment>
                    )
                }
            </div>
        );
    }
}

export default App;
