import React from 'react';

function FleetContainer(props) {

  const boats = props.boatList;
  const rows = [];

  boats.forEach(boat => {
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
          <button>Delete Boat</button>
          <div className='rosterContainer'>
            {rows}
          </div>
      </div>
    );
}

export default FleetContainer;