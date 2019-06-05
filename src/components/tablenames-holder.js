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
      APIList: [],
      NOTdisplayedAPIs: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!_.isEqual(props.headList, state.headList)) {
      if (state.headList.length < 1 && props.headList.length !== 1) {
        return { headList: props.headList, APIList: props.APIList };
      } else if (props.headList.length > state.headList.length) {
        return { headList: props.headList, APIList: props.APIList };
      }
    }

    if (props.NOTdisplayedAPIs !== state.NOTdisplayedAPIs) {
      return { NOTdisplayedAPIs: props.NOTdisplayedAPIs };
    }
    if (props.NOTdisplayed !== state.NOTdisplayed) {
      return { NOTdisplayed: props.NOTdisplayed };
    }
    if (props.APIList !== state.APIList) {
      return { APIList: props.APIList };
    }
    // No state update necessary
    return null;
  }

  render() {
    const { headList, NOTdisplayed, APIList, NOTdisplayedAPIs } = this.state;

    if (headList === undefined || headList.length < 2 || APIList.length < 0) {
      return null;
    } else {
      return (
        <tr className='bar'>
          <TableNames headList={ headList } NOTdisplayed={ NOTdisplayed } APIList={ APIList } NOTdisplayedAPIs={ NOTdisplayedAPIs }/>
        </tr>
      );
    }
  }
}

export default Table;
