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
        if (props.APIList !== state.APIList) { return { APIList: props.APIList }; }
        // No state update necessary
        return null;
    }
    
    render() {
        const { rowList, headList, NOTdisplayed, APIList } = this.state;
        const theme = localStorage.getItem('theme');
        if (rowList === [] ) {
            return null;
        } else {
            return (
                rowList.map((item, i) => (
                    i % 2 === 0 ? (
                        <tr key={ i } className='1' style={{ backgroundColor: theme === 'dark' ? '#363636' : '' }}>
                            <TableRow key={ i } headList={ headList } NOTdisplayed={ NOTdisplayed } rowList={ item } APIList={ APIList } />
                        </tr>
                    ) : (
                        <tr key={ i } className='1' style={{ backgroundColor: theme === 'dark' ? '#2f2f2f' : '' }}>
                            <TableRow key={ i } headList={ headList } NOTdisplayed={ NOTdisplayed } rowList={ item } APIList={ APIList } />
                        </tr>
                    )
                ))
            )
        }
    }
}


export default Table