import React, { Component } from 'react';
import '../App.css';
import TableRow from './table-row';
import io from 'socket.io-client';

class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        props: props,
        factomd_s: [],
        rowUrlData: {},
        heightsApiReturn: {},
        propsApiReturn: {},
        netInfoApiReturn: {},
        configApiReturn: {},
        colVals: []
      }
      setInterval(() => {
        this.render()
      }, 1000)
        this.socket = io('localhost:5001');
  
        let that = this;
        let newObj = {}
        this.socket.on('ListOfURLs', function(data) {
            for (let i = 0; i <= data.length-1; i++) {
                newObj[data[i]] = {};
            }
        })

        this.socket.on('heightsAPIObject', function(data) {
            console.log('heights: ',data)
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

        this.socket.on('configAPIObject', function(data) {
            for (let key in data) {
                newObj[key]['config'] = {}
                newObj[key]['config'] = data[key]['config']
            }
        })

        setInterval(function() {
            that.getConfigApiInfo(newObj)
        },5000)

    }
    componentDidMount() {
        this.getAPIdata()
    }

    getConfigApiInfo(obj) {
        console.log('in getConfigAPIInfo', obj)
        let hugearr = [];
        let count = 9;
        for (var key in obj) {
            let smallarr = [];
            count = 9;
            if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
                hugearr.push(smallarr)
                for (var goingDeeper in obj[key]) {
                    for (var finallygettingvalues in obj[key][goingDeeper]) {
                        if (typeof obj[key][goingDeeper][finallygettingvalues] === "object" && !Array.isArray(obj[key])) {
                            for (let thisconfigreturnisHUGE in obj[key][goingDeeper][finallygettingvalues]) {
                                if(count !== 68) {
                                    smallarr.push(obj[key][goingDeeper][finallygettingvalues][thisconfigreturnisHUGE])
                                } 
                                count++;
                            }
                        } else {
                            smallarr.push(obj[key][goingDeeper][finallygettingvalues])
                        }
                    }
                }
            }
        } console.log('yeah ', hugearr)
          this.setState({
              rowList: hugearr
          })
        }
      
    

    getAPIdata() {
        this.socket = io('localhost:5001');
        this.socket.emit('firstcall') 
    }
    
    render() {
        // console.log('come onnnnnnnnnnnnnnnn ', this.state.rowList)
        // console.log(this.state.rowList)
        if (this.state.rowList === undefined ) {
            return null;
        } else if (this.state.rowList[0].length === 0) {
            return null;
        } else {
            // console.log(this.state.rowList)
            return (
                this.state.rowList.map((item, i) => (
                    // console.log('in map: ', item)
                    
                        <tr key={i} className="1">
                        {/* {console.log(item)} */}
                            <TableRow key={i} headList={this.state.props.headList} rowList={item}/>
                        </tr>
                    
                ))
            )
        }
    }
}


export default Table