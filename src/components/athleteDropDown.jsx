import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import GreenButton from './greenButton.jsx';
import RedButton from './redButton.jsx';

class AthleteDropdown extends Component {

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
    const roster = this.props.roster;
    roster.forEach(athlete => {
      if (athlete.positions.includes(this.props.side) && athlete.available) {
        buttons.push(
          <button name={athlete.name} id={this.props.seat} title = {this.props.lineupIndex} onClick={(event) => {this.props.assignAthlete(event); this.showMenu(event);}}>{athlete.name}</button>)
      }
    })
    buttons.push(
      <button className='clearButton' id={this.props.seat} title = {this.props.lineupIndex} onClick={(event) => {this.props.clearAthlete(event); this.showMenu(event);}}>Clear</button>
    )

    let selectButton;

    switch (this.props.side) {
      case 'Port':
        selectButton = <RedButton showMenu={this.showMenu}>Select Athlete</RedButton>
        break;
      case 'Starboard':
        selectButton = <GreenButton showMenu={this.showMenu}>Select Athlete</GreenButton>
        break;
      case 'Scull':
        selectButton = <Button variant="outlined" onClick={this.showMenu}>Select Athlete</Button>
        break;
      case 'Cox':
        selectButton = <Button variant="outlined" onClick={this.showMenu}>Select Athlete</Button>
        break;
    }
      
    return (
      <div className="dropdown">
        {selectButton}
        
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

export default AthleteDropdown;