// login.test.js
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Login from "../../login/login.js";
import { render } from "../utils/test.utils";

describe("Login", () => {
  it("should show email validation", async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Login isLogin={true} />
    );
    const input = getByPlaceholderText("Email");
    fireEvent.blur(input);
    await waitFor(() => {
      expect(getByTestId("inputFIeld")).not.toBe(null);
      expect(getByTestId("inputFIeld")).toHaveTextContent("Required");
    });
  });

  it("should show password validation", async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Login isLogin={true} />
    );
    const input = getByPlaceholderText("Password");
    fireEvent.blur(input);
    await waitFor(() => {
      expect(getByTestId("inputPassField")).not.toBe(null);
      expect(getByTestId("inputPassField")).toHaveTextContent("Required");
    });
  });
});
