import React, { Component } from 'react';
import '../App.css';
import _ from 'underscore';
import TableNames from './table-names';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headList: [],
      NOTdisplayed: [],
      APIList: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.headList, state.headList)) {
      if (state.headList.length < 1 && props.headList.length !== 1) {
        return { headList: props.headList };
      }
    }

    if (props.NOTdisplayed !== state.NOTdisplayed) {
      return { NOTdisplayed: props.NOTdisplayed };
    }
    if (props.APIList !== state.NOTdisplayed) {
      return { APIList: props.APIList };
    }
    // No state update necessary
    return null;
  }

  render() {
    const { headList, NOTdisplayed, APIList } = this.state;
    
    if (headList === undefined || headList.length < 2 || APIList.length < 0) {
      return null;
    } else {
      return (
        <tr className="bar">
          <TableNames headList={headList} NOTdisplayed={NOTdisplayed} APIList={APIList} />
        </tr>
      );
    }
  }
}

export default Table;
