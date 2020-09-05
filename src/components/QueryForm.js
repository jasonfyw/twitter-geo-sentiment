import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';


const TextInput = styled.input`
    padding: 0.75rem;
    margin-left: 0.5rem;

    outline: none !important;
    border: none;
    border-radius: 5px;
    
    &:focus {
        outline: none !important;
        border: none;
    }
`;

const SubmitButton = styled(Button)`
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`;


class QueryForm extends Component {

    state = {
        keywords: ''
    }

    submitQuery = () => {
        this.props.createQuery(this.state.keywords)
    }

    render() {
        return (
            <Container>
                <label>Query</label>
                <TextInput type="text" value={this.state.keywords} placeholder="Keywords" onChange={(e) => {
                    this.setState({ keywords: e.target.value })
                }} />

                <SubmitButton variant="btn btn-success" onClick={this.submitQuery}>
                    Submit
                </SubmitButton>

            </Container>
        );
    }
}

export default QueryForm;