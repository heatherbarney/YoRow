import React from 'react';
import AthleteDropdown from './athleteDropDown.jsx';
import BoatDropDown from './boatDropDown.jsx';

function lineupSelector(props) {

  const { boat, lineup } = props;
  const { coxed, seats } = boat;
  
  const rows = [];
  
  for (let i = 0; i < seats.length; i++) {
    rows.push(
      <div>
        <label className='selectorLabel'><span className='seatSpan'>{seats[i].name}</span><span>{': ' + lineup[i].name}</span></label>
        <AthleteDropdown clearAthlete = {props.clearAthlete} assignAthlete={props.assignAthlete} roster={props.roster} side={seats[i].side} seat={seats[i].number}/>
      </div>
    )
  }

  // If a coxed boat, add an additional row for coxswain position
  if (coxed) {
    rows.push(
      <div>
        <label className='selectorLabel'><span className='seatSpan'>{'Coxswain: '}</span><span>{lineup[8].name}</span></label>
        <AthleteDropdown assignAthlete={props.assignAthlete} clearAthlete={props.clearAthlete} roster={props.roster} side='Cox' seat='9'/>
      </div>
    )
  }

  // toggle display of save and clear lineups buttons based on if there is a boat defined or not
  let buttonClass;
  if (props.boat.seats.length) buttonClass = 'showButton';
  else buttonClass = 'hideButton';
  
  let boatHeader;
  if (props.boat.name !== '') {
    boatHeader = <h3>{`Boat: ${boat.name} (${boat.abbrev})`}</h3>
  }
  else boatHeader = <h3>Boat:</h3>

  return (
    <div>        
      <h2>Create Lineup</h2>
      <BoatDropDown boatList={props.boatList} chooseBoat={props.chooseBoat} clearLineup={props.clearLineup}/>
      <button className={buttonClass}>Save Lineup</button>
      <button className={buttonClass} onClick={props.clearLineup}>Clear Lineup</button>
      {boatHeader}
      {rows}  
    </div>
    );
}

  

export default lineupSelector;