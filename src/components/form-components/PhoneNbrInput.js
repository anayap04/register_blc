import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { Controller } from "react-hook-form";
import { formatMsg } from "../../utils/formatMsg";
import { useIsLargeScreen } from "../../hooks/useIsLargeScreen";
import "react-phone-number-input/style.css";
import "./styles.css";

const PhoneNbrInput = (props) => {
  const { control, isME } = props;
  const isLargeSize = useIsLargeScreen();
  return (
    <div
      style={{ paddingLeft: isLargeSize ? 80 : 30 }}
      className={isME ? "phone-container-me" : "phone-container"}
    >
      <label htmlFor="phone-input">{formatMsg("wa")}</label>
      <Controller
        name="phone-input"
        control={control}
        rules={{
          validate: (value) => isValidPhoneNumber(value),
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            value={value}
            onChange={onChange}
            defaultCountry="MX"
            id="phone-input"
          />
        )}
      />
    </div>
  );
};

export default PhoneNbrInput;
