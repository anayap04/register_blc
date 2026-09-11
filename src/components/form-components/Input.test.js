import { screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { formatMsg } from "../../utils/formatMsg";
import { renderWithIntl } from "../../testUtils";

const fields = [{ name: formatMsg("name"), id: "firstName", type: "text" }];

const Wrapper = ({ errors }) => {
  const { register } = useForm();
  return <Input arrayFields={fields} register={register} errors={errors} />;
};

test("associates the label and, on error, the error message via aria-describedby", () => {
  renderWithIntl(<Wrapper errors={{ firstName: { type: "required" } }} />);

  const input = screen.getByLabelText("Nombre(s)");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input).toHaveAccessibleDescription("Falta este campo");
});

test("has no error message when the field is valid", () => {
  renderWithIntl(<Wrapper errors={{}} />);

  const input = screen.getByLabelText("Nombre(s)");
  expect(input).toHaveAttribute("aria-invalid", "false");
  expect(screen.queryByText("Falta este campo")).not.toBeInTheDocument();
});
