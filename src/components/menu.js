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
      NOTdisplayedAPIs: [],
      receivedHeadList: false,
    };
  }
  
  static getDerivedStateFromProps(props, state) {
    if (!state.receivedHeadList) {
      return { headList: props.headList, receivedHeadList: true}
    }

    if (!_.isEqual(props.NOTdisplayed, state.NOTdisplayed)) {
      return { NOTdisplayed: props.NOTdisplayed }; 
    }

    if (!_.isEqual(props.displayed, state.displayed)) {
      return { displayed: props.displayed }; 
    }

    if (!_.isEqual(props.displayedAPIs, state.displayedAPIs)) {
      return { displayedAPIs: props.displayedAPIs }; 
    }

    if (!_.isEqual(props.NOTdisplayedAPIs, state.NOTdisplayedAPIs)) {
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

  handleClick(data) {
    const { displayed, NOTdisplayed } = this.state;
    if (displayed.includes(data)) {
      let indexofdata = displayed.indexOf(data);
      if (indexofdata > -1) {
        displayed.splice(indexofdata, 1);
      }
      
      $(`.${data}`).hide("slow");

      NOTdisplayed.push(data);
    } else if (NOTdisplayed.includes(data)) {
      let indexofdata = NOTdisplayed.indexOf(data);
      if (indexofdata > -1) {
        NOTdisplayed.splice(indexofdata, 1);
      }

      $(`.${data}`).show("slow");

      displayed.push(data);
    }
  }

  render() {
    const { NOTdisplayedAPIs, headList, displayedAPIs } = this.state;
    const { item } = this.props;
    
    if (NOTdisplayedAPIs === undefined) {
      return null;
    } else {
      return !displayedAPIs.includes(item)
        ? headList.map((key, i) => (
            key.split("--")[1] === item ? (
              <div className="dropdown-item" href="#" key={`Menu_key_${i}`}>
                {key.split("--")[0]}
                <a className="switch tiny" key={`Menu_key_${i}`}>
                  <input
                    className="switch-input"
                    onClick={() => this.handleClick(key)}
                    key={`Menu_key_${i}`}
                    id={key}
                    type="checkbox"
                    name={`Switch for ${key}`}
                  />
                  <label className="switch-paddle ish" htmlFor={key} />
                </a>
              </div>
            ) : null
          ))
        : headList.map((key, i) => (
          key.split("--")[1] === item ? (
            <div className="dropdown-item" href="#" key={`Menu_key_${i}`}>
              {key.split("--")[0]}
              <a className="switch tiny" key={`Menu_key_${i}`}>
                <input
                  className="switch-input"
                  onClick={() => this.handleClick(key)}
                  key={`Menu_key_${i}`}
                  id={key}
                  type="checkbox"
                  name={`Switch for ${key}`}
                  defaultChecked
                />
                <label className="switch-paddle ish" htmlFor={key} />
              </a>
            </div>
          ) : null
        ));
    }
  }
}

export default Menu;
