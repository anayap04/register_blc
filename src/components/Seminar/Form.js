import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useScreenClass } from "react-grid-system";
import "./Form.css";
import RadioButtonGroup from "../form-components/RadioButtonGroup";
import Input from "../form-components/Input";
import PhoneNbrInput from "../form-components/PhoneNbrInput";
import { formatMsg } from "../utils/formatMsg";
import ModalRegister from "../ModalRegister";

const Form = () => {
  const screenClass = useScreenClass();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const isLargeSize = ["lg", "xl", "xxl"].includes(screenClass);
  const [checked, setChecked] = useState(false);

  const arrayFields = [
    { name: formatMsg("name"), id: "firstName", type: "text" },
    { name: formatMsg("lastName"), id: "lastName", type: "text" },
    { name: formatMsg("uid"), id: "uid", type: "number", isDisabled: checked },
    { name: formatMsg("mail"), id: "mail", type: "mail" },
    { name: formatMsg("code"), id: "code", type: "number" },
  ];
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <ModalRegister />
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(errors).length !== 0 ? (
          <p
            style={{ paddingLeft: isLargeSize ? 80 : 30 }}
            className="error-text"
          >
            {formatMsg("error")}
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
