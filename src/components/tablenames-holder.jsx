import React, { Component } from 'react';
import '../App.css';
import TableNames from './table-names'

class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        headList: [],
        NOTdisplayed: []
      }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            headList: nextProps.headList,
            NOTdisplayed: nextProps.NOTdisplayed
        })
    }
    
    render() {
        if (this.state.headList === undefined) {
            return null;
        } else {
            return (
                <tr className="bar" >
                    <TableNames headList={this.state.headList} NOTdisplayed={this.props.NOTdisplayed}/> 
                </tr>
            )
        }
    }
}


export default Table