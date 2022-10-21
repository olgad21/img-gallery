import React, { FC } from "react";
import "./confirmationMessage.styles.css";

interface ConfirmationMessageProps {
  onClick: () => void;
}
const ConfirmationMessage: FC<ConfirmationMessageProps> = ({ onClick }) => {
  return (
    <div
      className="confirmation-message-popup"
      data-testid="confirmation-message"
    >
      <div className="confirmation-message">
        <p>Saved!</p>
        <button onClick={onClick} className="close-button">
          X
        </button>
      </div>
    </div>
  );
};

export default ConfirmationMessage;
