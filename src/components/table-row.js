import React, { Component } from 'react';
import _ from 'underscore';

class TableRow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        headList: [],
        rowList: [],
        APIList: [],
        changed: false,
        count: 0,
        NOTdisplayedAPIs: [],
        displayed: []
      }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.headList.length === 0 || props.headList.length > state.headList.length) {
            return { headList: props.headList,NOTdisplayedAPIs: props.NOTdisplayedAPIs }
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
                return { rowList: newRowList, APIList: props.APIList, NOTdisplayedAPIs: props.NOTdisplayedAPIs }
            }
        } else if (!_.isEqual(props.rowList, state.rowList)) {
            return { rowList: props.rowList, APIList: props.APIList, NOTdisplayedAPIs: props.NOTdisplayedAPIs}
        } 
        if (props.displayed !== state.displayed) { return { displayed: props.displayed }}

        return { count: state.count + 1, changed: false };
    }

    render() {
        const { APIList, rowList, headList, NOTdisplayedAPIs, changed, displayed } = this.state;
        console.log(displayed)
        return APIList.map((api, i) => {
            return rowList.map((item,j) => (
                j !== 0 && NOTdisplayedAPIs !== undefined ? (

                    // console.log("NOTdisplayedAPIs.includes(item.split('--')[2]) ", NOTdisplayedAPIs.includes(item.split('--')[2])),
                    // console.log("displayed.includes(item) ", displayed.includes(item)),
                    NOTdisplayedAPIs.includes(item.split('--')[2]) ? (
                        displayed.includes(`${item.split('--')[1]}--${item.split('--')[2]}`) ? (
                            <th key={ j.toString() } className={ headList[j] } style={{ textAlign: 'center', animation: changed ? 'highlight 1s' : null }}>{ item.split('--')[0] }</th>) 
                            : (
                            console.log("displayed.includes(item): ", displayed.includes(item)),
                                console.log("item: ", item),
                                null
                            )
                        ) : (
                            <th key={ j.toString() } className={ headList[j] } style={{ textAlign: 'center', animation: changed ? 'highlight 1s' : null }}>{ item.split('--')[0] }</th>
                        )
                ) : (
                    <th key={ j.toString() } className={ headList[j] } style={{ textAlign: 'center' }}>{ item.split('--')[0].split(':')[0] }</th>
                )
                // item.split('--')[1] === 'URL' && i === 0? (
                //     <th key={ j.toString() } className={ headList[j] } style={{ textAlign: 'center' }}>{ item.split('--')[0].split(':')[0] }</th>
                // ) : (
                //     item.split('--')[2] === api.split('/')[0] ? (
                //         <th key={ j.toString() } className={ headList[j] } style={{ textAlign: 'center', animation: changed ? 'highlight 1s' : null }}>{ item.split('--')[0] }</th>
                //     ) : (null)
                // )
            ))
        })
    }   
}


export default TableRow