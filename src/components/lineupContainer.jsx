import React from 'react';
import LineupSelector from './lineupSelector.jsx';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

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
                removeLineup={props.removeLineup}
            />
        )
    })

    return(
        <div>
        <div className="lineupHeader">
            <Typography variant="h3">Create Lineups</Typography>
            <Button variant="contained" color="primary" onClick = {(e) => {props.addLineup(); props.addActiveBoat()}}>Add Lineup</Button>
        </div>
        <div className="lineupsContainer">
            {lineups}
        </div>
        </div>
    )

}

export default lineupContainer;
