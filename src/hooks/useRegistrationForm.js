import { useState } from "react";
import { useForm } from "react-hook-form";
import { submitRegistration, REGISTRATION_STATUS } from "../utils/registrationApi";

const REGISTRATION_FIELDS = [
  "code",
  "firstName",
  "lastName",
  "uid",
  "event",
  "mail",
  "phone-input",
];

/**
 * Shared submit/validation/reset logic behind the registration forms for
 * both site variants (default and "ME"). `fixedEventId`, when provided,
 * skips the event radio group entirely (the ME site only ever registers
 * for a single fixed event).
 */
export const useRegistrationForm = ({ fixedEventId } = {}) => {
  const form = useForm();
  const { handleSubmit, resetField } = form;

  const [noUid, setNoUid] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [errorLabel, setErrorLabel] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    setInvalidCode(false);
    setErrorLabel(false);

    const payload = {
      boleto: data.code,
      nombre: data.firstName,
      apellido: data.lastName,
      uid: noUid ? "0000000" : data.uid,
      evento: fixedEventId !== undefined ? fixedEventId : data.event,
      email: data.mail,
      telefono: data["phone-input"],
    };

    const result = await submitRegistration(payload);

    if (result.status === REGISTRATION_STATUS.SUCCESS) {
      setShowSuccessModal(true);
      REGISTRATION_FIELDS.forEach((field) => resetField(field));
    } else if (result.status === REGISTRATION_STATUS.INVALID_CODE) {
      setInvalidCode(true);
    } else {
      setErrorLabel(true);
    }
  });

  return {
    ...form,
    onSubmit,
    noUid,
    setNoUid,
    invalidCode,
    errorLabel,
    showSuccessModal,
    closeSuccessModal: () => setShowSuccessModal(false),
  };
};
