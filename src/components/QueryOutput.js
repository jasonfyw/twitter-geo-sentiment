import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";
import styled from 'styled-components';

import Map from './Map';

const CloseButton = styled.button`
    width: 2.5rem;
    height: 2.5rem;
    margin: 1.5rem;
    padding: 0.15rem;
    padding-top: 0;
    position: fixed;
    top: 0;
    right: 0;

    border-radius: 50%;
    border: 1px solid black;
    background-color: #fff;
    color: #000;
    font-size: 1.5rem;
    text-align: center;
    transition: 0.35s;

    &:hover {
        background-color: #000;
        color: #fff;
    }
`;


// displays data from query with data visualisations and heatmaps
class QueryOutput extends Component {
    state = {
        tooltipContent: ''
    }

    // function for the heatmap to set a tooltip when mouse hovers over a state
    setTooltipContent = (content) => {
        this.setState({ tooltipContent: content })
    }

    render() {
        const data = this.props.query;

        return (
            <React.Fragment>
                <CloseButton onClick={this.props.hideOutput}>&times;</CloseButton>

                <h1>Showing Twitter sentiment by state for '{data.keywords}'</h1>
                <p>Total tweets analysed: {data.totaltweets}</p>
                <p>Analysis created on <b>{data.createtime}</b></p>

                <Map sentimentByState={data.sentiment} setTooltipContent={this.setTooltipContent} />

                <p>
                    <b>Legend</b> <br />
                    <i>1 (green) = positive</i> <br />
                    <i>0 (red) = negative</i>
                </p>

                {/* wrapper object for the tooltip to work */}
                <ReactTooltip>{this.state.tooltipContent}</ReactTooltip>
            </React.Fragment>
        );
    }
}

export default QueryOutput;