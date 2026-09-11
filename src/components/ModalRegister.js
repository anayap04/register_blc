import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router";
import "./ModalRegister.css";
import logoME from "../assets/img/logoMEBtn.png";
import logo from "../assets/img/logo.png";
import { formatMsg, useFormatMsgText } from "../utils/formatMsg";
import { brandModalStyles } from "./form-components/modalStyles";

const ModalRegister = () => {
  const [modalIsOpen, setIsOpen] = useState(true);
  const closeModal = () => setIsOpen(false);
  const navigate = useNavigate();
  const contentLabel = useFormatMsgText("modalDesc");
  const defaultOptionLabel = useFormatMsgText("modalOptionDefault");
  const meOptionLabel = useFormatMsgText("modalOptionME");

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={brandModalStyles}
      contentLabel={contentLabel}
      overlayClassName="Overlay"
    >
      <p>{formatMsg("modalDesc")}</p>
      <button
        className="button-modal"
        aria-label={defaultOptionLabel}
        onClick={closeModal}
      >
        <img src={logo} alt="" style={{ width: 170, height: 50 }} />
      </button>
      <button
        className="button-modal"
        aria-label={meOptionLabel}
        onClick={() => navigate("/ME")}
      >
        <img src={logoME} alt="" style={{ width: 120, height: 50 }} />
      </button>
    </Modal>
  );
};

export default ModalRegister;
