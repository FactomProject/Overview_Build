import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import Menu from './components/menu.jsx';
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
      factomd_s: []
    }
    // console.log('props',props)

    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    let that = this;

    this.socket = io('localhost:5001');

    // 'ListOfURLs'
    // this.socket.on('ListOfURLs', function(data) {
    //   console.log("'ListOfURLs': ",data)
    //   that.setState({
    //     factomd_s: data
    //   });
    // })

    this.socket.on('heightsAPI', function(data) {
      that.setState({
        heightsApiReturn: data.result
      });
    })
    this.socket.on('propertiesAPI', function(data) {
      that.setState({
        propsApiReturn: data.result
      })
    })
    this.socket.on('networkinfoAPI', function(data) {
      that.setState({
        netInfoApiReturn: data.result
      })
    })
    this.socket.on('configAPI', function(data) {
      that.setState({
        configApiReturn: data.result
      })
    })
    
    setTimeout(function() {
      for (let i = 0; i <= that.state.NOTdisplayed.length-1; i++) {
        $(`.${that.state.NOTdisplayed[i]}`).hide();
      }
    }, 500)
  }

  getConfigApiInfo(obj) {
    if (obj !== {}) {
      for (var key in obj) {
        if (typeof obj[key] === "object" && !Array.isArray(key)) {
          for (var goingDeeper in obj[key]) {
            if (!this.state.addMenu.includes(goingDeeper)) {
              if (!this.state.displayed.includes(goingDeeper)) {
                this.state.NOTdisplayed.push(goingDeeper)
              }
              this.state.addMenu.push(goingDeeper)
              this.state.colVals.push(obj[key][goingDeeper])
            }
          }
        } else {
          if (!this.state.addMenu.includes(key)) {
            if (!this.state.displayed.includes(key)) {
              this.state.NOTdisplayed.push(key)
            }
            this.state.addMenu.push(key)
            this.state.colVals.push(obj[key])
          }
        }
      }
    }
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
    this.setState({
      showMenu: display
    })
  }


  render() {
    this.getConfigApiInfo(this.state.heightsApiReturn)
    this.getConfigApiInfo(this.state.propsApiReturn)
    this.getConfigApiInfo(this.state.netInfoApiReturn)
    this.getConfigApiInfo(this.state.configApiReturn) 

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">This is gonna do some sweet stuff</h1>
        </header>
        <div className="row">
          <div className="column">
            <ul className="nav nav-pills">
              <li className="nav-item dropdown" onMouseEnter={() => this.toggleDisplay(true)} onMouseLeave={() => this.toggleDisplay(false)}>
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">Dropdown</a>
                <div className="dropdown-menu"  x-placement="bottom-start" style={{display: this.state.showMenu ? 'block' : 'none', position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(0px, 38px, 0px)'}}>
                  <Menu addMenu={this.state.addMenu} NOTdisplayed={this.state.NOTdisplayed} handleClick={this.handleClick.bind(this)}/>
                </div>
              </li>
            </ul>
            <Table headList={this.state.addMenu} rowList={this.state.colVals} NOTdisplayed={this.state.NOTdisplayed} factomds={this.state.factomd_s}/>
          </div>
        </div>
      </div>
    );
  }
}
// ReactDOM.render(<App />, document.getElementById('app'));
export default App;
