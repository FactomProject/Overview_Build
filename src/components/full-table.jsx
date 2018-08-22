import React, { Component } from 'react';
import '../App.css';
import TableNames from './table-names';
import TableRow from './table-row';

class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        props: props
      }
    }

    render() {
        return (
            <table className="hover scroll">
              <thead>
                <tr className="bar">
                  <TableNames headList={this.state.props.headList}/>
                </tr>
              </thead>
              <tbody>
                <tr className="1">
                  <TableRow headList={this.state.props.headList} rowList={this.state.props.rowList}/>
                </tr>
              </tbody>
            </table>
        )
    }
}


export default Table


