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
        queryInput: ''
    }

    createQuery = () => {
        alert(this.state.queryInput)
    }

    render() {
        return (
            <Container>
                <label>Query</label>
                <TextInput type="text" value={this.state.queryInput} placeholder="Keywords" onChange={(e) => {
                    this.setState({ queryInput: e.target.value })
                }} />

                <SubmitButton variant="btn btn-success" onClick={this.createQuery}>
                    Submit
                </SubmitButton>

            </Container>
        );
    }
}

export default QueryForm;