import React, { Component } from 'react';
import AthleteForm from "./athleteForm.jsx";
import { Button } from '@material-ui/core';

class AddAthleteModal extends Component {

    constructor(props) {
      super(props);
      
      this.state = {
        showModal: false,
      }
      
      this.showModal = this.showModal.bind(this);
    }
    
    showModal(event) {
      event.preventDefault();
      
      this.state.showModal
        ? (
          this.setState({
            showModal: false,
          })
          )
          : (
            this.setState({
              showModal: true,
            })
          )
    }

    render() {
        return(
          <div className="modalButton">
            <Button variant="outlined" color="primary" onClick={this.showModal}>Add Athlete</Button>
        {
          this.state.showModal
            ? (
              <div className = "modal">
                <div className = "modalContent">
                  <div className = "modalBody">
                    <AthleteForm roster = {this.props.roster} getRoster = {this.props.getRoster} closeModal = {this.showModal}/>
                    <button onClick={this.showModal}>Exit</button>
                  </div>
                </div>
              </div>
            )
            : (
              null
            )
        }
        </div>
        )
    }
  }

export default AddAthleteModal;