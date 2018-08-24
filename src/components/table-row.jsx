import React, { Component } from 'react';
import '../App.css';

class TableRow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        props: props,
        rowList: []
      }
    }
    componentDidMount(){
        console.log(this.state.props)
    }

    getConfigApiInfo(obj) {
        console.log(obj)
        let arr = [];
        if (obj !== {}) {
          for (var key in obj) {
            if (typeof obj[key] === "object" && !Array.isArray(key)) {
              for (var goingDeeper in obj[key]) {
                arr.push(obj[key][goingDeeper])
              }
            } else {
                arr.push(obj[key])
            }
          }
          this.setState({
              rowList: arr
          })
        }
      }

    render() {
        return (
            // this.state.props.rowList.map((item,i) => (
            //     <th key={i.toString()} className={this.state.props.headList[i]} style={{textAlign: 'center'}}>{item}</th>
            // ))
            <div></div>
        )
    }
}


export default TableRow