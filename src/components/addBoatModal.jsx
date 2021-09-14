import React, { Component } from 'react';
import BoatForm from "./boatForm.jsx";

class AddBoatModal extends Component {

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
            <button onClick={this.showModal}>Add Boat</button>
        {
          this.state.showModal
            ? (
              <div className = "modal">
                <div className = "modalContent">
                  <div className = "modalBody">
                    <BoatForm boatList = {this.props.boatList} getBoats = {this.props.getBoats} closeModal = {this.showModal}/>
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

export default AddBoatModal;