import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';

class DateForm extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        date: ''
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    handleSubmit(event) {
      event.preventDefault();

      //validate data
      if (this.state.date === '') alert('Date is required');
 
      else {
      const body = {
        date: this.state.date,
        lineups: this.props.lineupList,
        boats: this.props.activeBoatList
      };

      console.log(body);

      fetch('/api/practice', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
        .then((data) => {
          alert('Lineups saved!');
        })
        .catch(err => console.log('athleteForm fetch /api/roster: ERROR: ', err));
      }
    }

    render() {
      return (
        <div>
        <Typography variant="h4">Select Date</Typography>
        <form onSubmit={(event) => {this.handleSubmit(event); this.props.closeModal(event);}}>  
            <input
              className="datePicker" 
              name="date"
              type="date"
              value={this.state.date}
              onChange={this.handleInputChange} />
          <br/>
          <Button variant="contained" color="primary" type="submit">Save Lineups</Button>
        </form>
        </div>
      );
    }
  }

  export default DateForm;