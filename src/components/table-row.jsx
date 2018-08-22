import React, { Component } from 'react';
import '../App.css';

class TableRow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        props: props
      }
    }

    render() {
        return (
            this.state.props.rowList.map((item,i) => (
                <th key={i.toString()} className={this.state.props.headList[i]} style={{textAlign: 'center'}}>{item}</th>     
            ))
        )
    }
}


export default TableRow