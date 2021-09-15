import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class BoatDeleteDropdown extends Component {

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

    deleteBoat(e) {
      const name = e.target.name;
      fetch(`/api/boats/${name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/JSON'
        },
      })
        .then(resp => resp.json())
        .then((data) => {
          console.log(data);
          this.props.getBoats();
        })
        .catch(err => console.log('boatDeleteForm fetch /api/boats: ERROR: ', err));
    }

  render() {

    const buttons = [];
    const { boatList }= this.props
    boatList.forEach(boat => {
        buttons.push(
          <button name={boat.name} onClick={(event) => {this.deleteBoat(event); this.showMenu(event);}}>{boat.name}</button>)
    })

    return (
      <div className="dropdown">
        <Button variant="outlined" color="primary" onClick={this.showMenu} >
          Delete Boat
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

export default BoatDeleteDropdown;