import React, { Component } from 'react';
import '../App.css';
import TableNames from './table-names'
import io from 'socket.io-client';

class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        props: props,
        headList: []
      }
      this.socket = io('localhost:5001');
  
        let that = this;
        let newObj = {}
        this.socket.on('ListOfURLs', function(data) {
            for (let i = 0; i <= data.length-1; i++) {
                newObj[data[i]] = {};
            }
        })

        this.socket.on('heightsAPIObject2', function(data) {
            for (let key in data) {
                newObj[key]['heights'] = {}
                newObj[key]['heights'] = data[key]['heights']
            }
        })

        this.socket.on('propsAPIObject', function(data) {
            for (let key in data) {
                newObj[key]['properties'] = {}
                newObj[key]['properties'] = data[key]['properties']
            }
        })

        this.socket.on('netinfoAPIObject', function(data) {
            for (let key in data) {
                newObj[key]['networkinfo'] = {}
                newObj[key]['networkinfo'] = data[key]['networkinfo']
            }
        })

        setTimeout(function() {
            that.getConfigApiInfo(newObj)
        },300)

    }
    componentDidMount() {
        this.setState({
            headList: []
        })
    }
    /** all of this code it used to trick the display into actually displaying 
        the heading table row. without it, it sometimes does not display the name row
    */
    getConfigApiInfo(obj) {
        let hugearr = [];
       
        for (var key in obj) {
            let smallarr = [];
            if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
                hugearr.push(smallarr)
                for (var goingDeeper in obj[key]) {
                    for (var finallygettingvalues in obj[key][goingDeeper]) {
                        smallarr.push(finallygettingvalues)
                    }
                }
            }
        }
          this.setState({
              headList: []
          })
        }
      
    

    
    render() {
        if (this.state.props.headList === undefined) {
            return null;
        } else {
            return (
                <tr className="bar">
                    <TableNames headList={this.state.props.headList}/> 
                </tr>
            )
        }
    }
}


export default Table