import React from 'react';
import DeleteDropdown from './deleteDropdown.jsx';
import AddAthleteModal from './addAthleteModal.jsx';
import { Typography } from '@material-ui/core';

function RosterView(props) {

  const roster = props.roster;
  const rows = [];

  for (let i = 0; i < roster.length; i++) {
    let positions = '';
    for (let j = 0; j < roster[i].positions.length - 1; j++) {
      positions += roster[i].positions[j] + ' / ';
    } 
    positions += roster[i].positions[roster[i].positions.length - 1];

    if (roster[i].available) {
      rows.push(
        <p><span className='name'>{roster[i].name}</span><span className='positions'>{': ' + positions}</span></p>
      )
    }
  }
  
    return (
      <div className="rosterContainer">
          <Typography variant="h3">Roster</Typography>
          <AddAthleteModal roster = {roster} getRoster = {props.getRoster}/>
          <DeleteDropdown roster = {roster} getRoster = {props.getRoster}/>
          <div>
            {rows}
          </div>
      </div>
    );
}

export default RosterView;