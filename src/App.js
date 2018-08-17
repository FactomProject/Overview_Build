import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightsApiReturn: {},
      heightArr: [],
      propsApiReturn: {},
      propsArr: [],
      netInfoApiReturn: {},
      netInfoArr: []
    }
    this.getHeightApiInfo = this.getHeightApiInfo.bind(this)
  }
  componentDidMount() {
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: '/heights',
      success: (data) => { 
        this.setState({
          heightsApiReturn: data.result
        })
      }
    });
    
    $.ajax({
      type: "GET", 
      contentType: "application/json",
      url: '/properties',
      success: (data) => {
        this.setState({
          propsApiReturn: data.result
        })
      }
    });
    $.ajax({
      type: "GET", 
      contentType: "application/json",
      url: '/network-info',
      success: (data) => {
        this.setState({
          netInfoApiReturn: data.result
        })
      }
    });
    $.ajax({
      type: "GET",
      contentType: "application/json",
      url: '/config',
      success: (data) => {
        console.log(data.result)
      }
    })
    
  }

  getHeightApiInfo(obj) {
    if (obj !== {}) {
      for(var key in obj) {
        if (!this.state.heightArr.includes(key)) {
          this.state.heightArr.push(key)
          $('.bar').append(`<th>${key}</th>`)
          $('.1').append(`<th class="disline">${obj[key]}</th>`)
        }
      }
    }
  }

  getPropsApiInfo(obj) {
    if (obj !== {}) {
      for(var key in obj) {
        if (!this.state.propsArr.includes(key)) {
          this.state.propsArr.push(key)
          $('.bar').append(`<th>${key}</th>`)
          $('.1').append(`<th class="disline" style={{textAlign: 'center'}}>${obj[key]}</th>`)
        }
      }
    }
  }

  getNetApiInfo(obj) {
    if (obj !== {}) {
      for(var key in obj) {
        if (!this.state.netInfoArr.includes(key)) {
          this.state.netInfoArr.push(key)
          $('.bar').append(`<th>${key}</th>`)
          $('.1').append(`<th class="disline" style={{textAlign: 'center'}}>${obj[key]}</th>`)
        }
      }
    }
  }



  render() {
    const heightsApi = this.getHeightApiInfo(this.state.heightsApiReturn)
    const propsApi = this.getPropsApiInfo(this.state.propsApiReturn)
    const netInfoApi = this.getNetApiInfo(this.state.netInfoApiReturn) 

    $('.nav-item.dropdown').hover(function() {
      let hasShow = $('.dropdown-menu').hasClass('show')
      
      if (!hasShow) {
        $('.dropdown-menu').addClass('show');
      } else if (hasShow) {
        $('.dropdown-menu').removeClass('show');
      }
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">This is gonna do some sweet stuff</h1>
        </header>
        <div className="row">
          <div className="column">
            <ul className="nav nav-pills">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">Dropdown</a>
                <div className="dropdown-menu" x-placement="bottom-start" style={{position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(0px, 38px, 0px)'}}>
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Separated link</a>
                </div>
              </li>
            </ul>
            <table className="hover scroll">
              <thead>
                <tr className="bar">
                  {heightsApi}
                  {propsApi}
                  {netInfoApi}
                </tr>
              </thead>
              <tbody>
                <tr className="1">
                
                </tr>
              </tbody>
              <tbody>
                <tr>
                  
                </tr>
              </tbody>
              <tbody>
                <tr>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
