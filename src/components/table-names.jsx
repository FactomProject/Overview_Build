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

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.headList, this.state.headList) && nextProps.headList.length >= 1 && nextProps.APIList.length !== 0) {
      this.setState({
        headList: nextProps.headList,
        APIList: nextProps.APIList
      });
    }
  }

  ifIP(className, j) {
    return (  
      <th key={j.toString()} className={className} style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: 700 }}>{className}</div>
      </th>
    )
  }

  render() {
    const theme = localStorage.getItem('theme');
    const { APIList, headList } = this.state;

    return APIList.map((item, i) => {
      return headList.map((className, j) =>
        className === 'IP' && i === 0 ? (
          this.ifIP(className, j)
        ) : className.split('--')[1] === item.split('/')[0] ? (
          <th key={j.toString()} className={className} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>{className.split('--')[0]}</div>
            <div style={{ fontSize: '12px', color: theme === 'dark' ? '#8a8a8a' : '#696969' }}>
              {className.split('--')[1]}
            </div>
          </th>
        ) : null
      );
    });
  }
}

export default TableNames;
