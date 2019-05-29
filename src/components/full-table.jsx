import React, { Component } from "react";
import "../App.css";
import TableNamesHolder from "./tablenames-holder";
import BodyRowHolder from "./bodyrow-holder";
import Menu from "./menu";
import io from "socket.io-client";
import $ from "jquery";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headList: [],
      displayed: this.props.displayed,
      displayedAPIs: ["heights", "network-info", "current-minute"],
      NOTdisplayedAPIs: ["configuration", "properties"],
      NOTdisplayed: [],
      rowList: [],
      showMenu: false,
      showMenu2: {},
      fullObj: {},
      menus: [],
      APIToggle: {},
      APIList: [],
      apiObjectforMenu: {},
      first: true,
      OLDData: {},
      count: 0
    };

    this.socket = io("localhost:5001");

    this.componentDidMount = this.componentDidMount.bind(this.socket);

    let that = this;
    let newer_Obj = {};
    let APIList = {};

    this.socket.on("ListOfURLs", function (data) {
      for (let i = 0; i <= data.length - 1; i++) {
        newer_Obj[data[i]] = {};
      }
    });

    this.socket.on("ListOfAPIs", function (data) {
      that.setState({ APIList: data });
      APIList["APIList"] = data;
    });

    this.socket.on("APIObject", function (data) {
      for (let key in data.data) {
        that.state.apiObjectforMenu[data.api] = data.data[key][data.api];

        if (newer_Obj.hasOwnProperty(data.api)) {
          newer_Obj[key][data.api] = data.data[key][data.api];
        } else {
          newer_Obj[key][data.api] = {};
          newer_Obj[key][data.api] = data.data[key][data.api];
        }
      }
    });
    setTimeout(() => {
      setInterval(function () {
        let ObjToUse = {};
        for (let url in newer_Obj) {
          ObjToUse[url] = {};
          for (let i = 0; i <= APIList.APIList.length - 1; i++) {
            ObjToUse[url][APIList.APIList[i].split("/")[0]] = newer_Obj[url][APIList.APIList[i].split("/")[0]];
          }
        }
        if (that.state.first) {
          that.setState({
            first: false
          });
          setTimeout(() => {
            that.setState({
              OLDData: newer_Obj
            });
            that.getConfigApiInfo(ObjToUse, APIList);
          }, 1000);
        } else {
          if (Object.keys(ObjToUse).length !== 0) {
            that.setState({
              OLDData: newer_Obj
            });
            that.getConfigApiInfo(ObjToUse, APIList);
          }
        }
      }, 100);
    }, 1000)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.displayed !== prevState.displayed) {
      return ({ displayed: nextProps.displayed }) // <- this is setState equivalent
    }
    return null;
  }
  componentDidMount() {
    this.emit("firstcall");
    setInterval(() => {
      this.emit("firstcall");
    }, 6000);
  }

  getConfigApiInfo(obj, APIList) {
    let hugeArr = [];
    let hugeHeadList = [];
    let newObj = {};
    let url = "";

    for (let top in obj) {
      url = top;
      if (!hugeHeadList.includes(`IP`)) {
        hugeHeadList.push(`IP`);
      }
      let smallArr = [];
      smallArr.push(`${url}--URL`);
      for (let oneDeep in obj[top]) {
        newObj[oneDeep] = [];
        let apiHolderArrays = this.helper(obj[top][oneDeep], oneDeep);

        for (let i = 0; i < apiHolderArrays.headListHolder.length; i++) {
          if (!hugeHeadList.includes(apiHolderArrays.headListHolder[i])) {
            hugeHeadList.push(apiHolderArrays.headListHolder[i])
          }
        }
        smallArr = smallArr.concat(apiHolderArrays.hugeValueHolder);
        newObj[oneDeep] = apiHolderArrays.headListHolder;
      }
      hugeArr.push(smallArr);
    }

    if (hugeHeadList.length > 0) {
      this.setState({
        rowList: hugeArr,
        headList: hugeHeadList,
        fullObj: newObj
      });
      this.getMenus();
    }
  }

  helper = (obj, api) => {
    let headListHolder = [];
    let hugeValueHolder = [];
    for (let key in obj) {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        headListHolder.push(`${key}--${api}`);
        hugeValueHolder.push(`${JSON.stringify(obj[key])}--${api}`)
      } else {
        headListHolder.push(`${key}--${api}`);
        hugeValueHolder.push(`${obj[key]}--${api}`);
      }
    }

    return { "headListHolder": headListHolder, "hugeValueHolder": hugeValueHolder };
  }

  toggleDisplay(display) {
    this.setState({
      showMenu: display
    });
  }
  toggleAPIMenuDisplay(display, menu) {
    this.state.showMenu2[menu] = display;
  }

  getMenus() {
    for (let key in this.state.fullObj) {
      if (!this.state.menus.includes(key)) {
        this.state.menus.push(key);
        this.state.showMenu2[key] = false;
        if (this.state.displayedAPIs.includes(key)) {
          this.state.APIToggle[key] = true;
        } else {
          this.state.APIToggle[key] = false;
        }
      }
    }
  }

  handleFullAPIClick(item) {
    let { displayedAPIs, headList, displayed, NOTdisplayed } = this.state;
    if (displayedAPIs.includes(item)) {
      // Goes through the list of the tables titles and toggles menu and table off of those items
      headList.map(data => {
        let dataApi = data.split('--')[1]
        if (data !== "IP" && dataApi === item) {
          let inputs = document.getElementById(data);
          inputs.checked = false;

          if (displayed.includes(data)) {
            let indexofdata = displayed.indexOf(data);
            if (indexofdata > -1) {
              displayed.splice(indexofdata, 1);
            }
            $(`.${data}`).hide("slow");
            NOTdisplayed.push(data);
          }
        }
      })

      let indexofdataAPI = this.state.displayedAPIs.indexOf(item);
      this.state.displayedAPIs.splice(indexofdataAPI, 1);
      this.state.NOTdisplayedAPIs.push(item);
    } else {
      // Goes through the list of the tables titles and toggles menu and table off of those items
      this.state.headList.map(data => {
        let dataApi = data.split('--')[1]
        if (data !== "IP" && dataApi === item) {
          let inputs = document.getElementById(data);
          inputs.checked = true;
          if (this.state.NOTdisplayed.includes(data)) {
            let indexofdata = this.state.NOTdisplayed.indexOf(data);
            if (indexofdata > -1) {
              let holder = this.state.NOTdisplayed;
              holder.splice(indexofdata, 1);
              this.setState({
                NOTdisplayed: holder
              })
            }
  
            $(`.${data}`).show("slow");
            this.state.displayed.push(data);
          }
        }
      })

      let indexofdataAPInot = this.state.NOTdisplayedAPIs.indexOf(item);
      this.state.NOTdisplayedAPIs.splice(indexofdataAPInot, 1);
      this.state.displayedAPIs.push(item);
    }
  }

  // For rendering the table with a theme 
  Table = () => {
    const theme = localStorage.getItem("theme");
    const {headList, NOTdisplayed, APIList, rowList} = this.state;

    if (headList.length === 0  || APIList.length === 0 || rowList.length === 0) {
      return (
        <div style={{fontSize: "100px", color: "red"}}>Loading...</div>
      )
    } else {
      return (
        <table >
          <thead style={{
            backgroundColor: theme === 'dark' ? '#28495f' : '#ececec',
            color: theme === 'dark' ? '#e6e6e6' : '#303030',
            border: theme === 'dark' ? "1px solid #28495f" : '',
          }}>
            <TableNamesHolder
              headList={this.state.headList}
              NOTdisplayed={this.state.NOTdisplayed}
              APIList={this.state.APIList}
              count={this.state.count}
            />
          </thead>
          <tbody style={{ border: "0px" }}>
            <BodyRowHolder
              rowList={this.state.rowList}
              headList={this.state.headList}
              NOTdisplayed={this.state.NOTdisplayed}
              APIList={this.state.APIList}
            />
          </tbody>
        </table>
      )
    }
  }

  render() {
    const { rowList, headList } = this.state;
    if (rowList.length === 0 || headList.length === 0) {
      return (
        <div className="column">
          <div style={{fontSize: "100px", color: "red"}}>Loading...</div>
        </div>
      )
    } else if (this.state.APIList.length !== "") {
      return (
        <div className="column">
          <div className="nav">
            <div className="nav-pills">
              <div className="btn-group dropright" onMouseEnter={() => this.toggleDisplay(true)} onMouseLeave={() => this.toggleDisplay(false)} >
                <a role="button" className="nav-link btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">APIs </a>
                <div className={`dropdown-menu`} style={{ display: this.state.showMenu ? "block" : "none", position: "absolute", marginLeft: "0px" }}>
                  {this.state.menus.map((item, i) => {
                    return this.state.displayedAPIs.includes(item) ? (
                      <div className=" dropdown-item" href="#" key={`Menu_item_${i}`} >
                        {item}
                        <div className="btn-group dropright downdeep" onMouseEnter={() => this.toggleAPIMenuDisplay(true, item)} onMouseLeave={() => this.toggleAPIMenuDisplay(false, item)} >
                          <a role="button" className="nav-link btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" />
                          <div className={`dropdown-menu apikeys ${item}`}
                            style={{
                              display: this.state.showMenu2[item]
                                ? "block"
                                : "none",
                              position: "absolute",
                              marginLeft: "0px"
                            }}
                          >
                            <div className="dropdown-item">
                              <a className="switch tiny" key={`Menu_item_${i}`}>
                                Full API
                                <input
                                  className="switch-input"
                                  onClick={() => this.handleFullAPIClick(item)}
                                  key={`Menu_item_${i}`}
                                  id={item}
                                  type="checkbox"
                                  name={`Switch for ${item}`}
                                  defaultChecked
                                />
                                <label className="switch-paddle" htmlFor={item} />
                              </a>
                            </div>
                            <Menu
                              headList={this.state.headList}
                              item={item}
                              NOTdisplayed={this.state.NOTdisplayed}
                              displayed={this.state.displayed}
                              toggleDisplay={this.toggleDisplay.bind(this)}
                              showMenu={this.state.showMenu}
                              fullObj={this.state.fullObj[item]}
                              NOTdisplayedAPIs={this.state.NOTdisplayedAPIs}
                              displayedAPIs={this.state.displayedAPIs}
                              propbablyshouldUseThis={
                                this.state.apiObjectforMenu
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                        <div className="dropdown-item" href="#" key={`Menu_item_${i}`}>
                          {item}
                          <div className="btn-group dropright downdeep" onMouseEnter={() => this.toggleAPIMenuDisplay(true, item)} onMouseLeave={() => this.toggleAPIMenuDisplay(false, item)} >
                            <a role="button" className="nav-link btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" />
                            <div className={`dropdown-menu apikeys ${item}`}
                              style={{
                                display: this.state.showMenu2[item]
                                  ? "block"
                                  : "none",
                                position: "absolute"
                              }}
                            >
                              <div className="dropdown-item">
                                <a className="switch tiny" key={`Menu_item_${i}`}>
                                  Full API
                                  <input
                                    className="switch-input"
                                    onClick={() => this.handleFullAPIClick(item)}
                                    key={`Menu_item_${i}`}
                                    id={item}
                                    type="checkbox"
                                    name={`Switch for ${item}`}
                                  />
                                  <label className="switch-paddle" htmlFor={item} />
                                </a>
                              </div>
                              <Menu
                                headList={this.state.headList}
                                item={item}
                                NOTdisplayed={this.state.NOTdisplayed}
                                displayed={this.state.displayed}
                                toggleDisplay={this.toggleDisplay.bind(this)}
                                showMenu={this.state.showMenu}
                                fullObj={this.state.fullObj[item]}
                                NOTdisplayedAPIs={this.state.NOTdisplayedAPIs}
                                displayedAPIs={this.state.displayedAPIs}
                                propbablyshouldUseThis={
                                  this.state.apiObjectforMenu
                                }
                              />
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="table-scroll" id="style-7" style={{ marginLeft: "2em", width: "98vw" }}>
            <this.Table />
          </div>
        </div>
      );
    }
  }
}

export default Table;
