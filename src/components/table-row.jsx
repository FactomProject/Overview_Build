import React, { Component } from 'react';
import '../App.css';

class TableRow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        headList: [],
        rowList: [],
        NOTdisplayed: []
      }
      
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            headList: nextProps.headList,
            rowList: nextProps.rowList,
            NOTdisplayed: nextProps.NOTdisplayed
        })
    }

    render() {
        return (
            this.state.rowList.map((item,i) => {
                if(item === false || item === 'false') {
                    return <th key={i.toString()} className={this.state.headList[i]} style={{textAlign: 'center'}}>{'false'}</th>
                } else if(item === true || item === 'true') {
                    return <th key={i.toString()} className={this.state.headList[i]} style={{textAlign: 'center'}}>{'true'}</th>
                }  else if(item === "") {
                    return <th key={i.toString()} className={this.state.headList[i]} style={{textAlign: 'center'}}>{`" "`}</th>
                } else {
                    return <th key={i.toString()} className={this.state.headList[i]} style={{textAlign: 'center'}}>{item}</th>
                }
            })
        )
    }
}


export default TableRow