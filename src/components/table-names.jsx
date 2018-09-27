import React, { Component } from "react";
import "../App.css";
import $ from 'jquery';

class TableNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headList: [],
      NOTdisplayed: [],
      APIList: []
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      headList: nextProps.headList,
      NOTdisplayed: nextProps.NOTdisplayed,
      APIList: nextProps.APIList
    });
  }



  render() {
    return this.state.APIList.map((item) => {
      return this.state.headList.map((className, j) => (
        className.split('--')[1] === item.split('/')[0] ? (
          <th key={j.toString()} className={className} style={{ textAlign: "center" }}>
            <div style={{fontSize: "18px", fontWeight: 700}}>{className.split("--")[0]}</div>
            <div style={{fontSize: "12px", color: "#696969"}}>{className.split("--")[1]}</div>
          </th>
        ) : (null)
      ))
    })
    // return this.state.headList.map((item, i) => (
    //   <th key={i.toString()} className={item} style={{ textAlign: "center" }}>
    //     {item.split("--")[0]}
    //   </th>
    // ));
  }
}

export default TableNames;
