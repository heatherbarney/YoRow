import React from 'react';
import AthleteDropdown from './athleteDropDown.jsx';
import BoatDropDown from './boatDropDown.jsx';

function lineupSelector(props) {

  const { lineup } = props;
  const boat = props.activeBoatList[props.lineupIndex];
  const { coxed, seats, abbrev} = boat;
  
  const rows = [];
  
  for (let i = 0; i < seats.length; i++) {
    let seatName;
    if (abbrev === '1x') seatName = 'Single Sculler';
    else if (i === seats.length - 1) seatName = 'Stroke Seat';
    else {
      switch (seats[i].number) {
        case 1: 
          seatName = 'Bow Seat';
          break;
        case 2: 
          seatName = 'Two-Seat';
          break;
        case 3: 
          seatName = 'Three-Seat';
          break;
        case 4: 
          seatName = 'Four-Seat';
          break;
        case 5: 
          seatName = 'Five-Seat';
          break;
        case 6: 
          seatName = 'Six-Seat';
          break;
        case 7: 
          seatName = 'Seven-Seat';
          break;
      }
    }
    rows.push(
      <div>
        <label className='selectorLabel'><span className='seatSpan'>{seatName}</span><span>{': ' + lineup[i].name}</span></label>
        <AthleteDropdown 
          lineupIndex = {props.lineupIndex} 
          clearAthlete = {props.clearAthlete} 
          assignAthlete={props.assignAthlete} 
          roster={props.roster} 
          side={seats[i].side} 
          seat={seats[i].number}
        />
      </div>
    )
  }

  // If a coxed boat, add an additional row for coxswain position
  if (coxed) {
    rows.push(
      <div>
        <label className='selectorLabel'><span className='seatSpan'>{'Coxswain: '}</span><span>{lineup[8].name}</span></label>
        <AthleteDropdown 
          lineupIndex = {props.lineupIndex} 
          assignAthlete={props.assignAthlete} 
          clearAthlete={props.clearAthlete} 
          roster={props.roster} 
          side='Cox' seat='9'
        />
      </div>
    )
  }

  // toggle display of save and clear lineups buttons based on if there is a boat defined or not
  let buttonClass;
  if (boat.seats.length) buttonClass = 'showButton';
  else buttonClass = 'hideButton';
  
  let boatHeader;
  if (boat.name !== '') {
    boatHeader = <h3>{`Boat: ${boat.name} (${boat.abbrev})`}</h3>
  }
  else boatHeader = <h3>Boat:</h3>

  return (
    <div>        
      <BoatDropDown 
        lineupIndex = {props.lineupIndex} 
        clearBoat = {props.clearBoat} 
        boatList={props.boatList} 
        chooseBoat={props.chooseBoat} 
        clearLineup={props.clearLineup}
      />
      <button className={buttonClass}>Save Lineup</button>
      <button className={buttonClass} onClick={props.clearLineup}>Clear Lineup</button>
      {boatHeader}
      {rows}  
    </div>
    );
}

  

export default lineupSelector;