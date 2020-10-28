import Axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Row, Col } from 'react-bootstrap';


const QueryItemDiv = styled.div`
    margin: 0;
    margin-top: 2rem;
    padding: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;

    border-radius: 5px;
    background-color: #434C5E;
    color: #fff;
`;
const MediumText = styled.p`
    font-size: 1rem;
    padding-bottom: 0.4rem;
    margin-bottom: 0;
    margin-top: 0.2rem;
`;
const SmallText = styled.p`
    font-size: 0.75rem;
    padding-bottom: 0;
    margin-bottom: 0.2rem;
`;

// item displaying info for a single query
const QueryItem = (props) => (
    <QueryItemDiv>
        <Row>
            <Col md="5">
                <MediumText><b>Keyword: </b>{props.data.keywords}</MediumText>
                <SmallText><i>{props.data.createtime}</i></SmallText>
            </Col>
            <Col md="5">
                <MediumText><b>Total tweets: </b>{props.data.totaltweets}</MediumText>
            </Col>
            <Col md="2">
                <Button variant="light" onClick={() => { props.selectQuery(props.data._id) } }>Open query</Button>
            </Col>
        </Row>
    </QueryItemDiv>
)

// displays an interactive list of previous queries when not already displaying a query
class QueryHistory extends Component {
    state = {
        allQueries: [],
        queryItem: []
    }

    // fetch all stored queries from API
    componentDidMount() {
        Axios.get('http://localhost:3000/queries')
            .then(res => this.setState({
                allQueries: res.data.queries
            }))
    }

    render() {
        // create a list of query items based on fetched queries
        const queryItems = this.state.allQueries.map(query => <QueryItem 
            data={query} 
            selectQuery={this.props.selectQuery} 
        />)

        return (
            <div>
                {queryItems}
            </div>
        );
    }
}

export default QueryHistory;
