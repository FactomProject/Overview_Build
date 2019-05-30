import React, { Component } from 'react';
import '../App.css';
import _ from 'underscore';

class TableNames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headList: [],
      APIList: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.headList.length === 0) {
      return { headList: props.headList, APIList: props.APIList }
    } else if (!_.isEqual(props.headList, state.headList) && props.headList.length >= 1 && props.APIList.length !== 0) {
      return { headList: props.headList, APIList: props.APIList };
    }
    // No state update necessary
    return null;
  }

  render() {
    const theme = localStorage.getItem('theme');
    const { APIList, headList } = this.state;

    return APIList.map((item, i) => {
      return headList.map((className, j) =>
        className === 'IP' && i === 0 ? (
          <th key={ j.toString() } className={ className } style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>{ className }</div>
          </th>
        ) : className.split('--')[1] === item.split('/')[0] ? (
          <th key={ j.toString() } className={ className } style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>{ className.split('--')[0] }</div>
            <div style={{ fontSize: '12px', color: theme === 'dark' ? '#8a8a8a' : '#696969' }}>
              { className.split('--')[1] }
            </div>
          </th>
        ) : null
      );
    });
  }
}

export default TableNames;
