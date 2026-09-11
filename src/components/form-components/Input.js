import { formatMsg } from "../../utils/formatMsg";
import { useIsLargeScreen } from "../../hooks/useIsLargeScreen";
import "./styles.css";

const InputField = ({ field, register, errors, isME }) => {
  const hasError = Boolean(errors[field.id]);
  const borderStyle = isME
    ? { borderColor: hasError ? "#700000" : "#FBA2A7" }
    : { borderColor: hasError ? "#FDAAAA" : "#F9F5F1" };
  const errorId = `${field.id}-error`;

  return (
    <div>
      <label htmlFor={field.id}>{field.name}</label>
      <input
        id={field.id}
        className={isME ? "text-input-me" : "text-input"}
        type={field.type}
        style={borderStyle}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        {...register(field.id, { required: !field.isDisabled })}
        disabled={field.isDisabled}
      />
      {hasError && (
        <p id={errorId} className={isME ? "error-input-me" : "error-input"}>
          {formatMsg("errorMsgInput")}
        </p>
      )}
    </div>
  );
};

const Input = ({ register, errors, arrayFields, isME }) => {
  const isLargeSize = useIsLargeScreen();

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
      {arrayFields.map((field) => (
        <InputField
          key={field.id}
          field={field}
          register={register}
          errors={errors}
          isME={isME}
        />
      ))}
    </div>
  );
};

export default Input;
