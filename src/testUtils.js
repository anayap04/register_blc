import { render } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import Spanish from "./lang/es.json";

export const renderWithIntl = (ui, { locale = "es", messages = Spanish } = {}) =>
  render(<IntlProvider locale={locale} messages={messages}>{ui}</IntlProvider>);
