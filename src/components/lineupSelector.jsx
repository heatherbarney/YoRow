import React from 'react'
import AthleteDropdown from './athleteDropDown.jsx';

function lineupSelector(props) {

  const coxed = props.boat.coxed;
  const seats = props.boat.seats;
  const lineup = props.lineup;
  
  const rows = [];
  
  for (let i = 0; i < seats.length; i++) {
    rows.push(
      <div>
        <label><span className='seatSpan'>{seats[i].name}</span><span>{': ' + lineup[i].name}</span></label>
        <AthleteDropdown clearAthlete = {props.clearAthlete} assignAthlete={props.assignAthlete} roster={props.roster} side={seats[i].side} seat={seats[i].number}/>
      </div>
    )
  }

  // If a coxed boat, add an additional row for coxswain position
  if (coxed) {
    rows.push(
      <div>
        <label><span className='seatSpan'>{'Coxswain: '}</span><span>{lineup[8].name}</span></label>
        <AthleteDropdown assignAthlete={props.assignAthlete} clearAthlete={props.clearAthlete} roster={props.roster} side='Cox' seat='9'/>
      </div>
    )
  }

  let buttonClass;
  if (props.boat.seats.length) buttonClass = 'showButton';
  else buttonClass = 'hideButton';
  

  return (
    <div>        
      <h2>Select Athletes</h2>
      <button className={buttonClass}>Save Lineup</button>
      <button className={buttonClass} onClick={props.clearLineup}>Clear Lineup</button>
      {rows}  
    </div>
    );
}

  

export default lineupSelector;