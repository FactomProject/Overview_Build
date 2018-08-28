import React, { Component } from 'react';
import '../App.css';
import TableRow from './table-row';

class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        rowList: [],
        headList: [],
        NOTdisplayed: []
      }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            rowList: nextProps.rowList,
            headList: nextProps.headList,
            NOTdisplayed: nextProps.NOTdisplayed
        })
    }
    
    render() {
        if (this.state.rowList === [] ) {
            return null;
        } else {
            return (
                this.state.rowList.map((item, i) => (
                    <tr key={i} className="1">
                        <TableRow key={i} headList={this.state.headList} NOTdisplayed={this.state.NOTdisplayed} rowList={item}/>
                    </tr>
                ))
            )
        }
    }
}


export default Table