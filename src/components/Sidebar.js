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

    background-color: #D8DEE9;
`;

class Sidebar extends Component {
    render() {
        return (
            <SidebarWrapper>
                <QueryForm />
            </SidebarWrapper>
        );
    }
}

export default Sidebar;