import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './components/Sidebar';
import Content from './components/Content';


class App extends Component {
    state = {
        showOutput: false
    }

    createQuery = (keywords) => {
        this.setState({ showOutput: true })
    }


    render() {

        return (
            <div className="App">
                <Sidebar createQuery={this.createQuery} />
                <Content showOutput={this.state.showOutput} />
            </div>
        );
    }
}

export default App;
