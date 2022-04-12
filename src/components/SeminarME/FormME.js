import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useScreenClass } from "react-grid-system";
import "./FormME.css";
import Input from "../form-components/Input";
import PhoneNbrInput from "../form-components/PhoneNbrInput";
import { formatMsg } from "../../utils/formatMsg";
import { availableCodesME } from "../../utils/availableCodesME";
import Constants from "../../utils/constants";
import ModalSuccess from "../form-components/ModalSuccess";

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
  const [invalidCode, setInvalidCode] = useState(false);
  const [errorLabel, setErrorLabel] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let resultsRef = useRef();
  const arrayFields = [
    { name: formatMsg("name"), id: "firstName", type: "text" },
    { name: formatMsg("lastName"), id: "lastName", type: "text" },
    { name: formatMsg("uid"), id: "uid", type: "number", isDisabled: checked },
    { name: formatMsg("mail"), id: "mail", type: "mail" },
    { name: formatMsg("code"), id: "code", type: "number" },
  ];

  const onSubmit = (data) => {
    data.uid = checked ? "0000000" : data.uid;
    if (availableCodesME.includes(data.code)) {
      const bodyToSend = {
        boleto: data.code,
        nombre: data.firstName,
        apellido: data.lastName,
        uid: data.uid,
        evento: 9,
        email: data.mail,
        telefono: data["phone-input"],
      };
      const bodyJson = JSON.stringify(bodyToSend);
      fetch(`${Constants.ROUTE_API}/database.php`, {
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
  }

  useEffect(
    () => {
      if (resultsRef.current) {
        window.scrollTo({
          behavior: "smooth",
          top: resultsRef.current.offsetTop
        });
      }
    },
    [invalidCode, errorLabel]
  );
  return (
    <div>
      {showModal ? <ModalSuccess /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(errors).length !== 0 ? (
          <p
            style={{ paddingLeft: isLargeSize ? 80 : 30 }}
            className="error-text-me"
          >
            {formatMsg("error")}
          </p>
        ) : null}
        {invalidCode ? (
          <p
            style={{ paddingLeft: isLargeSize ? 80 : 30 }}
            className="error-text-me"
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
          onKeyDown={() => setChecked(!checked)}
          style={{ cursor: "pointer" }}
        >
          <label
            className="no-uid-me"
            style={{ paddingLeft: isLargeSize ? 80 : 30 }}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            />
            {formatMsg("noUIDME")}
          </label>
        </div>

        <Input
          arrayFields={arrayFields}
          noUID={checked}
          errors={errors}
          register={register}
          isME
        />
        <PhoneNbrInput control={control} isME />
        <input
          className="submit-button-me"
          type="submit"
          value="Confirmar Registro"
        />
      </form>
    </div>
  );
};

export default Form;
