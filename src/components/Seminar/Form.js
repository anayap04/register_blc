import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useScreenClass } from "react-grid-system";
import "./Form.css";
import RadioButtonGroup from "../form-components/RadioButtonGroup";
import Input from "../form-components/Input";
import PhoneNbrInput from "../form-components/PhoneNbrInput";
import { formatMsg } from "../../utils/formatMsg";
import ModalRegister from "../ModalRegister";
import { availableCodes } from "../../utils/availableCodes";
import ModalSuccess from "../form-components/ModalSuccess";
import Constants from "../../utils/constants";

const Form = () => {
  const screenClass = useScreenClass();
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
  } = useForm();

  const isLargeSize = ["lg", "xl", "xxl"].includes(screenClass);
  const [checked, setChecked] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [errorLabel, setErrorLabel] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const arrayFields = [
    { name: formatMsg("name"), id: "firstName", type: "text" },
    { name: formatMsg("lastName"), id: "lastName", type: "text" },
    { name: formatMsg("uid"), id: "uid", type: "number", isDisabled: checked },
    { name: formatMsg("mail"), id: "mail", type: "mail" },
    { name: formatMsg("code"), id: "code", type: "number" },
  ];
  const onSubmit = (data) => {
    data.uid = checked ? "0000000" : data.uid;
    const petition = data.event == '3' ? 'database_br.php' : 'database.php';
    if (availableCodes.includes(data.code)) {
      const bodyToSend = {
        boleto: data.code,
        nombre: data.firstName,
        apellido: data.lastName,
        uid: data.uid,
        evento: data.event,
        email: data.mail,
        telefono: data["phone-input"],
      };
      const bodyJson = JSON.stringify(bodyToSend);
      fetch(`${Constants.ROUTE_API}/${petition}`, {
        method: "POST",
        body: bodyJson,
      })
        .then((response) => {
          if (response.status === 503) {
            setInvalidCode(true);
          } else if (response.status === 201) {
            setShowModal(!showModal);
            resetField("code");
            resetField("firstName");
            resetField("lastName");
            resetField("uid");
            resetField("event");
            resetField("mail");
            resetField("phone-input");
            response.json();
          } else {
            setErrorLabel(true);
          }
        })
        .then((data) => {
        })
        .catch((e) => {
          throw new Error(e);
        });
    } else {
      setInvalidCode(true);
    }
  };
  return (
    <div>
      <ModalRegister />
      {showModal ? <ModalSuccess modalOpen={showModal} /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(errors).length !== 0 ? (
          <p
            style={{ paddingLeft: isLargeSize ? 80 : 30 }}
            className="error-text"
          >
            {formatMsg("error")}
          </p>
        ) : null}
        {invalidCode ? (
          <p
            style={{ paddingLeft: isLargeSize ? 80 : 30 }}
            className="error-text"
          >
            {formatMsg("errorNoCode")}
          </p>
        ) : null}
        {errorLabel ? (
          <p
            style={{ paddingLeft: isLargeSize ? 80 : 30 }}
            className="error-text"
          >
            {formatMsg("errorGral")}
          </p>
        ) : null}
        <div
          onClick={() => setChecked(!checked)}
          style={{ cursor: "pointer" }}
          onKeyDown={() => setChecked(!checked)}
        >
          <label
            className="no-uid"
            style={{ paddingLeft: isLargeSize ? 80 : 30 }}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            />
            {formatMsg("noUID")}
          </label>
        </div>

        <Input
          arrayFields={arrayFields}
          noUID={checked}
          errors={errors}
          register={register}
        />
        <PhoneNbrInput control={control} />
        <RadioButtonGroup errors={errors} register={register} />
        <input
          className="submit-button"
          type="submit"
          value="Confirmar Registro"
        />
      </form>
    </div>
  );
};

export default Form;
