import React, { Component } from 'react';
import '../App.css';
import TableRow from './table-row';

class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        rowList: [],
        headList: [],
        NOTdisplayed: [],
        APIList: []
      }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.rowList !== state.rowList) { return { rowList: props.rowList }; }
        if (props.headList !== state.headList) { return { headList: props.headList }; }
        if (props.NOTdisplayed !== state.NOTdisplayed) { return { NOTdisplayed: props.NOTdisplayed }; }
        if (props.APIList !== state.NOTdisplayed) { return { APIList: props.APIList }; }
        // No state update necessary
        return null;
    }
    
    render() {
        const theme = localStorage.getItem("theme");
        console.log("rowlist.length: ", this.state.rowList.length)
        if (this.state.rowList === [] ) {
            return null;
        } else {
            return (
                this.state.rowList.map((item, i) => (
                    i % 2 === 0 ? (
                        <tr key={i} className="1" style={{backgroundColor: theme === 'dark' ? '#363636' : '' }}>
                            <TableRow key={i} headList={this.state.headList} NOTdisplayed={this.state.NOTdisplayed} rowList={item} APIList={this.state.APIList} />
                        </tr>
                    ) : (
                        <tr key={i} className="1" style={{backgroundColor: theme === 'dark' ? '#2f2f2f' : ''}}>
                            <TableRow key={i} headList={this.state.headList} NOTdisplayed={this.state.NOTdisplayed} rowList={item} APIList={this.state.APIList} />
                        </tr>
                    )
                ))
            )
        }
    }
}


export default Table