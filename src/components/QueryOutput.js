import React, { Component } from 'react';
import ReactTooltip from "react-tooltip";

import Map from './Map';

class QueryOutput extends Component {
    state = {
        tooltipContent: ''
    }

    setTooltipContent = (content) => {
        this.setState({ tooltipContent: content })
    }

    render() {
        const data = this.props.query;

        return (
            <React.Fragment>
                <h1>Showing Twitter sentiment by state for '{data.keywords}'</h1>
                <p>Total tweets analysed: {data.totaltweets}</p>

                <Map sentimentByState={data.sentiment} setTooltipContent={this.setTooltipContent} />

                <p>
                    <b>Legend</b> <br />
                    <i>1 (green) = positive</i> <br />
                    <i>0 (red) = negative</i>
                </p>

                <ReactTooltip>{this.state.tooltipContent}</ReactTooltip>
            </React.Fragment>
        );
    }
}

export default QueryOutput;