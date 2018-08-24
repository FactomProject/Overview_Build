import React, { Component } from 'react';
import '../App.css';
import TableNames from './table-names';
import BodyRow from './bodyrow-holder';

class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        props: props
      }
    }

    componentDidMount() {
      // console.log(this.state.props)
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
                <BodyRow headList={this.state.props.headList} />
              </tbody>
            </table>
        )
    }
}


export default Table


