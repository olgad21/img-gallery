import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Form from "../routes/form/form.component";
import { users } from "../constants";

const fillForm = () => {
  const nameInput = screen.getByLabelText("Name") as HTMLInputElement;
  expect(nameInput).toBeDefined();
  fireEvent.change(nameInput, { target: { value: users[0].name } });

  const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
  expect(emailInput).toBeDefined();
  fireEvent.change(emailInput, { target: { value: users[0].email } });

  const birthdayInput = screen.getByLabelText("Birthday") as HTMLInputElement;
  expect(birthdayInput).toBeDefined();
  fireEvent.change(birthdayInput, {
    target: { value: users[0].birthday.toString() },
  });

  const countryInput = screen.getByLabelText("Country") as HTMLInputElement;
  expect(countryInput).toBeDefined();
  countryInput.value = users[0].country;

  const privacyInput = screen.getByLabelText(
    "Agree to Privacy Rules"
  ) as HTMLInputElement;
  expect(privacyInput).toBeDefined();
  privacyInput.checked = users[0].agreedToPrivacyRules;
};

describe("Form component", () => {
  test("shows form", () => {
    render(<Form />);
    const form = screen.getByTestId("form");
    expect(form).toBeDefined();
  });

  test("inputs are rendered and their values are submitted to a card", () => {
    render(<Form />);
    const form = screen.getByTestId("form");
    fillForm();
    act(() => {
      fireEvent.submit(form);
    });

    setTimeout(() => {
      const nameInCard = screen.getAllByTestId("cardName");
      expect(nameInCard[0].textContent).toEqual(users[0].name);

      const privacyInCard = screen.getAllByTestId("cardPrivacy");
      expect(privacyInCard[0].textContent).toEqual(
        `Consent to Privacy Rules: ${users[0].agreedToPrivacyRules.toString()}`
      );
    }, 2000);
  });

  test("validation works", () => {
    render(<Form />);
    const form = screen.getByTestId("form");
    act(() => {
      fireEvent.submit(form);
    });

    setTimeout(() => {
      const errorMessage = screen.getByTestId("error-message");
      expect(errorMessage).toBeDefined();
    }, 2000);
  });

  test("confirmation message shows on successful submit", () => {
    render(<Form />);
    const form = screen.getByTestId("form");
    fillForm();

    act(() => {
      fireEvent.submit(form);
    });

    setTimeout(() => {
      const confirmationMessage = screen.getByTestId("confirmation-message");
      expect(confirmationMessage).toBeDefined();
    }, 2000);
  });
});
