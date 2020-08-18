import React, { Component, memo } from 'react';
import { Container } from 'react-bootstrap';
import { geoCentroid } from "d3-geo";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Annotation
} from "react-simple-maps";

import allStates from "../data/allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets = {
    VT: [50, -8],
    NH: [34, 2],
    MA: [30, -1],
    RI: [28, 2],
    CT: [35, 10],
    NJ: [34, 1],
    DE: [33, 0],
    MD: [47, 10],
    DC: [49, 21]
};



class Map extends Component {

    state = {
        sentimentByState: this.props.sentimentByState
    }

    getSentiment = (id) => {
        const data = allStates.find(s => s.val === id);
        if (data) {
            const fullname = data.fullname;

            const sentimentData = this.state.sentimentByState[fullname];
            return sentimentData.mean;
        } else {
            return null
        }
        
    }

    getStateFullname = (id) => {
        const data = allStates.find(s => s.val === id);
        if (data) {
            const fullname = data.fullname;
            return fullname
        } else {
            return null
        }
    }

    getTotalTweets = (id) => {
        const data = allStates.find(s => s.val === id);
        if (data) {
            const fullname = data.fullname;

            const sentimentData = this.state.sentimentByState[fullname];
            return sentimentData.total_tweets;
        } else {
            return null
        }
    }

    getColour = (id) => {
        const sentiment = this.getSentiment(id)

        if (sentiment === null) {
            return 'hsl(0, 4%, 72%)'
        } else {
            return `hsl(${100 * sentiment}, 75%, 45%)`
        }
    }


    render() {
        return (
            <Container>
                <ComposableMap data-tip="" projection="geoAlbersUsa">
                    <Geographies geography={geoUrl}>
                        {({ geographies }) => (
                            <>
                                {geographies.map(geo => (
                                    <Geography
                                        key={geo.rsmKey}
                                        stroke="#FFF"
                                        geography={geo}
                                        fill={this.getColour(geo.id)}
                                        onMouseEnter={() => {
                                            const fullname = this.getStateFullname(geo.id);
                                            const sentiment = this.getSentiment(geo.id);
                                            const totalTweets = this.getTotalTweets(geo.id)
                                            this.props.setTooltipContent(
                                                <span>
                                                    <b>{fullname} – {sentiment}</b>
                                                    <br />
                                                    <i>Tweet count: {totalTweets}</i>
                                                </span>
                                            );
                                        }}
                                        onMouseLeave={() => {
                                            this.props.setTooltipContent("");
                                        }}
                                    />
                                ))}
                                {geographies.map(geo => {
                                    const centroid = geoCentroid(geo);
                                    const cur = allStates.find(s => s.val === geo.id);
                                    return (
                                        <g key={geo.rsmKey + "-name"}>
                                            {cur &&
                                                centroid[0] > -160 &&
                                                centroid[0] < -67 &&
                                                (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                                                    <Marker coordinates={centroid}>
                                                        <text y="2" fontSize={14} textAnchor="middle">
                                                            {cur.id}
                                                        </text>
                                                    </Marker>
                                                ) : (
                                                        <Annotation
                                                            subject={centroid}
                                                            dx={offsets[cur.id][0]}
                                                            dy={offsets[cur.id][1]}
                                                        >
                                                            <text x={4} fontSize={14} alignmentBaseline="middle">
                                                                {cur.id}
                                                            </text>
                                                        </Annotation>
                                                    ))}
                                        </g>
                                    );
                                })}
                            </>
                        )}
                    </Geographies>
                </ComposableMap>
            </Container>
        );
    }
}

export default memo(Map);