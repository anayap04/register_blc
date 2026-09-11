import { FormattedMessage, useIntl } from "react-intl";
export const formatMsg = (id) => {
  return (
    <FormattedMessage
      id={id}
      values={{
        fileName: "src/App.js",
        code: (id) => <strong>{id}</strong>,
      }}
    />
  );
};

// Some ARIA attributes (e.g. a modal's contentLabel) need a plain localized
// string rather than the JSX FormattedMessage returns from formatMsg above.
export const useFormatMsgText = (id) => {
  const intl = useIntl();
  return intl.formatMessage({ id });
};