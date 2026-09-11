import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import Home from "./components/Seminar/Home";
import HomeME from "./components/SeminarME/HomeME";
import Spanish from "./lang/es.json";

const renderPage = (ui) =>
  render(
    <MemoryRouter>
      <IntlProvider locale="es" messages={Spanish}>
        {ui}
      </IntlProvider>
    </MemoryRouter>
  );

test("the default registration page has no automatically detectable a11y violations", async () => {
  const { container } = renderPage(<Home />);
  expect(await axe(container)).toHaveNoViolations();
});

test("the ME registration page has no automatically detectable a11y violations", async () => {
  const { container } = renderPage(<HomeME />);
  expect(await axe(container)).toHaveNoViolations();
});
