import React, { Component } from "react";
import "../App.css";
import $ from "jquery";
import _ from "underscore";


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NOTdisplayed: [],
      displayed: [],
      displayedAPIs: [],
      headList: [],
      showMenu: false,
      showMenu2: {},
      fullObj: {},
      menus: [],
      propbablyshouldUseThis: {},
      NOTdisplayedAPIs: [],
      UserToggledNotDisplay: [],
      UserToggledDisplay: []
      
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     NOTdisplayed: nextProps.NOTdisplayed,
  //     headList: nextProps.headList,
  //     showMenu: nextProps.showMenu,
  //     fullObj: nextProps.fullObj,
  //     propbablyshouldUseThis: nextProps.propbablyshouldUseThis
  //   });
  // }
  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.headList, state.headList)) {
        if (state.headList.length > 1 && props.headList.length === 1) {
            null
        } else {
            console.log("state.headList", state.headList);
            console.log("props.headList", props.headList);
            return { headList: props.headList }; 
        }
    }

    if (!_.isEqual(props.NOTdisplayed, state.NOTdisplayed)) {
      console.log("state.NOTdisplayed", state.NOTdisplayed);
      console.log("props.NOTdisplayed", props.NOTdisplayed);
      return { NOTdisplayed: props.NOTdisplayed }; 
    }

    if (!_.isEqual(props.displayed, state.displayed)) {
      console.log("state.displayed", state.displayed);
      console.log("props.displayed", props.displayed);
      return { displayed: props.displayed }; 
    }

    if (!_.isEqual(props.displayedAPIs, state.displayedAPIs)) {
      console.log("state.displayedAPIs", state.displayedAPIs);
      console.log("props.displayedAPIs", props.displayedAPIs);
      return { displayedAPIs: props.displayedAPIs }; 
    }

    // if (!_.isEqual(props.fullObj, state.fullObj)) {
    //   console.log("state.fullObj", state.fullObj);
    //   console.log("props.fullObj", props.fullObj);
    //   return { fullObj: props.fullObj }; 
    // }

    if (!_.isEqual(props.NOTdisplayedAPIs, state.NOTdisplayedAPIs)) {
      console.log("state.NOTdisplayedAPIs", state.NOTdisplayedAPIs);
      console.log("props.NOTdisplayedAPIs", props.NOTdisplayedAPIs);
      return { NOTdisplayedAPIs: props.NOTdisplayedAPIs }; 
    }

    if (props.showMenu !== state.showMenu) { return { showMenu: props.showMenu }; }
    // No state update necessary
    return null;
  }

  toggleDisplay(display) {
    this.setState({
      showMenu: display
    });
  }
  toggleDisplay2(display, menu) {
    this.state.showMenu2[menu] = display;
  }

  // getMenus() {
  //   for (let key in this.state.propbablyshouldUseThis) {
  //     if (!this.state.menus.includes(key)) {
  //       this.state.menus.push(key);
  //       this.state.showMenu2[key] = false;
  //     }
  //   }
  // }

  handleClick(data) {
    if (this.state.displayed.includes(data)) {
      let indexofdata = this.state.displayed.indexOf(data);
      if (indexofdata > -1) {
        this.state.displayed.splice(indexofdata, 1);
      }

      $(`.${data}`).hide("slow");

      this.state.NOTdisplayed.push(data);
    } else if (this.state.NOTdisplayed.includes(data)) {
      let indexofdata = this.state.NOTdisplayed.indexOf(data);
      if (indexofdata > -1) {
        this.state.NOTdisplayed.splice(indexofdata, 1);
      }

      $(`.${data}`).show("slow");

      this.state.displayed.push(data);
    }
  }

  render() {
    if (this.state.NOTdisplayedAPIs === undefined) {
      return null;
    } else {
      return !this.state.displayedAPIs.includes(this.props.item)
        ? this.state.headList.map((item, i) => (
              item.split("--")[1] === this.props.item ? (
                <div className="dropdown-item" href="#" key={`Menu_item_${i}`}>
                  {item.split("--")[0]}
                  <a className="switch tiny" key={`Menu_item_${i}`}>
                    <input
                      className="switch-input"
                      onClick={() => this.handleClick(item)}
                      key={`Menu_item_${i}`}
                      id={this.props.item + item}
                      type="checkbox"
                      name={`Switch for ${item}`}
                    />
                    <label className="switch-paddle ish" htmlFor={this.props.item + item} />
                  </a>
                </div>
              ) : null
          ))
        : this.state.headList.map((item, i) => (
          item.split("--")[1] === this.props.item ? (
            <div className="dropdown-item" href="#" key={`Menu_item_${i}`}>
              {item.split("--")[0]}
              <a className="switch tiny" key={`Menu_item_${i}`}>
                <input
                  className="switch-input"
                  onClick={() => this.handleClick(item)}
                  key={`Menu_item_${i}`}
                  id={this.props.item + item}
                  type="checkbox"
                  name={`Switch for ${item}`}
                  defaultChecked
                />
                <label
                  className="switch-paddle ish"
                  htmlFor={this.props.item + item}
                />
              </a>
            </div>
          ) : null
        ));
    }
  }
}

export default Menu;
