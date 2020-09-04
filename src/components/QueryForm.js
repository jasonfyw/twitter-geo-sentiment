import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';


const TextInput = styled.input`
    padding: 1rem;
`;

class QueryForm extends Component {

    state = {
        queryInput: ''
    }

    render() {
        return (
            <Container>
                <label>Query</label>
                <TextInput type="text" value={this.state.queryInput} placeholder="Keywords" onChange={(e) => {
                    this.setState({ queryInput: e.target.value })
                }} />

                <Button 
                    className="btn btn-success" 
                    type="submit"
                >
                    Submit
                </Button>

            </Container>
        );
    }
}

export default QueryForm;