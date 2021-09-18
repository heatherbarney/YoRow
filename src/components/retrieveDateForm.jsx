import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core';

class RetrieveDateForm extends Component {
    
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
 
      else this.props.retrieveLineups(this.state.date);
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
          <Button variant="contained" color="primary" type="submit">Get Lineups</Button>
        </form>
        </div>
      );
    }
  }

  export default RetrieveDateForm;