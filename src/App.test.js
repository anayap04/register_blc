import { screen } from "@testing-library/react";
import App from "./App";
import { renderWithIntl } from "./testUtils";

const goToPath = (path) => window.history.pushState({}, "", path);

describe("App routing", () => {
  afterEach(() => {
    goToPath("/");
  });

  test("renders the default registration form at /", () => {
    goToPath("/");
    renderWithIntl(<App />);

    expect(
      screen.getByText("Selecciona el evento al que desea atender.")
    ).toBeInTheDocument();
  });

  test("renders the ME registration form at /ME/", () => {
    goToPath("/ME/");
    renderWithIntl(<App />);

    expect(screen.getByText("Formulario de Pre-registro")).toBeInTheDocument();
  });
});
