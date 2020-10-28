import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';

import allStates from '../data/allstates.json';


const TextInput = styled.input`
    width: 100%;
    padding: 0.75rem;
    margin-top: 0.5rem;

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
    margin-bottom: 0;
    margin-top: 1rem;
`;

const SubmitButton = styled(Button)`
    margin-top: 1.5rem;
    margin-bottom: 1rem;
`;

const LocationSelection = styled.div`
    padding: 0.5rem;
    margin-bottom: 1rem;
    overflow-x: hidden;
    overflow-y: auto;
    height: 10rem;

    background-color: white;
    border-radius: 5px;
`;
const LocationSelectionList = styled.ul`
    list-style-type: none;
    padding-left: 0rem;
`;
const LocationCheckbox = styled.input`
    margin: 3px;
    margin-right: 1rem;
`;
const LocationLabel = styled.label`
    font-size: 0.75rem;
    padding: 0.25rem;
    padding-left: 1rem;
    margin: 0;
    width: 100%;
`;


const RangeSlider = styled.input`
    padding: 0;
    width: 100%;
    height: 5px;

    appearance: none;  
    outline: none;
    background-color: #fff;
    border-radius: 5px;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #434C5E;
    }
    &::-moz-range-thumb {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #434C5E;
    }
`;
const NumberInput = styled.input`
    width: 4rem;
    padding: 0.4rem;
    margin-top: 0.3rem;

    outline: none !important;
    border: none;
    border-radius: 5px;
    
    &:focus {
        outline: none !important;
        border: none;
    }
`;
const TotalTweetCount = styled.p`
    margin-top: 0.4rem;

    font-size: 0.8rem;
`;


// query form on the sidebar used to create a new query
class QueryForm extends Component {

    state = {
        keywords: '',
        selectedLocations: {},
        selectAll: true,
        tweetsPerLocation: 50
    }

    // calls to parent function to create a new query 
    submitQuery = (e) => {
        e.preventDefault()

        // create a list of the fullnames of the selected locations 
        let locations = [];
        Object.keys(this.state.selectedLocations).forEach(k => {
            if (this.state.selectedLocations[k]) {
                locations.push(k)
            }
        })

        // call parent function to pass up data to top level to create a query
        this.props.createQuery(
            this.state.keywords, 
            this.state.tweetsPerLocation, 
            locations
        )
    }

    componentDidMount() {
        // insert into state a dict to track which locations are selected
        // by default they are all selected
        let selectedLocations = {};
        allStates.forEach(state => { selectedLocations[state.fullname] = true });

        this.setState({
            selectedLocations: selectedLocations
        })
    }

    render() {

        const totalLocations = Object.keys(this.state.selectedLocations).map(k => {
            return this.state.selectedLocations[k]
        }).reduce((total, value) => {
            return total + value
        }, 0)

        // create array of list items with a checkbox and location name
        const locationInputs = allStates.map(state => 
            <li>
                <LocationLabel>
                    <LocationCheckbox 
                        type="checkbox" 
                        checked={this.state.selectedLocations[state.fullname]}
                        onChange={() => {
                            // toggle location's boolean value in state dict
                            // create copy of selectedLocations
                            let newSelectedLocations = this.state.selectedLocations
                            // toggle value and update state
                            newSelectedLocations[state.fullname] = !newSelectedLocations[state.fullname]
                            this.setState({
                                selectedLocations: newSelectedLocations
                            })
                        }}
                    />
                    {state.fullname}
                </LocationLabel>
            </li>
        )

        return (
            <Container>
                {/* text input field for keywords */}
                <form onSubmit={this.submitQuery}>
                    <InputLabel>
                        Query
                        <TextInput 
                            type="text" 
                            value={this.state.keywords} 
                            placeholder="Keywords" 
                            onChange={(e) => this.setState({ keywords: e.target.value })} 
                            required
                        />
                    </InputLabel>


                    <InputLabel>
                        Included locations
                        <LocationLabel>
                            <LocationCheckbox 
                                type="checkbox" 
                                checked={this.state.selectAll}
                                onChange={() => {
                                    // create mutable instance of selectedLocations
                                    let selectedLocations = this.state.selectedLocations;
                                    // change every location to opposite of current selectAll boolean
                                    Object.keys(selectedLocations).forEach(k => {
                                        selectedLocations[k] = !this.state.selectAll;
                                    })
                                    
                                    // update selectedLocations and toggle selectAll
                                    this.setState({
                                        selectedLocations: selectedLocations,
                                        selectAll: !this.state.selectAll
                                    })
                                }}
                            />
                            Select all
                        </LocationLabel>

                        <LocationSelection>
                            <LocationSelectionList>
                                {locationInputs}
                            </LocationSelectionList>
                        </LocationSelection>
                    </InputLabel>



                    <InputLabel>
                        Tweets per location
                        <RangeSlider 
                            type="range"
                            min="1" max="100"
                            step="1"
                            value={this.state.tweetsPerLocation}
                            onChange={e => this.setState({ tweetsPerLocation: e.target.value })}
                        />
                        <NumberInput 
                            type="number"
                            min="1" max="100"
                            step="1"
                            value={this.state.tweetsPerLocation}
                            onChange={e => {
                                this.setState({ tweetsPerLocation: e.target.value })
                            }}
                        /> 
                        <TotalTweetCount><i>Total tweets: {this.state.tweetsPerLocation * totalLocations}</i></TotalTweetCount>
                    </InputLabel>


                    <SubmitButton variant="btn btn-success" type="submit">
                        Submit
                    </SubmitButton>

                </form>
            </Container>
        );
    }
}

export default QueryForm;