import Modal from "react-modal";
import { formatMsg, useFormatMsgText } from "../../utils/formatMsg";
import { brandModalStyles } from "./modalStyles";

const ModalSuccess = ({ isOpen, onClose }) => {
  const contentLabel = useFormatMsgText("modalSuccessDesc");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={brandModalStyles}
      contentLabel={contentLabel}
      overlayClassName="modal-overlay"
    >
      <p>{formatMsg("modalSuccessDesc")}</p>
      <button className="modal-btn" onClick={onClose}>
        OK
      </button>
    </Modal>
  );
};

export default ModalSuccess;
