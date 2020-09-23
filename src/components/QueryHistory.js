import Axios from 'axios';
import React, { Component } from 'react';

// item displaying info for a single query
const QueryItem = (props) => (
    <React.Fragment>
        <p><b>Keyword: </b>{props.data.keywords}</p>
        <p><b>Total tweets: </b>{props.data.totaltweets}</p>
        <button onClick={() => { props.selectQuery(props.data._id) } }>Open query</button>
        <br />
    </React.Fragment>
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
