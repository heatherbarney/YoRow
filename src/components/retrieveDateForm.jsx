import React, { Component } from 'react';

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
        <form onSubmit={(event) => {this.handleSubmit(event); this.props.closeModal(event);}}>
          <label className='formLabel'>
            Practice Date:
            <input
              name="date"
              type="date"
              value={this.state.date}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default RetrieveDateForm;