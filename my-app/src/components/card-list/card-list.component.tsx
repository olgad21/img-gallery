import Photo from "Interfaces";
import React, { Component } from "react";
import Card from "../card/card.component";
import "./card-list.styles.css";

interface CardListProps {
  photos: Photo[];
}

class CardList extends Component<CardListProps> {
  render() {
    const { photos } = this.props;
    return (
      <div className="card-list" data-testid="card-list">
        {photos.map((photo) => {
          return <Card key={photo.id} photo={photo} />;
        })}
      </div>
    );
  }
}

export default CardList;
