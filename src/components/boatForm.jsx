import React, { Component } from 'react';

class BoatForm extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        athleteName: '',
        port: false,
        starboard: false,
        sculler: false,
        coxswain: false
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {
      event.preventDefault();
  
      const positions = [];
      if (this.state.port) positions.push('Port');
      if (this.state.starboard) positions.push('Starboard');
      if (this.state.sculler) positions.push('Sculler');
      if (this.state.coxswain) positions.push('Coxswain');

      //validate data
      let duplicate = false;
      this.props.roster.forEach(element => {
        if (this.state.athleteName === element.name) duplicate = true;
      })
      if (this.state.athleteName === '') alert('Name is required');
      else if(!positions.length) alert('At least one position is required');
      else if(duplicate) alert('Name has already been used in roster');
 
      else {
      const body = {
        name: this.state.athleteName,
        positions: positions, 
        available: true
      };

      console.log(body);
      console.log(JSON.stringify(body));

      fetch('/api/roster', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
        .then((data) => {
          console.log(data);
          this.props.getRoster();
        })
        .catch(err => console.log('athleteForm fetch /api/roster: ERROR: ', err));
      }
    }

    render() {
      return (
        <form onSubmit={(event) => {this.handleSubmit(event); this.props.closeModal(event);}}>
          <label className='formLabel'>
            Boat Name:
            <input
              name="athleteName"
              type="text"
              value={this.state.boatName}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <label className='formLabel'>
            Port:
            <input
              name="port"
              type="checkbox"
              checked={this.state.port}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <label className='formLabel'>
            Starboard:
            <input
              name="starboard"
              type="checkbox"
              checked={this.state.starboard}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <label className='formLabel'>
            Sculler:
            <input
              name="sculler"
              type="checkbox"
              checked={this.state.sculler}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <label className='formLabel'>
            Coxswain:
            <input
              name="coxswain"
              type="checkbox"
              checked={this.state.coxswain}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default BoatForm;