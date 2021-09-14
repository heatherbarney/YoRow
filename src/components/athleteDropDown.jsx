import React, { Component } from 'react';

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
          <button name={athlete.name} id={this.props.seat} index = {this.props.lineupIndex} onClick={(event) => {this.props.assignAthlete(event); this.showMenu(event);}}>{athlete.name}</button>)
      }
    })
    buttons.push(
      <button className='clearButton' id={this.props.seat} index = {this.props.lineupIndex}onClick={(event) => {this.props.clearAthlete(event); this.showMenu(event);}}>Clear</button>
    )


    return (
      <div className="dropdown">
        <button onClick={this.showMenu} className={this.props.side}>
          Select Athlete
        </button>
        
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