import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useScreenClass } from "react-grid-system";
import "./FormME.css";
import Input from "../form-components/Input";
import PhoneNbrInput from "../form-components/PhoneNbrInput";
import { formatMsg } from "../utils/formatMsg";

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
  const onSubmit = (data) => {
    data.uid = checked ? "N/A" : data.uid;
    return console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(errors).length !== 0 ? (
          <p
            style={{ paddingLeft: isLargeSize ? 80 : 30 }}
            className="error-text-me"
          >
            {formatMsg("error")}
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
