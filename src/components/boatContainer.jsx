import React, { Component } from 'react';
import eight from '../assets/Eight.jpg';
import pair from '../assets/Pair.jpg';
import four from '../assets/Four.jpg';
import single from '../assets/Single.jpg';
import double from '../assets/Double.jpg';
import quad from '../assets/Quad.jpg';
import BoatDropDown from './boatDropDown.jsx';

class BoatContainer extends Component {

  render() {

    const boatClass = this.props.boat.class;
    const boatName = this.props.boat.name;
    let boat;

    switch(boatClass) {
      case 'Pair':
        boat = pair;
        break;
      case 'Coxed Four':
        boat = four;
        break;
      case 'Straight Four':
        boat = four;
        break;
      case 'Eight':
        boat = eight;
        break;
      case 'Single':
        boat = single;
        break;
      case 'Double':
        boat = double;
        break;
      case 'Quad':
        boat = quad;
        break;
      default:
        // code block
    }

    return (
      <div className='boatContainer'>
          <h2>Boat</h2>
          <BoatDropDown boatList={this.props.boatList} chooseBoat={this.props.chooseBoat} clearLineup={this.props.clearLineup}/>
          <button>Add Boat</button>
          <button>Delete Boat</button>
          {boatName
            ? (
              <h3>{boatName + ' (' + this.props.boat.abbrev + ')'}</h3>
            )
            : (
              null
            )
          }
          {boatClass
            ? (
              <img src={boat} alt="Boat"/>
            )
            : (
              null
            )
          }
          
      </div>
    );
  }
}

export default BoatContainer;