import React from 'react';
import BoatDeleteDropdown from './boatDeleteDropdown.jsx';
import AddBoatModal from './addBoatModal.jsx';
import { Typography } from '@material-ui/core';

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
      <div className="fleetContainer">
          <Typography variant="h3">Fleet</Typography>
          <AddBoatModal boatList = {boatList} getBoats = {props.getBoats}/>
          <BoatDeleteDropdown boatList = {boatList} getBoats = {props.getBoats}/>
          <div>
            {rows}
          </div>
      </div>
    );
}

export default FleetContainer;