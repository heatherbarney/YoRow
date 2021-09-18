import React, { Component } from 'react';
import { TextField, Select, FormControl, MenuItem, InputLabel } from '@mui/material';
import { Typography } from '@material-ui/core';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@material-ui/core/Button';

class BoatForm extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        boatName: '',
        abbrev: '1x',
        boatClass: 'Single',
        coxed: false,
        sweep: false,
        seatNum: 1,
        seats: [{
          number: 1,
          side: 'Scull'
        }]
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      const id = target.id;
  
      if (name === 'boatName') {
      this.setState({
        [name]: value
      });
    }
      else if (name === 'abbrev') {
        let boatClass;
        let coxed;
        let sweep;
        let seatNum;

        switch(value) {
          case '1x': 
            boatClass = 'Single';
            coxed = false;
            sweep = false;
            seatNum = 1;
            break;
          case '2x': 
            boatClass = 'Double';
            coxed = false;
            sweep = false;
            seatNum = 2;
            break;
          case '2-': 
            boatClass = 'Pair';
            coxed = false;
            sweep = true;
            seatNum = 2;
            break;
          case '2+': 
            boatClass = 'Pair';
            coxed = true;
            sweep = true;
            seatNum = 2;
            break;
          case '4x': 
            boatClass = 'Quad';
            coxed = false;
            sweep = false;
            seatNum = 4;
            break;
          case '4x+': 
            boatClass = 'Quad';
            coxed = true;
            sweep = false;
            seatNum = 4;
            break;
          case '4+': 
            boatClass = 'Four';
            coxed = true;
            sweep = true;
            seatNum = 4;
            break;
          case '4-': 
            boatClass = 'Four';
            coxed = false;
            sweep = true;
            seatNum = 4
            break;
          case '8+': 
            boatClass = 'Eight';
            coxed = true;
            sweep = true;
            seatNum = 8
            break;
          case '8x+': 
            boatClass = 'Octuple';
            coxed = true;
            sweep = false;
            seatNum = 8
            break;
        } 

        const seats = [];
        let seatDefault = (sweep === true ? 'Port' : 'Scull');
        console.log(seatDefault);
        for (let i = 1; i <= seatNum; i++) {
          seats.push({
            number: i,
            side: seatDefault
          })
        }

        this.setState({
          abbrev: value,
          boatClass,
          coxed,
          sweep,
          seatNum, 
          seats
        })
      }

      else {
        const id = name[0];
        this.setState(prevState => ({
          seats: prevState.seats.map(
            el => el.number == id ? { number: id, side: value }: el
          )
        }))
      }
    }
    
    handleSubmit(event) {
      event.preventDefault();

      //Validate data
      // Ensure no duplicate names
      let duplicate = false;
      this.props.boatList.forEach(element => {
        if (this.state.boatName === element.name) duplicate = true;
      })

      // Ensure equal port and starboard seats in sweep boats
      const sb = this.state.seats.filter(seat => seat.side === 'Starboard');
      
      if (this.state.boatName === '') alert('Name is required');
      else if(this.state.abbrev === '') alert('Boat class is required');
      else if(duplicate) alert('Name has already been used');
      else if (this.state.sweep && sb.length !== this.state.seats.length/2) alert ('Equal number of port and starboard seats required!');

      else {
      const body = {
        name: this.state.boatName,
        boatClass: this.state.boatClass,
        abbrev: this.state.abbrev,
        coxed: this.state.coxed,
        sweep: this.state.sweep,
        seats: this.state.seats,
        seatNum: this.state.seatNum,
        available: true
      };

      fetch('/api/boats', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
        .then((data) => {
          console.log(data);
          this.props.getBoats();
        })
        .catch(err => console.log('boatForm fetch /api/boat: ERROR: ', err));
      }
    }

    render() {
      const seats = [];
      if (this.state.sweep) {  
        for (let i = 0; i < this.state.seats.length; i++) {
          seats.push(
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Seat Number: {i + 1}</InputLabel>
                <Select
                  name={(i + 1) + "side"}
                  value={this.state.seats[i].side}
                  label="Boat Class"
                  onChange={this.handleInputChange}
                  label={'Seat Number ' + i + 1}
                >
                  <MenuItem value="Port">Port</MenuItem>
                  <MenuItem value="Starboard">Starboard</MenuItem>
                </Select>
              </FormControl>
            <br/>
            </div>
          )};
      }
      
      return (
        <div>
          <Typography variant="h3">Add Boat</Typography>
          <form onSubmit={(event) => {this.handleSubmit(event); this.props.closeModal(event);}}>
          <TextField
            id="outlined-name"
            name="boatName"
            label="Boat Name"
            value={this.state.BoatName}
            onChange={this.handleInputChange}
          />  
          <FormControl>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="abbrev"
              value={this.state.abbrev}
              label="Boat Class"
              onChange={this.handleInputChange}
            >
              <MenuItem value="1x">1x</MenuItem>
              <MenuItem value="2x">2x</MenuItem>
              <MenuItem value="2-">2-</MenuItem>
              <MenuItem value="2+">2+</MenuItem>
              <MenuItem value="4x">4x</MenuItem>
              <MenuItem value="4x+">4x+</MenuItem>
              <MenuItem value="4-">4-</MenuItem>
              <MenuItem value="4+">4+</MenuItem>
              <MenuItem value="8+">8+</MenuItem>
              <MenuItem value="8x+">8x+</MenuItem>
            </Select>
          </FormControl>
          <br/>
          <div className="seatContainer">
          {seats}
          </div>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </form>
        </div>
      );
    }
  }

  export default BoatForm;