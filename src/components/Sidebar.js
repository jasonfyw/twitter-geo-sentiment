import React, { Component } from 'react';
import styled from 'styled-components';

import QueryForm from './QueryForm';

const SidebarWrapper = styled.div`
    width: 20%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;

    padding: 1.5rem;

    background-color: #E5E9F0;
`;

const TitleDiv = styled.div`
    margin-bottom: 1.5rem;
`;
const Title = styled.h1`
    font-size: 4rem;
    font-weight: 500;
    margin-bottom: 0rem;
`;

// a wrapper component for QueryForm that contains styling and text for the sidebar 
class Sidebar extends Component {
    render() {
        return (
            <SidebarWrapper>
                <TitleDiv>
                    <Title>TGSAT</Title>
                    <p>Twitter Geo-Sentiment Analysis Tool</p>
                </TitleDiv>

                {/* QueryForm passed a function from parent to call when new query is created */}
                <QueryForm createQuery={this.props.createQuery} />
            </SidebarWrapper>
        );
    }
}

export default Sidebar;