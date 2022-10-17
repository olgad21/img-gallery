import Modal from "components/card-modal/card-modal.component";
import Photo from "Interfaces";
import React, { Component, MouseEvent } from "react";
import "./card.styles.css";

interface CardProps {
  photo: Photo;
}

interface CardState {
  showModal: boolean,
}

class Card extends Component<CardProps, CardState> {
  state: CardState = {
    showModal: false,
  }

  openModal = () => {this.setState({
      showModal: true
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false
    })
  }
  
  render() {
    const { showModal } = this.state;

    const { id, secret, server } = this.props.photo;
    return (
      <div className="card-container" data-testid="card" onClick={this.openModal}>
        <img
          alt="monster"
          src={`https://live.staticflickr.com/${server}/${id}_${secret}_m.jpg}`}
        />
        <p>{`ID: ${id}`}</p>
        {showModal && (
          <Modal 
            closeModal={this.closeModal}
            photo = {this.props.photo}/>
        )}
      </div>
    );
  }
}

export default Card;
