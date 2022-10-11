import React, { Component } from "react";
import Card from "../card/card.component";
import { Monster } from "../../routes/home/home.component";
import "./card-list.styles.css";

interface CardListProps {
  monsters: Monster[];
}

class CardList extends Component<CardListProps> {
  render() {
    const { monsters } = this.props;
    return (
      <div className="card-list" data-testid="card-list">
        {monsters.map((monster) => {
          return <Card key={monster.id} monster={monster} />;
        })}
      </div>
    );
  }
}

export default CardList;
