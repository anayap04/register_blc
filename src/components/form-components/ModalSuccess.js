import React, { useState } from "react";
import Modal from "react-modal";
import { formatMsg } from "../../utils/formatMsg";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#5C003B",
    color: "#CFCCC5",
    width: 260,
    borderColor: "#5C003B",
    textAlign: "center",
    alignSelf: "center",
  },
};

const ModalSuccess = (modalOpen) => {
  const [modalIsOpen, setIsOpen] = useState(modalOpen);
  const closeModal = () => setIsOpen(false);
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName="modal-overlay"
      >
        <p>{formatMsg('modalSuccessDesc')}</p>
        <button className="modal-btn" onClick={() => closeModal()}>{'OK'}</button>
      </Modal>
    </div>
  );
};

export default ModalSuccess;
