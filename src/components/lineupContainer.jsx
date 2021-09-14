import React from 'react';
import LineupSelector from './lineupSelector.jsx';

function lineupContainer(props) {
    const { lineupList, activeBoatList } = props;

    const lineups = [];

    lineupList.forEach((lineup, index) => {
        lineups.push(
            <LineupSelector 
                lineupIndex = {index}
                lineup = {lineup} 
                activeBoatList = {activeBoatList} 
                clearAthlete = {props.clearAthlete} 
                assignAthlete = {props.assignAthlete} 
                roster = {props.roster}
                clearBoat = {props.clearBoat}
                boatList={props.boatList} 
                chooseBoat={props.chooseBoat} 
                clearLineup={props.clearLineup}
            />
        )
    })

    return(
        <div>
        <div>
            <h2>Create Lineups</h2>
            <button onClick = {(e) => {props.addLineup(); props.addActiveBoat()}}>Add Lineup</button>
        </div>
        <div className='lineupContainer'>
            {lineups}
        </div>
        </div>
    )

}

export default lineupContainer;
