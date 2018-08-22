import React, { Component } from 'react';
import '../App.css';

class Menu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        props: props
      }
    }

    render() {
        return (
            this.state.props.addMenu.map((item,i) => {
               return !this.state.props.NOTdisplayed.includes(item) ? ( 
                    <div className="dropdown-item" href="#" key={`Menu_item_${i}`}>{item}
                        <a className="switch tiny" key={`Menu_item_${i}`}>
                            <input onChange={() => this.state.props.handleClick(item)} className="switch-input" key={`Menu_item_${i}`} id={item} type="checkbox" name={`Switch for ${item}`} defaultChecked/>
                            <label className="switch-paddle" htmlFor={item} />
                        </a>
                    </div>) : (
                    <div className="dropdown-item" href="#" key={`Menu_item_${i}`}>{item}
                        <a className="switch tiny" key={`Menu_item_${i}`}>
                            <input onChange={() => this.state.props.handleClick(item)} className="switch-input" key={`Menu_item_${i}`} id={item} type="checkbox" name={`Switch for ${item}`} />
                            <label className="switch-paddle" htmlFor={item} />
                        </a>
                    </div>
                    )
            })   
        )
    }
}


export default Menu