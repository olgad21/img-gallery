import Modal from "components/card-modal/card-modal.component";
import Photo from "Interfaces";
import React, { useState, FC } from "react";
import "./card.styles.css";

interface CardProps {
  photo: Photo;
}

const Card: FC<CardProps> = ({ photo }) => {
  const [showModal, setModal] = useState<boolean>(false);
  const { id, secret, server } = photo;
  const toggleModal = () => setModal(!showModal);

  return (
    <div className="card-container" data-testid="card" onClick={toggleModal}>
      <img
        alt="monster"
        src={`https://live.staticflickr.com/${server}/${id}_${secret}_m.jpg}`}
      />
      <p>ID: {id}</p>
      {showModal && <Modal toggleModal={toggleModal} photo={photo} />}
    </div>
  );
};

export default Card;
