import React, { Component } from 'react';
import '../App.css';
import TableNamesHolder from './tablenames-holder';
import BodyRowHolder from './bodyrow-holder';
import Menu from './menu';
import io from 'socket.io-client';
import $ from 'jquery';

class Table extends Component {
  constructor(props) {
    super(props);
      this.state = {
        headList: [],
        displayed: this.props.displayed,
        displayedAPIs: ['heights', 'properties', 'networkinfo'],
        NOTdisplayed: [],
        rowList: [],
        showMenu: false,
        showMenu2: false,
        fullObj: {},
        menus: []
      }

      this.socket = io('localhost:5001');
  
      let that = this;
      let newObj = {}
      this.socket.on('ListOfURLs', function(data) {
          for (let i = 0; i <= data.length-1; i++) {
              newObj[data[i]] = {};
          }
      })

      this.socket.on('heightsAPIObject', function(data) {
          for (let key in data) {
              newObj[key]['heights'] = {}
              newObj[key]['heights'] = data[key]['heights']
          }
      })

      this.socket.on('propsAPIObject', function(data) {
          for (let key in data) {
              newObj[key]['properties'] = {}
              newObj[key]['properties'] = data[key]['properties']
          }
      })

      this.socket.on('netinfoAPIObject', function(data) {
          for (let key in data) {
              newObj[key]['networkinfo'] = {}
              newObj[key]['networkinfo'] = data[key]['networkinfo']
          }
      })

      this.socket.on('configAPIObject', function(data) {
          for (let key in data) {
              newObj[key]['config'] = {}
              newObj[key]['config'] = data[key]['config']
          }
      })

      setInterval(function() {
          that.getConfigApiInfo(newObj)
      },300)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      displayed: nextProps.displayed
    })
  }
  componentDidMount() {
    this.getAPIdata()
    
  }
  

  getConfigApiInfo(obj) {
    let hugearr = [];
    let hugeHeadList = [];
    let count = 9;
    let newObj = {}
    for (var key in obj) {
      let smallarr = [];
      count = 9;
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        hugearr.push(smallarr)
        for (var goingDeeper in obj[key]) {
          newObj[goingDeeper] = []
          for (var finallygettingvalues in obj[key][goingDeeper]) {
            if (typeof obj[key][goingDeeper][finallygettingvalues] === "object" && !Array.isArray(obj[key])) {
              for (let thisconfigreturnisHUGE in obj[key][goingDeeper][finallygettingvalues]) {
                if(count !== 68) {
                  smallarr.push(obj[key][goingDeeper][finallygettingvalues][thisconfigreturnisHUGE])
                  newObj[goingDeeper].push(thisconfigreturnisHUGE)
                } 
                if (!hugeHeadList.includes(thisconfigreturnisHUGE)) {hugeHeadList.push(thisconfigreturnisHUGE)}
                count++;
              }
            } else {
              newObj[goingDeeper].push(finallygettingvalues)
              smallarr.push(obj[key][goingDeeper][finallygettingvalues])
              if (!hugeHeadList.includes(finallygettingvalues)) {hugeHeadList.push(finallygettingvalues)}
            }
          }
        }
      }
    }

    // console.log(hugearr)
    this.setState({
      rowList: hugearr,
      headList: hugeHeadList,
      fullObj: newObj
    })
    this.getMenus()
  }

  toggleDisplay(display) {
    this.setState({
      showMenu: display
    })
  }
  toggleDisplay2(display) {
    this.setState({
      showMenu2: display
    })
  }
  
  componentDidUpdate(){
    let that = this;
    for (let i = 0; i <= that.state.headList.length; i++) {
      if (!that.state.displayed.includes(that.state.headList[i])) {
        if (!that.state.NOTdisplayed.includes(that.state.headList[i])) {
          that.state.NOTdisplayed.push(that.state.headList[i])
        }
        $(`.${that.state.headList[i]}`).hide();
      }
    }
  }
  

  getAPIdata() {
      this.socket = io('localhost:5001');
      this.socket.emit('firstcall') 
  }

  getMenus() {
    for(let key in this.state.fullObj) {
        if (!this.state.menus.includes(key)) {
            this.state.menus.push(key)
        }
    }
  }

  handleClick(item) {
    this.state.fullObj[item].map((data, i) => {
      if (this.state.displayed.includes(data)) {
        let indexofdata = this.state.displayed.indexOf(data);
        if (indexofdata > -1) {
          this.state.displayed.splice(indexofdata, 1);
        }
  
        $(`.${data}`).hide('slow');
  
        this.state.NOTdisplayed.push(data)
        
      } 
      else if (this.state.NOTdisplayed.includes(data)) {
    let indexofdata = this.state.NOTdisplayed.indexOf(data);
    if (indexofdata > -1) {
      this.state.NOTdisplayed.splice(indexofdata, 1);
    }

    $(`.${data}`).show('slow');

    this.state.displayed.push(data)
  }
    })
  }

    render() {
      // console.log(this.props)
        return (
          <div className="column">
            <div className="nav">
                <div className="nav-pills">
                <div className="btn-group dropright" onMouseEnter={() => this.toggleDisplay(true)} onMouseLeave={() => this.toggleDisplay(false)}>
                  <a role="button" className="nav-link btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">APIs</a>
                    <div className={`dropdown-menu`} style={{display: this.state.showMenu ? 'block' : 'none', position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(0px, 38px, 0px)'}}>
                    
                      {this.state.menus.map((item, i) => {
                        return this.state.displayedAPIs.includes(item) ? (
                          <div className=" dropdown-item" href="#" key={`Menu_item_${i}`}>{item}
                            <a className="switch tiny" key={`Menu_item_${i}`}>
                                <input className="switch-input" onClick={() => this.handleClick(item)} key={`Menu_item_${i}`} id={item} type="checkbox" name={`Switch for ${item}`} defaultChecked/>
                                <label className="switch-paddle" htmlFor={item} />
                            </a>
                            <div className="btn-group dropright" onMouseEnter={() => this.toggleDisplay2(true)} onMouseLeave={() => this.toggleDisplay2(false)}>
                            <a role="button" className="nav-link btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"></a>
                            <div className={`dropdown-menu`} style={{display: this.state.showMenu2 ? 'block' : 'none', position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(0px, 38px, 0px)'}}>
                              <Menu headList={this.state.headList} NOTdisplayed={this.state.NOTdisplayed} displayed={this.state.displayed} toggleDisplay={this.toggleDisplay.bind(this)} showMenu={this.state.showMenu} fullObj={this.state.fullObj[item]} />
                            </div>
                            </div>
                          </div>
                        ) : (
                          <div className="dropdown-item" href="#" key={`Menu_item_${i}`}>{item}
                          {/* <Menu headList={this.state.headList} NOTdisplayed={this.state.NOTdisplayed} displayed={this.state.displayed} toggleDisplay={this.toggleDisplay.bind(this)} showMenu={this.state.showMenu} fullObj={this.state.fullObj}/> */}
                          <a className="switch tiny" key={`Menu_item_${i}`}>
                              <input className="switch-input" onClick={() => this.handleClick(item)} key={`Menu_item_${i}`} id={item} type="checkbox" name={`Switch for ${item}`} />
                              <label className="switch-paddle" htmlFor={item} />
                          </a>
                          </div>
                        )
                      })}

                    </div>
                </div>
                </div>
            </div>
            <table className="hover scroll">
              <thead>
                <TableNamesHolder headList={this.state.headList} NOTdisplayed={this.state.NOTdisplayed}/>
              </thead>
              
              <tbody>
                <BodyRowHolder rowList={this.state.rowList} headList={this.state.headList} NOTdisplayed={this.state.NOTdisplayed} handleClick={this.props.handleClick} />
              </tbody>
            </table>
          </div>
        )
    }
}


export default Table


