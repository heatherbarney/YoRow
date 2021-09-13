import React from 'react';
import BoatDeleteDropdown from './boatDeleteDropdown.jsx';

function FleetContainer(props) {

  const { boatList } = props;
  const rows = [];

  boatList.forEach(boat => {
    if (boat.available) {
      rows.push(
        <p><span className='name'>{boat.name}</span><span className='positions'>{' (' + boat.abbrev + ')'}</span></p>
      )
    }
  })
  
    return (
      <div>
          <h2>Fleet</h2>
          <button>Add Boat</button>
          <BoatDeleteDropdown boatList = {boatList} getBoats = {props.getBoats}/>
          <div className='rosterContainer'>
            {rows}
          </div>
      </div>
    );
}

export default FleetContainer;