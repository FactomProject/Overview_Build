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
        if (state.rowList.length === props.rowList.length) {
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
                    item.split('--')[1] === api.split('/')[0] ? (
                        <th key={ j.toString() } className={ this.state.headList[j] } style={{ textAlign: 'center', animation: this.state.changed ? 'highlight 1s' : null }}>{ item.split('--')[0] }</th>
                    ) : (null)
                )
            ))
        })
    }   
}


export default TableRow