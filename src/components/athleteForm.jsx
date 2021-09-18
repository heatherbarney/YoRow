import React, { Component } from 'react';
import { TextField } from '@mui/material';
import { Typography } from '@material-ui/core';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@material-ui/core/Button';

class AthleteForm extends Component {
    
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
      if (this.state.sculler) positions.push('Scull');
      if (this.state.coxswain) positions.push('Cox');

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
        <div>
        <Typography variant="h3">Add Athlete</Typography>
        <form onSubmit={(event) => {this.handleSubmit(event); this.props.closeModal(event);}}>
            <TextField
              id="outlined-name"
              name="athleteName"
              label="Athlete Name"
              value={this.state.Athletename}
              onChange={this.handleInputChange}
            />
          <br/>
          <FormGroup>
            <FormControlLabel control={<Checkbox
              size="large"
              name="port"
              checked={this.state.port}
              onChange={this.handleInputChange}
              inputProps={{ 'aria-label': 'controlled' }}/>} label="Port" />
            <FormControlLabel control={<Checkbox
              size="large"
              name="starboard"
              checked={this.state.starboard}
              onChange={this.handleInputChange}
              inputProps={{ 'aria-label': 'controlled' }}/>} label="Starboard" />
            <FormControlLabel control={<Checkbox
              size="large"
              name="sculler"
              checked={this.state.sculler}
              onChange={this.handleInputChange}
              inputProps={{ 'aria-label': 'controlled' }}/>} label="Sculler" />
            <FormControlLabel control={<Checkbox
              size="large"
              name="coxswain"
              checked={this.state.coxswain}
              onChange={this.handleInputChange}
              inputProps={{ 'aria-label': 'controlled' }}/>} label="Coxswain" />
          </FormGroup>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </form>
        </div>
      );
    }
  }

  export default AthleteForm;