import React, { Component } from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';
import Axios from 'axios';

import QueryOutput from './QueryOutput';
import QueryHistory from './QueryHistory';

const ContentWrapper = styled.div`
    width: 80%;
    height: 100vh;
    right: 0;
    top: 0;

    padding: 2rem;

    position: absolute;
`;

// main area of the application; it will either display a list of all the previously made queries or a particular query
class Content extends Component {

    state = {
        loading: false,
        showOutput: this.props.showOutput,
        query: null,
        newQuery: null
    }


    // communicates with parent component and switches the displayed component from the list view to information pertaining to a single query
    selectQuery = (id) => {
        this.props.setShowOutput(true);

        // change the loading state to true, rendering a loading icon; then makes a request to the API to retrieve a query by a specified id
        // a promise is made by Axios and once the API returns a response, the component's state is updated with the data. The loading state is also changed to false to remove the loading icon and to display the query
        this.setState({
            loading: true
        }, () => {
            // retrieve query by id from API and relay the data to the QueryOutput
            Axios.get('http://localhost:3000/queries/' + id)
                .then(res => this.setState({
                    loading: false,
                    showOutput: true,
                    query: res.data
                }))
        })

    }

    // hide the current output by resetting the stored query
    hideOutput = () => {
        this.setState({ query: null, showOutput: false })
    }

    // componentDidUpdate() is a React life cycle method that executes when an update occurs within the component
    componentDidUpdate() {
        // check if new query has been created 
        // check if the new query is not a duplicate to prevent infinite update loop
        if (this.props.newQuery && this.props.newQuery !== this.state.newQuery) {
            this.setState({ 
                loading: true,
                newQuery: this.props.newQuery 
            }, () => {
                // if valid new query is created, make request to API to generate tweets and analysis
                Axios.post('http://localhost:3000/queries', this.props.newQuery)
                    .then(res => this.setState({
                        loading: false,
                        showOutput: true,
                        query: res.data
                    }))
            })
        }
    }




    render() {

        return (
            <ContentWrapper>
                {
                    this.state.loading ? (
                        // loading animation when the component's loading state is true when awaiting a response from the API
                        <Spinner animation="grow" variant="dark" />
                    ) : (
                        this.state.showOutput ? (
                            // display a query based on data in state
                            (this.state.query !== null) && (
                                <QueryOutput query={this.state.query} hideOutput={this.hideOutput} />
                            )
                        ) : (
                            // display a list of past queries
                            <React.Fragment>
                                <h1>Create a query or select one below</h1>
                                <QueryHistory selectQuery={this.selectQuery} />
                            </React.Fragment>
                        )
                    )
                }
            </ContentWrapper>
        );
    }
}

export default Content;