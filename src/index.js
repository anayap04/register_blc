import React from "react";
import { createRoot } from "react-dom/client";
import Modal from "react-modal";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { IntlProvider } from "react-intl";
import Spanish from "./lang/es.json";
import Portuguese from "./lang/pt.json";

const locale = navigator.language;
const lang = locale === "pt" ? Portuguese : Spanish;

document.documentElement.lang = locale === "pt" ? "pt" : "es";
Modal.setAppElement("#root");

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IntlProvider locale={locale} messages={lang}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
