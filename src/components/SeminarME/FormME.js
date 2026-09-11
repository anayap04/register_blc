import "./FormME.css";
import Input from "../form-components/Input";
import PhoneNbrInput from "../form-components/PhoneNbrInput";
import { formatMsg } from "../../utils/formatMsg";
import ModalSuccess from "../form-components/ModalSuccess";
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import { useIsLargeScreen } from "../../hooks/useIsLargeScreen";

const ME_EVENT_ID = 9;

const FormME = () => {
  const isLargeSize = useIsLargeScreen();
  const {
    register,
    control,
    formState: { errors },
    onSubmit,
    noUid,
    setNoUid,
    invalidCode,
    errorLabel,
    showSuccessModal,
    closeSuccessModal,
  } = useRegistrationForm({ fixedEventId: ME_EVENT_ID });

  const arrayFields = [
    { name: formatMsg("name"), id: "firstName", type: "text" },
    { name: formatMsg("lastName"), id: "lastName", type: "text" },
    { name: formatMsg("uid"), id: "uid", type: "number", isDisabled: noUid },
    { name: formatMsg("mail"), id: "mail", type: "mail" },
    { name: formatMsg("code"), id: "code", type: "number" },
  ];

  return (
    <div>
      <ModalSuccess isOpen={showSuccessModal} onClose={closeSuccessModal} />
      <form onSubmit={onSubmit}>
        {Object.keys(errors).length !== 0 && (
          <p role="alert" style={{ paddingLeft: isLargeSize ? 80 : 30 }} className="error-text-me">
            {formatMsg("error")}
          </p>
        )}
        {invalidCode && (
          <p role="alert" style={{ paddingLeft: isLargeSize ? 80 : 30 }} className="error-text-me">
            {formatMsg("errorNoCode")}
          </p>
        )}
        {errorLabel && (
          <p role="alert" style={{ paddingLeft: isLargeSize ? 80 : 30 }} className="error-text-me">
            {formatMsg("errorGral")}
          </p>
        )}

        <label className="no-uid-me" style={{ paddingLeft: isLargeSize ? 80 : 30 }}>
          <input
            type="checkbox"
            checked={noUid}
            onChange={(e) => setNoUid(e.target.checked)}
          />
          {formatMsg("noUIDME")}
        </label>

        <Input arrayFields={arrayFields} errors={errors} register={register} isME />
        <PhoneNbrInput control={control} isME />
        <button className="submit-button-me" type="submit">
          {formatMsg("submit")}
        </button>
      </form>
    </div>
  );
};

export default FormME;
