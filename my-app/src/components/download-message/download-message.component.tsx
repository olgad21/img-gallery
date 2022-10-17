import React, { FC } from "react";
import '../../routes/form/confirmationMessage.styles.css';
import './download-message.styles.css';

const DownloadMessage = () => {
  return (
    <div className='confirmation-message-popup'>
      <p className='download-message'>Downloading...</p>
    </div>
  )
};

export default DownloadMessage;