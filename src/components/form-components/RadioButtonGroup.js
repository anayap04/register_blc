import React from "react";
import { useScreenClass } from "react-grid-system";
import { formatMsg } from "../utils/formatMsg";
import "./styles.css";

const RadioButtonGroup = (props) => {
  const { arrayFields, register } = props;
  const screenClass = useScreenClass();
  const isLagerSize = ["lg", "xl", "xxl"].includes(screenClass);
  const countriesDates = [
    {
      label: formatMsg("eventArg"),
      value: 0,
      id: "arg",
    },
    {
      label: formatMsg("eventMex"),
      value: 1,
      id: "mex",
    },
    {
      label: formatMsg("eventUru"),
      value: 2,
      id: "uru",
    },
    {
      label: formatMsg("eventBra"),
      value: 3,
      id: "bra",
    },
    {
      label: formatMsg("eventCol"),
      value: 4,
      id: "col",
    },
    {
      label: formatMsg("eventChi"),
      value: 5,
      id: "chi",
    },
    {
      label: formatMsg("eventPer"),
      value: 6,
      id: "per",
    },
    {
      label: formatMsg("eventEsp"),
      value: 7,
      id: "esp",
    },
  ];
  return (
    <div>
      <p
        style={{
          paddingLeft: isLagerSize ? 80 : 30,
        }}
        className="select-text"
      >
        {formatMsg("selectEvent")}
      </p>
      <div
        className="form-container"
        style={{
          display: "grid",
          gridTemplateColumns: isLagerSize
            ? "repeat(3, 1fr)"
            : "repeat(1, 1fr)",
          gridGap: isLagerSize ? 50 : 20,
          paddingLeft: isLagerSize ? 80 : 30,
        }}
      >
        {countriesDates.map((field) => (
          <div>
            <label htmlFor={field.id}>
              <input
                className="text-radio-btn" 
                key={field.id}
                {...register("event", { required: true })}
                type="radio"
                name="event"
                value={field.value}
                id={field.id}
              />
              {field.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
