import React, { Component } from 'react';

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
        buttons.push(
          <button name={boat.name} id={boat.class} onClick={(event) => {this.props.chooseBoat(event); this.showMenu(event); this.props.clearLineup()}}>{boat.name + ' (' + boat.abbrev + ')'}</button>
        )
      });
    
      buttons.push(
      <button className='clearButton' onClick={(event) => {this.props.clearBoat(event); this.showMenu(event); this.props.clearLineup(event)}}>Clear</button>
      )

    return (
      <div className="dropdown">
        <button onClick={this.showMenu}>
          Select Boat
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

export default BoatDropdown;