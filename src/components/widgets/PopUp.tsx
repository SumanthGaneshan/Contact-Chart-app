import React, { useState,FC } from 'react';
import './PopUp.css';

interface PopProps {
    message: string
  }

const PopupMessage:FC<PopProps> = ({ message }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className={`popup-message ${show ? 'show' : ''}`}>
      <div className="popup-content">
        <p>{message}</p>
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupMessage;
