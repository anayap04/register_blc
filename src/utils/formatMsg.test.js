import { screen } from "@testing-library/react";
import { formatMsg } from "./formatMsg";
import { renderWithIntl } from "../testUtils";

test("formatMsg renders the localized message for a given id", () => {
  renderWithIntl(<div>{formatMsg("submit")}</div>);
  expect(screen.getByText("Confirmar Registro")).toBeInTheDocument();
});
