import React, { Component } from 'react';
import '../App.css';

class TableRow extends Component {
    constructor(props) {
      super(props);
      console.log(props)
      this.state = {
        props: props,
        rowList: []
      }
      
    }

    render() {
        return (
            // console.log(this.state.props.rowList),
            this.state.props.rowList.map((item,i) => {
                // console.log(item)
                // one of the outputs was returning 2 "" instead of 1 so it
                // it was messing up the whole output
                if(item === false || item === 'false') {
                    return <th id={i} key={i.toString()} className={this.state.props.headList[i]} style={{textAlign: 'center'}}>{'false'}</th>
                } else if(item === true || item === 'true') {
                    return <th id={i} key={i.toString()} className={this.state.props.headList[i]} style={{textAlign: 'center'}}>{'true'}</th>
                }  else if(item === "") {
                    return <th id={i} key={i.toString()} className={this.state.props.headList[i]} style={{textAlign: 'center'}}>{`" "`}</th>
                } else {
                    return <th id={i} key={i.toString()} className={this.state.props.headList[i]} style={{textAlign: 'center'}}>{item}</th>
                }
            })
        )
    }
}


export default TableRow