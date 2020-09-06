import React, { Component } from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';
import Axios from 'axios';

import QueryOutput from './QueryOutput';

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

    componentDidUpdate() {
        if (this.props.newQuery && this.props.newQuery !== this.state.newQuery) {
            console.log(this.props.newQuery)
            this.setState({ 
                loading: true,
                newQuery: this.props.newQuery 
            }, () => {
                // Axios.post('http://localhost:5000/queries', this.props.newQuery)
                //     .then(res => this.setState({
                //         loading: false,
                //         query: res.data
                //     }))
                Axios.get('http://localhost:3000/queries/5f540e79c23cf8bca6ee7199')
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
                        <Spinner animation="grow" variant="dark" />
                    ) : (
                        this.state.showOutput ? (
                            (this.state.query !== null) && (
                                <QueryOutput query={this.state.query} />
                            )
                        ) : (
                            <h1>Create a query</h1>
                        )
                    )
                }
            </ContentWrapper>
        );
    }
}

export default Content;