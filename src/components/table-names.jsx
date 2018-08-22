import React, { Component } from 'react';
import '../App.css';

class TableNames extends Component {
    constructor(props) {
      super(props);
      this.state = {
        props: props
      }
    }

    render() {
        return (
            this.state.props.headList.map((item,i) => (
                <th key={i.toString()} className={item} style={{textAlign: 'center'}}>{item}</th>    
            ))   
        )
    }
}


export default TableNames