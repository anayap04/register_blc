import React from "react";
import { useScreenClass } from "react-grid-system";
import { formatMsg } from "../utils/formatMsg";
import "./styles.css";

const inputField = (arrayFields, register, errors) => {
  return arrayFields.map((field) => (
    <div>
      <p>{field.name}</p>
      <input
        className="text-input"
        key={field.id.toString()}
        type={field.type}
        style={{ borderColor: errors[field.id] ? "#FDAAAA" : "#F9F5F1" }}
        {...register(field.id, { required: true })}
        disabled={field.isDisabled}
      />
      {errors[field.id] && (
        <p className="error-input">{formatMsg("errorMsgInput")}</p>
      )}
    </div>
  ));
};

const Input = (props) => {
  const { register, noUID, errors } = props;
  const screenClass = useScreenClass();
  const isLargeSize = ["lg", "xl", "xxl"].includes(screenClass);
  const arrayFields = [
    { name: formatMsg("name"), id: "firstName", type: "text" },
    { name: formatMsg("lastName"), id: "lastName", type: "text" },
    { name: formatMsg("uid"), id: "uid", type: "number", isDisabled: noUID },
    { name: formatMsg("mail"), id: "mail", type: "mail" },
    { name: formatMsg("code"), id: "code", type: "number" },
  ];
  return (
    <div
      className="form-container"
      style={{
        display: "grid",
        gridTemplateColumns: isLargeSize ? "repeat(3, 1fr)" : "repeat(1, 1fr)",
        gridGap: isLargeSize ? 50 : 20,
        paddingLeft: isLargeSize ? 80 : 30,
      }}
    >
      {inputField(arrayFields, register, errors)}
    </div>
  );
};

export default Input;
