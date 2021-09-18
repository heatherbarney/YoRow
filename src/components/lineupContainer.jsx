import React, { Component } from 'react';
import LineupSelector from './lineupSelector.jsx';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import SaveLineupModal from './saveLineupModal.jsx';
import RetrieveLineupModal from './retrieveLineupModal.jsx';

class LineupContainer extends Component {

  constructor(props) {
    super(props);
  }

  saveLineups() {

  };

  render() {
    const { lineupList, activeBoatList } = this.props;

    const lineups = [];

    lineupList.forEach((lineup, index) => {
        lineups.push(
            <LineupSelector 
                lineupIndex = {index}
                lineup = {lineup} 
                activeBoatList = {activeBoatList} 
                clearAthlete = {this.props.clearAthlete} 
                assignAthlete = {this.props.assignAthlete} 
                roster = {this.props.roster}
                clearBoat = {this.props.clearBoat}
                boatList={this.props.boatList} 
                chooseBoat={this.props.chooseBoat} 
                clearLineup={this.props.clearLineup}
                removeLineup={this.props.removeLineup}
            />
        )
    })

      let modal;
      if (lineupList[0] && activeBoatList[0].name !== '') modal = <SaveLineupModal activeBoatList={this.props.activeBoatList} lineupList={this.props.lineupList}/>

      let dateDisplay;
      if (this.props.date) {
        const dateString = Date.parse(this.props.date);
        const dateObj = new Date(dateString);
        console.log(dateObj);
        dateDisplay = <h3>{dateObj.toDateString()}</h3>
      }

    return(
        <div>
        <div className="lineupHeader">
            <Typography variant="h3">Create Lineups</Typography>
            <Button variant="contained" color="primary" onClick = {(e) => {this.props.addLineup(); this.props.addActiveBoat()}}>Add Lineup</Button>
            <RetrieveLineupModal retrieveLineups={this.props.retrieveLineups}/>
            {modal}
            {dateDisplay}
        </div>
        <div className="lineupsContainer">
            {lineups}
        </div>
        </div>
    )
  }
}

export default LineupContainer;
