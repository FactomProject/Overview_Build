import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import Table from './components/full-table';
import io from 'socket.io-client';
// const io = require('socket.io')();
require('dotenv').config()

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colVals: [],
      displayed: ["directoryblockheight", "leaderheight", "entryblockheight", "entryheight", "factomdversion", "factomdapiversion", "NetworkNumber", "NetworkName", "NetworkID"],
    }
  }

  componentDidMount() {
    this.socket = io('localhost:5001');
    this.socket.emit('firstcall') 
  }
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">This is gonna do some sweet stuff</h1>
        </header>
        <div className="row">
          <Table  rowList={this.state.colVals} displayed={this.state.displayed} />
        </div>
      </div>
    );
  }
  
}
export default App;
