import React, { Component } from 'react';

class DeleteDropdown extends Component {

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

    deleteAthlete(e) {
      const name = e.target.name;
      fetch(`/api/roster/${name}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/JSON'
        },
      })
        .then(resp => resp.json())
        .then((data) => {
          console.log(data);
          this.props.getRoster();
        })
        .catch(err => console.log('athleteForm fetch /api/roster: ERROR: ', err));
    }

  render() {

    const buttons = [];
    const roster = this.props.roster;
    roster.forEach(athlete => {
        buttons.push(
          <button name={athlete.name} onClick={(event) => {this.deleteAthlete(event); this.showMenu(event);}}>{athlete.name}</button>)
    })

    return (
      <div className="dropdown">
        <button onClick={this.showMenu} className={this.props.side}>
          Delete Athlete
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

export default DeleteDropdown;