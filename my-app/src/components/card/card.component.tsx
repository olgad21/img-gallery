import { Component } from 'react';
import './card.styles.css';
import { Monster } from '../../App';

interface CardProps {
  monster: Monster,
}

class Card extends Component<CardProps> {
  render() {
    const { monster }= this.props;
    const { name, username, website, email, id } = monster;
    return (
      <div key={monster.id} className='card-container'>
        <img alt='monster' src={`https://robohash.org/${id}?set=set2&size=180x180`}/>
        <h2>{name}</h2>
        <p>{`Username: ${username}`}</p>
        <p>{website}</p>
        <p>{`E-mail: ${email}`}</p>
      </div>
    )
  }
}

export default Card;