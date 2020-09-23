import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';


const TextInput = styled.input`
    width: 100%;
    padding: 0.75rem;
    margin-left: 0.2rem;
    margin-right: 0.5rem;

    outline: none !important;
    border: none;
    border-radius: 5px;
    
    &:focus {
        outline: none !important;
        border: none;
    }
`;
const InputLabel = styled.label`
    padding: 0.25rem;
    padding-right: 0.5rem;
`;

const SubmitButton = styled(Button)`
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`;


// query form on the sidebar used to create a new query
class QueryForm extends Component {

    state = {
        keywords: ''
    }

    // calls to parent function to create a new query 
    submitQuery = () => {
        this.props.createQuery(this.state.keywords)
    }

    render() {
        return (
            <Container>
                {/* text input field for keywords */}
                <InputLabel>Query</InputLabel>
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