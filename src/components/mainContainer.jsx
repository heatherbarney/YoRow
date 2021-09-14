import React, { Component } from 'react';
import LineupContainer from './lineupContainer.jsx';
import FleetContainer from './fleetContainer.jsx';
import RosterView from './rosterView.jsx';


class MainContainer extends Component {
  
  constructor() {
    super();
    this.state = {
      roster: [],
      lineupList: [],
      activeBoatList: [],
      boatList: [],
    }

    this.assignAthlete = this.assignAthlete.bind(this);
    this.chooseBoat = this.chooseBoat.bind(this); 
    this.clearLineup = this.clearLineup.bind(this);
    this.clearAthlete = this.clearAthlete.bind(this);
    this.getRoster = this.getRoster.bind(this);
    this.getBoats = this.getBoats.bind(this);
    this.clearBoat = this.clearBoat.bind(this);
    this.addLineup = this.addLineup.bind(this);
    this.addActiveBoat = this.addActiveBoat.bind(this);
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

  addLineup() {
    const newLineup = [  
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
    ] 

    const newState = [...this.state.lineupList];
    newState.push(newLineup);
    this.setState({lineupList: newState});
  }

  addActiveBoat() {
    const newBoat= {
      name: '',
      class: null,
      abbrev: null,
      coxed: null,
      sweep: null,
      seats: [],
    }

    const newState = [...this.state.activeBoatList];
    newState.push(newBoat);
    this.setState({activeBoatList: newState});
  }

  assignAthlete(e) {
    const name = e.target.name;
    const seat = e.target.id;
    const index = e.target.title;
    const lineup = this.state.lineupList[index];
    const currName = lineup[seat-1].name;

    // Update old athlete to be available
    if (currName !== '') {
      this.setState(prevState => ({
        roster: prevState.roster.map(
          el => el.name === currName ? { ...el, available: true }: el
        )
      }))
    }
    
    // Update new athlete to be unavailable
    this.setState(prevState => ({
      roster: prevState.roster.map(
        el => el.name === name ? { ...el, available: false }: el
      )
    }))

    // Update seat in lineup
    const newLineup = lineup.map(el => el.number === seat ? { ...el, name: name }: el);
    let lineupList = [...this.state.lineupList];
    lineupList[index] = [...newLineup];
    this.setState({lineupList});
  }

  clearLineup(e) {
    const index = e.target.id;
    const lineup = this.state.lineupList[index];

    const assignedNames = lineup.map(object => object.name !== '' ? object.name : null);
    console.log(assignedNames);

    this.setState(prevState => ({
      roster: prevState.roster.map(
        el => assignedNames.includes(el.name) ? { ...el, available: true }: el
      )
    }))  

    const newLineup = lineup.map(el => el.name !== '' ? { ...el, name: '' }: el);
    let lineupList = [...this.state.lineupList];
    lineupList[index] = [...newLineup];
    this.setState({lineupList});

  }

  clearAthlete(e) {
    const seat = e.target.id;
    const index = e.target.title;
    const lineup = this.state.lineupList[index];
    const currName = lineup[seat-1].name;

    if (currName !== '') {
      this.setState(prevState => ({
        roster: prevState.roster.map(
          el => el.name === currName ? { ...el, available: true }: el
        )
      }))
    }

    const newLineup = lineup.map(el => el.number === seat ? { ...el, name: '' }: el);
    let lineupList = [...this.state.lineupList];
    lineupList[index] = [...newLineup];
    this.setState({lineupList});
  }
  
  clearBoat(e) {
    const index = e.target.id;
    const currName = this.state.activeBoatList[index].name;

    if (currName !== '') {
      this.setState(prevState => ({
        boatList: prevState.boatList.map(
          el => el.name === currName ? { ...el, available: true }: el
        )
      }))
    }

    const emptyBoat = {
      name: '',
      class: null,
      abbrev: null,
      coxed: null,
      sweep: null,
      seats: [],
    }

    const activeBoatList = [...this.state.activeBoatList];
    activeBoatList[index] = emptyBoat;
    this.setState({activeBoatList});

  }

  chooseBoat(e) {
    const boatName = e.target.name;
    const index = e.target.id;
    const currBoat = this.state.activeBoatList[index].name;
    
    if (currBoat !== '') {
      this.setState(prevState => ({
        boatList: prevState.boatList.map(
          el => el.name === currBoat ? { ...el, available: true }: el
        )
      }))
    }

    const newBoat = this.state.boatList.find(el => el.name === boatName);
    let activeBoatList = [...this.state.activeBoatList];
    activeBoatList[index] = newBoat;
    this.setState({activeBoatList});

    this.state.boatList.forEach(boat => {
      if (boatName === boat.name) {
        this.setState({boat: boat})
      }
    })

    this.setState(prevState => ({
      boatList: prevState.boatList.map(
        el => el.name === boatName ? { ...el, available: false }: el
      )
    }))
  }

  render() {

    return (
      <div className="mainContainer">
        <div className="selectionContainer">
          <RosterView 
            roster={this.state.roster} 
            getRoster = {this.getRoster}
          />
          <FleetContainer 
            boatList={this.state.boatList} 
            getBoats = {this.getBoats}
          />
          <LineupContainer 
            addLineup = {this.addLineup} 
            clearBoat = {this.clearBoat} 
            boatList={this.state.boatList} 
            lineupList={this.state.lineupList} 
            roster={this.state.roster} 
            activeBoatList={this.state.activeBoatList}
            chooseBoat={this.chooseBoat} 
            clearLineup={this.clearLineup}
            assignAthlete={this.assignAthlete}
            clearLineup={this.clearLineup}
            clearAthlete={this.clearAthlete}
            addActiveBoat={this.addActiveBoat}
          />
        </div>
        <div>
        </div>
      </div>
      
    );
  }
}

export default MainContainer;