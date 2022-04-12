import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from 'react-router'
import "./ModalRegister.css";
import logoME from "../assets/img/logoMEBtn.png";
import logo from "../assets/img/logo.png";
import { formatMsg } from "../utils/formatMsg";

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

const ModalRegister = (props) => {
  const [modalIsOpen, setIsOpen] = useState(true);
  const closeModal = () => setIsOpen(false);
  const navigate = useNavigate()

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="Overlay"
      >
        <p>{formatMsg("modalDesc")}</p>
        <button
          className="button-modal"
          onClick={() => closeModal()}
          onKeyDown={() => closeModal()}
        >
          <img src={logo} alt="logo" style={{ width: 170, height: 50 }} />
        </button>
        <button className="button-modal" onClick={() => navigate('/ME')}
                onKeyPress={() => navigate('/ME')}>
          <img src={logoME} alt="logo-me" style={{ width: 120, height: 50 }} />
        </button>
      </Modal>
    </div>
  );
};

export default ModalRegister;
