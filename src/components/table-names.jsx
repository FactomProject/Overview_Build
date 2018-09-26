import React, { Component } from "react";
import "../App.css";

class TableNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headList: [],
      NOTdisplayed: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      headList: nextProps.headList,
      NOTdisplayed: nextProps.NOTdisplayed
    });
  }

  render() {
    return this.state.headList.map((item, i) => (
      <th key={i.toString()} className={item} style={{ textAlign: "center" }}>
        {item.split("--")[0]}
      </th>
    ));
  }
}

export default TableNames;
