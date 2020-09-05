import React, { Component } from 'react';
import styled from 'styled-components';

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

    render() {

        return (
            <ContentWrapper>
                {
                    this.props.showOutput ? (
                        <QueryOutput />
                    ) : (
                        <h1>Create a query</h1>
                    )
                }
            </ContentWrapper>
        );
    }
}

export default Content;