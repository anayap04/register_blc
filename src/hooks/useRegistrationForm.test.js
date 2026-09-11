import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRegistrationForm } from "./useRegistrationForm";
import { renderWithIntl } from "../testUtils";

// Mirrors the `required` registration real field components (Input.js,
// PhoneNbrInput.js) apply -- this hook doesn't own field-level validation
// rules itself, so the harness has to declare the same contract to
// exercise the hook's reaction to react-hook-form's validation result.
const Harness = () => {
  const {
    register,
    onSubmit,
    invalidCode,
    errorLabel,
    showSuccessModal,
    formState: { errors },
  } = useRegistrationForm({ fixedEventId: 9 });

  return (
    <form onSubmit={onSubmit}>
      <input placeholder="code" {...register("code", { required: true })} />
      <input placeholder="firstName" {...register("firstName", { required: true })} />
      <input placeholder="lastName" {...register("lastName", { required: true })} />
      <input placeholder="uid" {...register("uid", { required: true })} />
      <input placeholder="mail" {...register("mail", { required: true })} />
      <input placeholder="phone" {...register("phone-input", { required: true })} />
      {Object.keys(errors).length > 0 && <p role="alert">missing fields</p>}
      {invalidCode && <p role="alert">invalid code</p>}
      {errorLabel && <p role="alert">general error</p>}
      {showSuccessModal && <p>registration successful</p>}
      <button type="submit">submit</button>
    </form>
  );
};

const fillValidForm = async (user) => {
  await user.type(screen.getByPlaceholderText("code"), "123");
  await user.type(screen.getByPlaceholderText("firstName"), "Ana");
  await user.type(screen.getByPlaceholderText("lastName"), "Perez");
  await user.type(screen.getByPlaceholderText("uid"), "1234567");
  await user.type(screen.getByPlaceholderText("mail"), "ana@example.com");
  await user.type(screen.getByPlaceholderText("phone"), "+525512345678");
};

beforeEach(() => {
  global.fetch = jest.fn();
});

test("shows a validation error and never calls the API when required fields are missing", async () => {
  const user = userEvent.setup();
  renderWithIntl(<Harness />);

  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(await screen.findByText("missing fields")).toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();
});

test("shows the invalid-code message when the API responds 503", async () => {
  global.fetch.mockResolvedValue({ status: 503 });
  const user = userEvent.setup();
  renderWithIntl(<Harness />);

  await fillValidForm(user);
  await user.click(screen.getByRole("button", { name: /submit/i }));

  await waitFor(() => expect(screen.getByText("invalid code")).toBeInTheDocument());
  expect(screen.queryByText("registration successful")).not.toBeInTheDocument();
});

test("shows the success message when the API responds 201", async () => {
  global.fetch.mockResolvedValue({ status: 201 });
  const user = userEvent.setup();
  renderWithIntl(<Harness />);

  await fillValidForm(user);
  await user.click(screen.getByRole("button", { name: /submit/i }));

  await waitFor(() =>
    expect(screen.getByText("registration successful")).toBeInTheDocument()
  );
  expect(screen.queryByText("invalid code")).not.toBeInTheDocument();
});
