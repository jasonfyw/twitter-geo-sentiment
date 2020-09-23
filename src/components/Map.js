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

// positional offsets for states too small to have label on its map
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

    getLocationData = (id) => {
        // retrieve state full name
        const stateInfo = allStates.find(s => s.val === id);

        if (stateInfo) {
            const stateName = stateInfo.fullname;
    
            // return data if exists
            const data = {
                fullName: stateName,
                sentiment: (stateName in this.state.sentimentByState) ? this.state.sentimentByState[stateName].mean : null,
                totalTweets: (stateName in this.state.sentimentByState) ? this.state.sentimentByState[stateName].total_tweets : 0
            }
    
            return data
        } else {
            return null
        }


    }

    getColour = (id) => {
        const data = this.getLocationData(id)

        // generate a colour from red to green based on sentiment
        if (data !== null) {
            if (data.sentiment !== null && data.totalTweets > 0) {
                return `hsl(${100 * data.sentiment}, 75%, 45%)`
            }
        }

        // if no data available, set colour to grey
        return 'hsl(0, 4%, 72%)'
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
                                            const data = this.getLocationData(geo.id)
                                            this.props.setTooltipContent(
                                                <span>
                                                    <b>{data.fullName} – {(data.sentiment === null || data.totalTweets === 0) ? 'no data' : data.sentiment}</b>
                                                    <br />
                                                    <i>Tweet count: {data.totalTweets}</i>
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