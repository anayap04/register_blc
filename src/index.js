import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { IntlProvider } from "react-intl";
import Spanish from "./lang/es.json";
import Portuguese from "./lang/pt.json";
const locale = navigator.language;
let lang;
if (locale === "pt") {
  lang = Portuguese;
} else {
  lang = Spanish;
}

ReactDOM.render(
  <React.StrictMode>
      <IntlProvider locale={locale} messages={lang}>
        <App />
      </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
