import React, { Component } from 'react';
import '../App.css';
import TableNamesHolder from './tablenames-holder';
import BodyRowHolder from './bodyrow-holder';

class Table extends Component {
    constructor(props) {
      super(props);
      this.state = {
        props: props
      }
    }

    render() {
      
        return (
            <table className="hover scroll">
              <thead>
                <TableNamesHolder headList={this.state.props.headList}/>
              </thead>
              
              <tbody>
                <BodyRowHolder headList={this.state.props.headList} />
              </tbody>
            </table>
        )
    }
}


export default Table


