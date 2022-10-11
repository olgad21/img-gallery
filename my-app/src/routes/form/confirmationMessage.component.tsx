import { FC } from "react";
import './confirmationMessage.styles.css';

interface ConfirmationMessageProps {
  onClick: () => void;
}
const ConfirmationMessage: FC<ConfirmationMessageProps> = (props) => {
  return (
    <div className='confirmation-message'>
      <p>Saved!</p>
      <button onClick = {props.onClick} className='close-button'>X</button>
    </div>
  )
}

export default ConfirmationMessage;