import { formatMsg } from "../../utils/formatMsg";
import { useIsLargeScreen } from "../../hooks/useIsLargeScreen";
import "./styles.css";

const EVENT_OPTIONS = [
  { labelKey: "eventArg", value: 0, id: "arg" },
  { labelKey: "eventMex", value: 1, id: "mex" },
  { labelKey: "eventUru", value: 2, id: "uru" },
  { labelKey: "eventBra", value: 3, id: "bra" },
  { labelKey: "eventCol", value: 4, id: "col" },
  { labelKey: "eventChi", value: 5, id: "chi" },
  { labelKey: "eventPer", value: 6, id: "per" },
  { labelKey: "eventEsp", value: 7, id: "esp" },
];

const RadioButtonGroup = ({ register }) => {
  const isLargeSize = useIsLargeScreen();

  return (
    <fieldset className="event-fieldset">
      <legend style={{ paddingLeft: isLargeSize ? 80 : 30 }} className="select-text">
        {formatMsg("selectEvent")}
      </legend>
      <div
        className="form-container"
        style={{
          display: "grid",
          gridTemplateColumns: isLargeSize ? "repeat(3, 1fr)" : "repeat(1, 1fr)",
          gridGap: isLargeSize ? 50 : 20,
          paddingLeft: isLargeSize ? 80 : 30,
        }}
      >
        {EVENT_OPTIONS.map((option) => (
          <div key={option.id}>
            <label htmlFor={option.id}>
              <input
                className="text-radio-btn"
                {...register("event", { required: true })}
                type="radio"
                value={option.value}
                id={option.id}
              />
              {formatMsg(option.labelKey)}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioButtonGroup;
