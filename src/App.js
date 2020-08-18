import React, { Component } from 'react';
import Axios from 'axios';
import ReactTooltip from "react-tooltip";
import { Container } from 'react-bootstrap';

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
    }

    componentDidMount() {
        Axios.get('http://localhost:3000/analyse_sample_tweets')
            .then(res => this.setState({ sentimentByState: res.data }));
    }


    render() {
        const response = this.state.sentimentByState;

        return (
            <div className="App">
                <Container>
                    {
                        !(response === null) && (
                            <React.Fragment>
                                <h1>Showing Twitter sentiment by state for '{response.query}'</h1>
                                <p>Total tweets analysed: {response.total_tweets}</p>
                                <Map sentimentByState={response.results} setTooltipContent={this.setTooltipContent} />

                                <p>
                                    <b>Legend</b> <br />
                                    <i>1 (green) = positive</i> <br />
                                    <i>0 (red) = negative</i>
                                </p>

                                <ReactTooltip>{this.state.tooltipContent}</ReactTooltip>
                            </React.Fragment>
                        )
                    }
                </Container>
            </div>
        );
    }
}

export default App;
