import React, { Component } from 'react';
import BoatDropDown from './boatDropDown.jsx';

class BoatContainer extends Component {

  render() {

    return (
      <div className='boatContainer'>
          <h2>Fleet</h2>
          <button>Add Boat</button>
          <button>Delete Boat</button>
      </div>
    );
  }
}

export default BoatContainer;