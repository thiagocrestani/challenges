import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import Login from "../../pages/Login";

describe("Tests for Login", () => {
  it("Test components login page", async () => {
    const loginText = "admin";
    const passwordText = "123456";

    const { getByTestId } = render(<Login />);
    const login = await waitForElement(() => getByTestId("login"));
    fireEvent.change(login, { target: { value: loginText } });

    const password = await waitForElement(() => getByTestId("password"));
    fireEvent.change(password, { target: { value: passwordText } });

    expect(login.value).toEqual(loginText);
    expect(password.value).toEqual(passwordText);

    const btn = await waitForElement(() => getByTestId("login-button"));

    fireEvent.click(btn);
  });
});
