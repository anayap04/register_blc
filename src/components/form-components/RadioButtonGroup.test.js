import { screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import RadioButtonGroup from "./RadioButtonGroup";
import { renderWithIntl } from "../../testUtils";

const Wrapper = () => {
  const { register } = useForm();
  return <RadioButtonGroup register={register} />;
};

test("groups the event options under a fieldset/legend with 8 accessible radios", () => {
  renderWithIntl(<Wrapper />);

  expect(
    screen.getByRole("group", { name: /selecciona el evento/i })
  ).toBeInTheDocument();

  const radios = screen.getAllByRole("radio");
  expect(radios).toHaveLength(8);
  radios.forEach((radio) => expect(radio).toHaveAccessibleName());
});
