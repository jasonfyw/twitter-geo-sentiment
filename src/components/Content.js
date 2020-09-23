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


class Content extends Component {

    state = {
        loading: false,
        showOutput: this.props.showOutput,
        query: null,
        newQuery: null
    }

    selectQuery = (id) => {
        // called by QueryHistory
        // communicates with parent component to switch view
        this.props.setShowOutput(true);

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

    componentDidUpdate() {
        // check if new query has been created 
        // check if the new query is not a duplicate to prevent infinite update loop
        if (this.props.newQuery && this.props.newQuery !== this.state.newQuery) {
            console.log(this.props.newQuery)
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
                // Axios.get('http://localhost:3000/queries/5f6b06c984ca15e94f39a1d2')
                //     .then(res => this.setState({
                //         loading: false,
                //         showOutput: true,
                //         query: res.data
                //     }))
            })
        }
    }




    render() {

        return (
            <ContentWrapper>
                {
                    this.state.loading ? (
                        // Loading animation when fetching from API
                        <Spinner animation="grow" variant="dark" />
                    ) : (
                        this.state.showOutput ? (
                            (this.state.query !== null) && (
                                <QueryOutput query={this.state.query} />
                            )
                        ) : (
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