import Photo from "Interfaces";
import React, { Component } from "react";
import "./card.styles.css";

interface CardProps {
  photo: Photo;
}

class Card extends Component<CardProps> {
  render() {
    const { id, title, secret, server, farm} = this.props.photo;
    return (
      <div className="card-container" data-testid="card">
        <img
          alt="monster"
          src={`https://live.staticflickr.com/${server}/${id}_${secret}_m.jpg}`}
        />
        {/* <h2>{title}</h2> */}
        {/* <p>{`Owner: ${owner}`}</p>
        <p>{`ID: ${id}`}</p> */}
        <p>{`ID: ${id}`}</p>
      </div>
    );
  }
}

export default Card;
