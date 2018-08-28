import React, { Component } from 'react';
import '../App.css';

class Menu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        NOTdisplayed: [],
        headList: [],
        showMenu2: false
      }
    }
    componentDidMount() {
        // console.log(this.state.props);
    }

    componentWillReceiveProps(nextProps) {
    this.setState({
      NOTdisplayed: nextProps.NOTdisplayed,
      headList: nextProps.headList
    })
  }

    toggleDisplay2(display) {
        this.setState({
          showMenu2: display
        })
      }

    render() {
        if (this.state.headList === undefined) {
            return null;
        } else {
        return (
            this.state.headList.map((item,i) => {
                return !this.state.NOTdisplayed.includes(item) ? ( 
                    <div className="dropdown-item" href="#" key={`Menu_item_${i}`}>{item}
                        <a className="switch tiny" key={`Menu_item_${i}`}>
                            <input className="switch-input" onClick={() => this.props.handleClick(item)} key={`Menu_item_${i}`} id={item} type="checkbox" name={`Switch for ${item}`} defaultChecked/>
                            <label className="switch-paddle" htmlFor={item} />
                        </a>
                        
                    </div>
                    ) : (
                    <div className="dropdown-item" href="#" key={`Menu_item_${i}`}>{item}
                        <a className="switch tiny" key={`Menu_item_${i}`}>
                            <input className="switch-input" onClick={() => this.props.handleClick(item)} key={`Menu_item_${i}`} id={item} type="checkbox" name={`Switch for ${item}`} />
                            <label className="switch-paddle" htmlFor={item} />
                        </a>
                    </div>
                    )
            })   
        )
        }
    }
}


export default Menu