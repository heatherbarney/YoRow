import React, { Component } from 'react';
import RetrieveDateForm from "./retrieveDateForm.jsx";
import { Button } from '@material-ui/core';

class RetrieveLineupModal extends Component {

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
            <Button variant="contained" color="primary" onClick={this.showModal}>Retrieve Lineups</Button>
        {
          this.state.showModal
            ? (
              <div className = "modal">
                <div className = "modalContent">
                  <div className = "modalBody">
                    <RetrieveDateForm retrieveLineups={this.props.retrieveLineups} closeModal = {this.showModal}/>
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

export default RetrieveLineupModal;