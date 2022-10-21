import Modal from "components/card-modal/card-modal.component";
import Photo from "Interfaces";
import React, { Component } from "react";
import "./card.styles.css";

interface CardProps {
  photo: Photo;
}

interface CardState {
  showModal: boolean;
}

class Card extends Component<CardProps, CardState> {
  state: CardState = {
    showModal: false,
  };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    const { showModal } = this.state;

    const { id, secret, server } = this.props.photo;
    return (
      <div
        className="card-container"
        data-testid="card"
        onClick={this.toggleModal}
      >
        <img
          alt="monster"
          src={`https://live.staticflickr.com/${server}/${id}_${secret}_m.jpg}`}
        />
        <p>{`ID: ${id}`}</p>
        {showModal && (
          <Modal toggleModal={this.toggleModal} photo={this.props.photo} />
        )}
      </div>
    );
  }
}

export default Card;
