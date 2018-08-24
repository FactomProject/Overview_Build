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
      this.socket = io('localhost:5001');
        // this.socket.emit
  
        let that = this;
        let factomd_s = ''
        let newObj = {}
      this.socket.on('ListOfURLs', function(data) {
        // console.log("'ListOfURLs': ",data)
        for (let i = 0; i <= data.length-1; i++) {
            newObj[data[i]] = {};
        }
        factomd_s = data
        // that.setState({
        //     factomd_s: data,
        //     rowUrlData: newObj
        // });
    })

    this.socket.on('heightsAPIObject', function(data) {
        for (let key in data) {
            newObj[key] = data[key]
        }
        console.log('socket listener in bodyrow: ',data)
        console.log('newobject variable: ',newObj)
        // that.setState({
        //   heightsApiReturn: data.result
        // });
    })

    this.socket.on('propsAPIObject', function(data) {
        console.log('propsdata: ', data)
        for (let key in data) {
            newObj[key] = data[key]
        }
        console.log('socket listener in bodyrow: ',data)
        console.log('newobject variable: ',newObj)
    })

    }
    componentDidMount() {
        // console.log(this.state.props)

        // this.socket = io('localhost:5001');
        // // this.socket.emit
  
        // let that = this;
        // let factomd_s = ''
        // let newObj = {}
        // this.socket.on('ListOfURLs', function(data) {
        //     // console.log("'ListOfURLs': ",data)
        //     for (let i = 0; i <= data.length-1; i++) {
        //         newObj[data[i]] = {};
        //     }
        //     factomd_s = data
        //     that.setState({
        //         factomd_s: data,
        //         rowUrlData: newObj
        //     });
        // })
        // console.log(factomd_s, newObj)

        // this.socket.on('heightsAPI', function(data) {
        //     console.log('socket listener in bodyrow: ',data.result)
        //     that.setState({
        //       heightsApiReturn: data.result
        //     });
        // })

        this.getAPIdata()

        // this.getConfigApiInfo(this.state.heightsApiReturn)
        

        

        // this.socket.on('heightsAPI', function(data) {
        //     console.log("heightsAPI: ",data.result)
        //     that.render()
        //     that.setState({
        //     heightsApiReturn: data.result
        //     });
        // })
        // this.socket.on('propertiesAPI', function(data) {
        //     that.setState({
        //         propsApiReturn: data.result
        //     })
        // })
        // this.socket.on('networkinfoAPI', function(data) {
        //     that.setState({
        //         netInfoApiReturn: data.result
        //     })
        // })
        // this.socket.on('configAPI', function(data) {
        //     that.setState({
        //         configApiReturn: data.result
        //     })
        // })
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

    getAPIdata() {
        // console.log('OLD',this.state.rowUrlData)
        let olderHolder = this.state.rowUrlData;
        let newObj = {}
        let that = this;
        this.socket = io('localhost:5001');

       // for (let key in olderHolder) {
            // console.log('key in obj',key)
            this.socket.emit('heightsAPI', 'lvh.me:8088')
            // this.socket.emit('propsAPI', 'lvh.me:8088')
            
            // this.socket.on('heightsAPI', function(data) {
            //     console.log("heightsAPI: ",data.result)
            //     that.render()
            //     that.setState({
            //     heightsApiReturn: data.result
            //     });
            // })
        //}


        // this.socket.on('heightsAPI', function(data) {
        //     console.log("heightsAPI: ",data.result)
        //     that.render()
        //     that.setState({
        //     heightsApiReturn: data.result
        //     });
        // })
        // this.socket.on('propertiesAPI', function(data) {
        //     that.setState({
        //         propsApiReturn: data.result
        //     })
        // })
        // this.socket.on('networkinfoAPI', function(data) {
        //     that.setState({
        //         netInfoApiReturn: data.result
        //     })
        // })
        // this.socket.on('configAPI', function(data) {
        //     that.setState({
        //         configApiReturn: data.result
        //     })
        // })


        // if (!Object.prototype.hasOwnProperty(olderHolder, url)) {
        //     newObj[url] = {};
        //     newObj[url][whichapi] = data  
        // }
        // console.log('NEW OBJ: ', newObj)

        // this.setState({ rowUrlData: })
        // // const newFile = this.state.factomd_s.map((item) => {
        //     console.log(item);
        //     file.url = val4;
        //     return file;
        // // });
        // this.setState({rowUrlData: newFile });
    }
    
    render() {
        
        // for (let i = 0; i <= this.state.factomd_s.length-1; i++) {
        //     this.rowUrlDataFunc('heightsdata', this.state.heightsApiReturn, this.state.factomd_s[i])
        //     this.rowUrlDataFunc('propsdata', this.state.propsApiReturn, this.state.factomd_s[i])
        // }

        return (
            this.state.factomd_s.map((item, i) => {
                return (
                    <tr className="1">
                        <TableRow headList={this.state.props.headList} heightsApiReturn={this.state.heightsApiReturn}/>
                    </tr>
                )
            })
        )
    }
}


export default Table