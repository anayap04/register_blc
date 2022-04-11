import { FormattedMessage } from "react-intl";
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