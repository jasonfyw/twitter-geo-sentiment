import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './components/Sidebar';
import Content from './components/Content';


class App extends Component {


    render() {

        return (
            <div className="App">
                <Sidebar />
                <Content />
            </div>
        );
    }
}

export default App;
