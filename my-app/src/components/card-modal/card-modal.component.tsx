import Photo from "Interfaces";
import React, { FC, MouseEvent } from "react";
import { createPortal } from "react-dom";
import '../../routes/form/confirmationMessage.styles.css';
import './card-modal.styles.css';

interface ModalProps {
  closeModal: () => void;
  photo: Photo;
}

const ModalContent: FC<ModalProps> = ({ closeModal, photo }) => {
  const { id, title, secret, server, owner } = photo;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if ((e.target as HTMLDivElement | HTMLButtonElement).className === 'confirmation-message-popup') {
      closeModal();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="confirmation-message-popup"
      data-testid="confirmation-message"
    >
      <div className="modal-content">
        <button onClick={closeModal} className="modal-button">
          X
        </button>
        <h2>{title}</h2>
        <p>{`Owner: ${owner}`}</p>
        <p>{`ID: ${id}`}</p>
        <p>{`Server: ${server}`}</p>
        <img
          alt="monster"
          src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg}`}
        />
      </div>
    </div>
  );
};

const Modal: FC<ModalProps> = ({ closeModal, photo }) => {
  return createPortal(
    <ModalContent photo={photo} closeModal={closeModal} />,
    document.getElementById('home') as Element
  )
}

export default Modal;
