import "./Form.css";
import RadioButtonGroup from "../form-components/RadioButtonGroup";
import Input from "../form-components/Input";
import PhoneNbrInput from "../form-components/PhoneNbrInput";
import { formatMsg } from "../../utils/formatMsg";
import ModalRegister from "../ModalRegister";
import ModalSuccess from "../form-components/ModalSuccess";
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import { useIsLargeScreen } from "../../hooks/useIsLargeScreen";

const Form = () => {
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
  } = useRegistrationForm();

  const arrayFields = [
    { name: formatMsg("name"), id: "firstName", type: "text" },
    { name: formatMsg("lastName"), id: "lastName", type: "text" },
    { name: formatMsg("uid"), id: "uid", type: "number", isDisabled: noUid },
    { name: formatMsg("mail"), id: "mail", type: "mail" },
    { name: formatMsg("code"), id: "code", type: "number" },
  ];

  return (
    <div>
      <ModalRegister />
      <ModalSuccess isOpen={showSuccessModal} onClose={closeSuccessModal} />
      <form onSubmit={onSubmit}>
        {Object.keys(errors).length !== 0 && (
          <p role="alert" style={{ paddingLeft: isLargeSize ? 80 : 30 }} className="error-text">
            {formatMsg("error")}
          </p>
        )}
        {invalidCode && (
          <p role="alert" style={{ paddingLeft: isLargeSize ? 80 : 30 }} className="error-text">
            {formatMsg("errorNoCode")}
          </p>
        )}
        {errorLabel && (
          <p role="alert" style={{ paddingLeft: isLargeSize ? 80 : 30 }} className="error-text">
            {formatMsg("errorGral")}
          </p>
        )}

        <label className="no-uid" style={{ paddingLeft: isLargeSize ? 80 : 30 }}>
          <input
            type="checkbox"
            checked={noUid}
            onChange={(e) => setNoUid(e.target.checked)}
          />
          {formatMsg("noUID")}
        </label>

        <Input arrayFields={arrayFields} errors={errors} register={register} />
        <PhoneNbrInput control={control} />
        <RadioButtonGroup register={register} />
        <button className="submit-button" type="submit">
          {formatMsg("submit")}
        </button>
      </form>
    </div>
  );
};

export default Form;
