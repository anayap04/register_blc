import React from "react";
import { useScreenClass } from "react-grid-system";
import { formatMsg } from "../utils/formatMsg";
import "./styles.css";

const inputField = (arrayFields, register, errors, isME) => {
  return arrayFields.map((field) => {
    const borderStyle = isME
      ? { borderColor: errors[field.id] ? "#700000" : "#FBA2A7" }
      : { borderColor: errors[field.id] ? "#FDAAAA" : "#F9F5F1" };
    return (
      <div>
        <p>{field.name}</p>
        <input
          className={isME ? "text-input-me" : "text-input"}
          key={field.id.toString()}
          type={field.type}
          style={borderStyle}
          {...register(field.id, { required: !field.isDisabled })}
          disabled={field.isDisabled}
        />
        {errors[field.id] && (
          <p className={isME ? "error-input-me" : "error-input"}>
            {formatMsg("errorMsgInput")}
          </p>
        )}
      </div>
    );
  });
};

const Input = (props) => {
  const { register, errors, arrayFields, isME } = props;
  const screenClass = useScreenClass();
  const isLargeSize = ["lg", "xl", "xxl"].includes(screenClass);

  return (
    <div
      className={isME ? "form-container-me" : "form-container"}
      style={{
        display: "grid",
        gridTemplateColumns: isLargeSize ? "repeat(3, 1fr)" : "repeat(1, 1fr)",
        gridGap: isLargeSize ? 50 : 20,
        paddingLeft: isLargeSize ? 80 : 30,
      }}
    >
      {inputField(arrayFields, register, errors, isME)}
    </div>
  );
};

export default Input;
