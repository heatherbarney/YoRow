import React, { Component } from 'react';
import AthleteForm from "./athleteForm.jsx";

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
            <button onClick={this.showModal}>Add Athlete</button>
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