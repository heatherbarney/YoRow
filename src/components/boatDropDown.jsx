import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class BoatDropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    }

    this.showMenu = this.showMenu.bind(this);    
  }
  
  showMenu(event) {
    event.preventDefault();
    
    this.state.showMenu
      ? (
        this.setState({
          showMenu: false,
        })
        )
        : (
          this.setState({
            showMenu: true,
          })
        )
    }

  render() {

    const buttons = [];
    this.props.boatList.forEach(boat => {
        if (boat.available) {
          buttons.push(
            <button name={boat.name} id={this.props.lineupIndex} onClick={(event) => {this.props.chooseBoat(event); this.showMenu(event); this.props.clearLineup(event)}}>{boat.name + ' (' + boat.abbrev + ')'}</button>
          )
        }
      });
    
      buttons.push(
      <button className='clearButton' id={this.props.lineupIndex} onClick={(event) => {this.props.clearBoat(event); this.showMenu(event); this.props.clearLineup(event)}}>Clear</button>
      )

    return (
      <div className="dropdown">
        <Button variant="contained" color="secondary" onClick={this.showMenu}>
          Select Boat
        </Button>
        
        {
          this.state.showMenu
            ? (
              <div className="menu">
                {buttons}
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default BoatDropdown;