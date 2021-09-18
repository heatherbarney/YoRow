import React, { Component } from 'react';
import DateForm from "./dateForm.jsx";
import { Button } from '@material-ui/core';

class SaveLineupModal extends Component {

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
            <Button variant="outlined" color="primary" onClick={this.showModal}>Save Lineups</Button>
        {
          this.state.showModal
            ? (
              <div className = "modal">
                <div className = "modalContent">
                  <div className = "modalBody">
                    <DateForm activeBoatList={this.props.activeBoatList} lineupList={this.props.lineupList} closeModal = {this.showModal}/>
                    <div className="exitButton">
                    <Button onClick={this.showModal} variant="outlined" color="primary">Exit</Button>
                    </div>
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

export default SaveLineupModal;