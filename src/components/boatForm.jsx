import React, { Component } from 'react';

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

      else if (name === 'side') {
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
        class: this.state.boatClass,
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
            <label>
              Seat Number: {i + 1}
              <select name="side" id = {i + 1} value={this.state.seats[i].side} onChange={this.handleInputChange}>
                <option value="Port">Port</option>
                <option value="Starboard">Starboard</option>
              </select>
            </label>
            <br/>
            </div>
          )};
      }
      
      return (
        <form onSubmit={(event) => {this.handleSubmit(event); this.props.closeModal(event);}}>
          <label className='formLabel'>
            Boat Name:
            <input
              name="boatName"
              type="text"
              value={this.state.boatName}
              onChange={this.handleInputChange} />
          </label>
          <br/>
          <label>
            Boat Class:
            <select name="abbrev" value={this.state.abbrev} onChange={this.handleInputChange}>
              <option value="1x">1x</option>
              <option value="2x">2x</option>
              <option value="2-">2-</option>
              <option value="2+">2+</option>
              <option value="4x">4x</option>
              <option value="4x+">4x+</option>
              <option value="4-">4-</option>
              <option value="4+">4+</option>
              <option value="8+">8+</option>
              <option value="8x+">8x+</option>
            </select>
          </label>
          <br/>
          {seats}
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default BoatForm;