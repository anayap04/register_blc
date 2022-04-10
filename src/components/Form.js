import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useScreenClass } from "react-grid-system";
import "./Form.css";
import RadioButtonGroup from "./form-components/RadioButtonGroup";
import Input from "./form-components/Input";
import { formatMsg } from "./utils/formatMsg";
import PhoneNbrInput from "./form-components/PhoneNbrInput";

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
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p style={{ paddingLeft: isLargeSize ? 80 : 30 }} className="error-text">
        {formatMsg("error")}
      </p>
      <div onClick={() => setChecked(!checked)} style={{ cursor: "pointer" }}>
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

      <Input noUID={checked} errors={errors} register={register} />
      <PhoneNbrInput
        errors={errors}
        control={control}
        register={register}
        controler={Controller}
      />
      <RadioButtonGroup errors={errors} register={register} />
      <input
        className="submit-button"
        type="submit"
        value="Confirmar Registro"
      />
    </form>
  );
};

export default Form;
