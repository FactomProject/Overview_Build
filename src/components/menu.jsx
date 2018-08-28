import React, { Component } from 'react';
import '../App.css';
import MenuItem from './menu-items';
import $ from 'jquery';

class Menu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        NOTdisplayed: [],
        displayed: this.props.displayed,
        headList: [],
        showMenu: false,
        showMenu2: {},
        fullObj: {},
        menus: []
      }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            NOTdisplayed: nextProps.NOTdisplayed,
            headList: nextProps.headList,
            showMenu: nextProps.showMenu,
            fullObj: nextProps.fullObj
        })
        this.getMenus()
    }

    toggleDisplay(display) {
        console.log('called toggledisplay')
        this.setState({
          showMenu: display
        })
    }
    toggleDisplay2(display, menu) {
        this.state.showMenu2[menu] = display
    }

    getMenus() {
        for(let key in this.state.fullObj) {
            if (!this.state.menus.includes(key)) {
                this.state.menus.push(key)
                this.state.showMenu2[key] = false;
            }
        }
    }

    handleClick(data) {
        if (this.state.displayed.includes(data)) {
            let indexofdata = this.state.displayed.indexOf(data);
            if (indexofdata > -1) {
              this.state.displayed.splice(indexofdata, 1);
            }
      
            $(`.${data}`).hide('slow');
      
            this.state.NOTdisplayed.push(data)
            
          } else if (this.state.NOTdisplayed.includes(data)) {
            let indexofdata = this.state.NOTdisplayed.indexOf(data);
            if (indexofdata > -1) {
              this.state.NOTdisplayed.splice(indexofdata, 1);
            }
      
            $(`.${data}`).show('slow');
      
            this.state.displayed.push(data)
          }
    }

    render() {
        // console.log(this.props.fullObj)
        if(this.props.fullObj === undefined) {
            return null;
        } else {
        return (
            this.props.fullObj.map((item, i) => (
                <div className="dropdown-item" href="#" key={`Menu_item_${i}`}>{item}
                <a className="switch tiny" key={`Menu_item_${i}`}>
                    <input className="switch-input" onClick={() => this.handleClick(item)} key={`Menu_item_${i}`} id={item} type="checkbox" name={`Switch for ${item}`} defaultChecked/>
                    <label className="switch-paddle" htmlFor={item} />
                </a>
                </div>
            ))
            // this.state.menus.map((item, i) => (
            //     <div className="nav-pills" key={item}>
            //     <div className="btn-group dropright" onMouseEnter={() => this.toggleDisplay2(true, item)} onMouseLeave={() => this.toggleDisplay2(false, item)}>
            //         <a role="button" className="dropdown-item nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            //         {item}
            //         </a>
            //         <div className={`${item} dropdown-menu`} style={{display: this.state.showMenu2[item] ? 'block' : 'none', position: 'absolute', willChange: 'transform', top: '0px', left: '0px', transform: 'translate3d(0px, 38px, 0px)'}}>
            //             <MenuItem headList={this.state.fullObj[item]} NOTdisplayed={this.state.NOTdisplayed} handleClick={this.handleClick.bind(this)}/>
            //         </div>
            //     </div>
            //     </div>
            // ))
             
        )
    }
    }
}


export default Menu