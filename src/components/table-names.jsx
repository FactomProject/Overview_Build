import React, { Component } from "react";
import "../App.css";
import _ from "underscore";

class TableNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headList: [],
      NOTdisplayed: [],
      APIList: [],
      count: props.count
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.headList, this.state.headList) && nextProps.headList.length >= 1 ) {
      this.setState({
        headList: nextProps.headList,
        NOTdisplayed: nextProps.NOTdisplayed,
        APIList: nextProps.APIList
      })
    }
  }

  render() {
    const theme = localStorage.getItem("theme");

    return this.state.APIList.map((item, i) => {
      return this.state.headList.map(
        (className, j) =>
          className === "IP" && i === 0 ? (
            <th
              key={j.toString()}
              className={className}
              style={{ textAlign: "center" }}
            >
              <div style={{ fontSize: "18px", fontWeight: 700 }}>
                {className}
              </div>
            </th>
          ) : className.split("--")[1] === item.split("/")[0] ? (
            <th
              key={j.toString()}
              className={className}
              style={{ textAlign: "center"  }}
            >
              <div style={{ fontSize: "18px", fontWeight: 700 }}>
                {className.split("--")[0]}
              </div>
              <div style={{ fontSize: "12px", color: theme === 'dark' ? "#8a8a8a" : "#696969" }}>
                {className.split("--")[1]}
              </div>
            </th>
          ) : null
      );
    });
  }
}

export default TableNames;
