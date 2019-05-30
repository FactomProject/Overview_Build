import React, { Component } from 'react';
import _ from "underscore";

class TableRow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        headList: [],
        rowList: [],
        NOTdisplayed: [],
        APIList: [],
        changed: false,
        count: 0
      }
    }

    static getDerivedStateFromProps(props, state) {

        if (state.headList.length === 0 || props.headList.length > state.headList.length) {
            return { headList: props.headList }
        }

        if (props.rowList.length < state.headList.length) {
            let newRowList = [];
            if (props.rowList.length > 1) {
                console.log("props.rowList.length: ", props.rowList.length)
                console.log("state.headList.length: ", state.headList.length)
                for (let i = 0; i < state.headList.length; i++) {
                    if (i === 0) {
                        newRowList.push(props.rowList[i])
                    }
                    
                    else if (props.rowList[i] !== undefined && `${state.headList[i].split('--')[0]}--${state.headList[i].split('--')[1]}` === `${props.rowList[i].split('--')[1]}--${props.rowList[i].split('--')[2]}`) {
                        // `${state.rowList[i].split('--')[1]}--${state.rowList[i].split('--')[1]}` === `${props.headList[i].split('--')[0]}--${props.rowList[i].split('--')[1]}`
                        // console.log("props.rowList[i].split('--'): ", `${props.rowList[i].split('--')[1]}--${props.rowList[i].split('--')[2]}`)
                        // console.log("state.headList[i].split('--'): ", `${state.headList[i].split('--')[0]}--${state.headList[i].split('--')[1]}`)
                        newRowList.push(props.rowList[i])
                        
                    } else {
                        let splitHolder = state.headList[i].split('--');
                        newRowList.push(`" "--${splitHolder[0]}--${splitHolder[1]}`)
                        // props.rowList.splice(i,1)
                        // i--;
                    }
                    // else if (props.rowList[i] !== undefined && `${state.rowList[i].split('--')[1]}--${state.rowList[i].split('--')[1]}` === `${props.headList[i].split('--')[1]}--${props.rowList[i].split('--')[2]}`) {
                    //     newRowList.push(props.rowList[i])
                    // } else if (props.rowList[i] !== undefined ) {
                    //     let splitHolder = state.headList[i].split('--');
                    //     newRowList.push(`" "--${splitHolder[0]}--${splitHolder[1]}`)
                    // } else {
                    //     let splitHolder = state.headList[i].split('--');
                    //     newRowList.push(`" "--${splitHolder[0]}--${splitHolder[1]}`)
                    // }
                }
                console.log("newRowList: ", newRowList)
            }
            return { rowList: newRowList, PIList: props.APIList }

        } else 
        if (!_.isEqual(props.rowList, state.rowList)) {
            return { rowList: props.rowList, APIList: props.APIList, }
        } else if (state.rowList.length === props.rowList.length) {
            if (!_.isEqual(props.rowList, state.rowList) && props.rowList.length >= 1) {
                return {
                    headList: props.headList,
                    rowList: props.rowList,
                    NOTdisplayed: props.NOTdisplayed,
                    APIList: props.APIList,
                    changed: true
                }
            }
        } else if(state.count === 0 || state.count === 1 || state.count === 3 || state.count === 4) {
            return {
                headList: props.headList,
                rowList: props.rowList,
                NOTdisplayed: props.NOTdisplayed,
                APIList: props.APIList,
                changed: true
            }
        }
        return { count: state.count + 1, changed: false };
    }

    render() {
        // console.log("rowlist.length: ", this.state.rowList)
        return this.state.APIList.map((api, i) => {
            return this.state.rowList.map((item,j) => (
                item.split('--')[1] === "URL" && i === 0? (
                    <th key={ j.toString() } className={ this.state.headList[j] } style={{ textAlign: 'center' }}>{ item.split('--')[0].split(':')[0] }</th>
                ) : (
                    item.split('--')[2] === api.split('/')[0] ? (
                        <th key={ j.toString() } className={ this.state.headList[j] } style={{ textAlign: 'center', animation: this.state.changed ? 'highlight 1s' : null }}>{ item.split('--')[0] }</th>
                    ) : (null)
                )
            ))
        })
    }   
}


export default TableRow