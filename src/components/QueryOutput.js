import React, { Component } from 'react';
import Axios from 'axios';
import ReactTooltip from "react-tooltip";
import { Spinner } from 'react-bootstrap';

import Map from './Map';

class QueryOutput extends Component {
    state = {
        loading: null,
        sentimentByState: null,
        tooltipContent: ''
    }

    setTooltipContent = (content) => {
        this.setState({ tooltipContent: content })
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            Axios.get('http://localhost:3000/analyse_sample_tweets')
                .then(res => this.setState({ 
                    loading: false,
                    sentimentByState: res.data 
                }));
        })
    }

    render() {
        const response = this.state.sentimentByState;

        return (
            <div>
                {
                    this.state.loading ? (
                        <Spinner animation="grow" variant="dark" />
                    ) : (
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

                    )
                }
            </div>
        );
    }
}

export default QueryOutput;