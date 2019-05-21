import React, { Component } from 'react';
import '../App.css';
import TableNames from './table-names'
import _ from "underscore";

class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        headList: [],
        NOTdisplayed: [],
        APIList: []
      }
    }
    
    static getDerivedStateFromProps(props, state) {
        if (!_.isEqual(props.headList, state.headList)) {
            if (state.headList.length > 1 && props.headList.length === 1) {
                null
            } else {
                return { headList: props.headList }; 
            }
        }

        if (props.NOTdisplayed !== state.NOTdisplayed) { return { NOTdisplayed: props.NOTdisplayed }; }
        if (props.APIList !== state.NOTdisplayed) { return { APIList: props.APIList }; }
        // No state update necessary
        return null;
    }

    render() {
        if (this.state.headList === undefined || this.state.headList.length < 2) {
            return null;
        } else {
            return (
                <tr className="bar" >
                    <TableNames headList={this.state.headList} NOTdisplayed={this.props.NOTdisplayed} APIList={this.props.APIList}/> 
                </tr>
            )
        }
        
    }
}


export default Table