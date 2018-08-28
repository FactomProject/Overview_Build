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
      heightsApiReturn: {},
      propsApiReturn: {},
      netInfoApiReturn: {},
      configApiReturn: {},
      addMenu: [],
      colVals: [],
      displayed: ["directoryblockheight", "leaderheight", "entryblockheight", "entryheight", "factomdversion", "factomdapiversion", "NetworkNumber", "NetworkName", "NetworkID"],
      NOTdisplayed: [],
      showMenu: false,
      showMenu2: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.socket = io('localhost:5001');
    this.socket.emit('firstcall') 
  }
  
  

  handleClick(data) {
    if (this.state.displayed.includes(data)) {
      let indexofdata = this.state.displayed.indexOf(data);
      if (indexofdata > -1) {
        this.state.displayed.splice(indexofdata, 1);
      }

      $(`.${data}`).hide('slow');

      this.state.NOTdisplayed.push(data)
      
    } else if (this.state.NOTdisplayed.includes(data)) {
      let indexofdata = this.state.NOTdisplayed.indexOf(data);
      if (indexofdata > -1) {
        this.state.NOTdisplayed.splice(indexofdata, 1);
      }

      $(`.${data}`).show('slow');

      this.state.displayed.push(data)
    }
  }

  toggleDisplay(display) {
    console.log('called toggledisplay')
    // this.setState({
    //   showMenu: display
    // })
  }
  toggleDisplay2(display) {
    this.setState({
      showMenu2: display
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">This is gonna do some sweet stuff</h1>
        </header>
        <div className="row">
          {/* <div className="column"> */}
            {/* <ul className="nav nav-pills">
              <li className="nav-item dropdown" onMouseEnter={() => this.toggleDisplay(true)} onMouseLeave={() => this.toggleDisplay(false)}>
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">Dropdown</a>
                <div className="dropdown-menu"  x-placement="bottom-start" style={{display: this.state.showMenu ? 'block' : 'none', position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(0px, 38px, 0px)'}}>
                  <Menu addMenu={this.state.addMenu} NOTdisplayed={this.state.NOTdisplayed} handleClick={this.handleClick.bind(this)}/>
                </div>
              </li>
            </ul> */}
            
            <Table  rowList={this.state.colVals} displayed={this.state.displayed} />
          {/* </div> */}
        </div>
      </div>
    );
  }
  
}
export default App;
