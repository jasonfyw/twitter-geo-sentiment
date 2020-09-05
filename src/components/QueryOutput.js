import React, { Component } from 'react';
import Axios from 'axios';
import ReactTooltip from "react-tooltip";
import { Spinner } from 'react-bootstrap';

import Map from './Map';

class QueryOutput extends Component {
    state = {
        loading: null,
        data: null,
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
                    data: res.data 
                }));
        })
    }

    render() {
        const data = this.state.data;

        return (
            <div>
                {
                    this.state.loading ? (
                        <Spinner animation="grow" variant="dark" />
                    ) : (
                        !(data === null) && (
                            <React.Fragment>
                                <h1>Showing Twitter sentiment by state for '{data.query}'</h1>
                                <p>Total tweets analysed: {data.total_tweets}</p>
    
                                <Map sentimentByState={data.results} setTooltipContent={this.setTooltipContent} />
    
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