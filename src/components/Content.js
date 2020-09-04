import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import ReactTooltip from "react-tooltip";

import Map from './Map';

const ContentWrapper = styled.div`
    width: 80%;
    height: 100vh;
    right: 0;
    top: 0;

    padding: 2rem;

    position: absolute;
`;


class Content extends Component {
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
            <ContentWrapper>
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
            </ContentWrapper>
        );
    }
}

export default Content;