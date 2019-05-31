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
                for (let h = 0; h < state.headList.length; h++) {
                    if (h === 0) {
                        newRowList.push(props.rowList[h]);
                    } else {
                        let headListSplit = state.headList[h].split('--');
                        for (let r = 1; r < props.rowList.length; r++) {
                            let rowListSplit = props.rowList[r].split('--');
                            if (`${rowListSplit[1]}--${rowListSplit[2]}` === `${headListSplit[0]}--${headListSplit[1]}`) {
                                newRowList.push(props.rowList[r])
                            }
                        }
                        if (newRowList[h] === undefined || !newRowList[h].includes(`${headListSplit[0]}--${headListSplit[1]}`)){
                            newRowList.push(`""--${headListSplit[0]}--${headListSplit[1]}`)
                        }
                    }
                }
            }
            if (newRowList.length > 1) {
                return { rowList: newRowList, APIList: props.APIList }
            }
            
        } else if (!_.isEqual(props.rowList, state.rowList)) {
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