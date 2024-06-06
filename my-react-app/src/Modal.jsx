import React, { useState } from 'react';
import Navbar from "./Navbar"

const Modal = ({isOpen, onClose}) => {
  if (!isOpen) {
    return null; // Don't render anything if the modal is closed
  }

  return (
    <div >
      <div >
        <h2>Modal Title</h2>
        <p>Modal content goes here...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const ModalPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      {isModalOpen && <p>Modal Open </p>}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}/>
    </div>
  );
};

export default ModalPage
