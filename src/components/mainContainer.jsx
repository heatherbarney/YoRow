import React, { Component } from 'react';
import LineupSelector from './lineupSelector.jsx';
import BoatContainer from './boatContainer.jsx';
import RosterView from './rosterView.jsx';
import AthleteForm from './athleteForm.jsx';
//import LineupsDisplay from './lineupsDisplay.jsx';


class MainContainer extends Component {
  
  constructor() {
    super();
    this.state = {
      roster: [],
      lineup: [
        {
          number: '1',
          name: ''
        },
        {
          number: '2',
          name: ''
        },
        {
          number: '3',
          name: ''
        },
        {
          number: '4',
          name: ''
        },
        {
          number: '5',
          name: ''
        },
        {
          number: '6',
          name: ''
        },
        {
          number: '7',
          name: ''
        },
        {
          number: '8',
          name: ''
        },
        {
          number: '9',
          name: ''
        }, 
      ],
      boat: {
        name: null,
        class: null,
        abbrev: null,
        coxed: null,
        sweep: null,
        seats: [],
      },
      boatList: [],
    }

    this.assignAthlete = this.assignAthlete.bind(this);
    this.chooseBoat = this.chooseBoat.bind(this); 
    this.clearLineup = this.clearLineup.bind(this);
    this.clearAthlete = this.clearAthlete.bind(this);
    this.getRoster = this.getRoster.bind(this);
  }

 componentDidMount () {
   this.getBoats();
   this.getRoster();
 }

 getRoster() {
  fetch('/api/roster'
  ,{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  }
  )
    .then(data => data.json())
    .then(json => this.setState({ roster: json }))
}

  getBoats() {
    fetch('/api/boats'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(data => data.json())
      .then(json => this.setState({ boatList: json }));
  }

  assignAthlete(e) {
    const name = e.target.name;
    const seat = e.target.id;
    const currName = this.state.lineup[seat-1].name;

    if (currName !== '') {
      this.setState(prevState => ({
        roster: prevState.roster.map(
          el => el.name === currName ? { ...el, available: true }: el
        )
      }))
    }

    this.setState(prevState => ({
      lineup: prevState.lineup.map(
        el => el.number === seat ? { ...el, name: name }: el
      )
    }))

    this.setState(prevState => ({
      roster: prevState.roster.map(
        el => el.name === name ? { ...el, available: false }: el
      )
    }))
  }

  clearLineup(e) {
    this.setState(prevState => ({
      lineup: prevState.lineup.map(
        el => el.name !== '' ? { ...el, name: '' }: el
      )
    }))

    this.setState(prevState => ({
      roster: prevState.roster.map(
        el => el.available === false ? { ...el, available: true }: el
      )
    })) 
  }

  clearAthlete(e) {
    const seat = e.target.id;
    const currName = this.state.lineup[seat-1].name;

    if (currName !== '') {
      this.setState(prevState => ({
        roster: prevState.roster.map(
          el => el.name === currName ? { ...el, available: true }: el
        )
      }))
    }

    this.setState(prevState => ({
      lineup: prevState.lineup.map(
        el => el.number === seat ? { ...el, name: '' }: el
      )
    }))
  }
  
  chooseBoat(e) {
    const boatName = e.target.name;
    this.state.boatList.forEach(boat => {
      if (boatName === boat.name) {
        this.setState({boat: boat})
      }
    })
  }

  render() {

    return (
      <div className="mainContainer">
        <div className="selectionContainer">
          <RosterView roster={this.state.roster} getRoster = {this.getRoster}/>
          <AthleteForm roster={this.state.roster} getRoster = {this.getRoster}/>
          <BoatContainer boatList={this.state.boatList} boat={this.state.boat} chooseBoat={this.chooseBoat} clearLineup={this.clearLineup}/>
          <LineupSelector lineup={this.state.lineup} roster={this.state.roster} boat={this.state.boat} assignAthlete={this.assignAthlete} clearLineup={this.clearLineup} clearAthlete={this.clearAthlete}/>
        </div>
        <div>
        </div>
      </div>
      
    );
  }
}

export default MainContainer;