import Modal from "components/card-modal/card-modal.component";
import Photo from "Interfaces";

import React, { useState } from "react";
import "./card.styles.css";

interface CardProps {
  photo: Photo;
}

const Card = (props: CardProps) => {
  const [showModal, setModal] = useState(false);
  const { id, secret, server } = props.photo;
  const toggleModal = () => setModal(!showModal);

  return (
    <div className="card-container" data-testid="card" onClick={toggleModal}>
      <img
        alt="monster"
        src={`https://live.staticflickr.com/${server}/${id}_${secret}_m.jpg}`}
      />
      <p>{`ID: ${id}`}</p>
      {showModal && <Modal toggleModal={toggleModal} photo={props.photo} />}
    </div>
  );
};

export default Card;
