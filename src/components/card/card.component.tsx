import Modal from "components/card-modal/card-modal.component";
import { AppContext } from "contexts/context";
import Photo from "Interfaces";
import React, { useState, FC, useContext } from "react";
import { useNavigate } from "react-router";
import "./card.styles.css";

interface CardProps {
  photo: Photo;
}

const Card: FC<CardProps> = ({ photo }) => {
  const [showModal, setModal] = useState<boolean>(false);
  const { id, secret, server } = photo;
  const toggleModal = () => setModal(!showModal);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);

  const handleNavigation = () => {
    navigate("/photo");
    dispatch({
      type: "selectPhoto",
      payload: photo,
    });
  };

  return (
    <div
      className="card-container"
      data-testid="card"
      onClick={() => handleNavigation()}
    >
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
