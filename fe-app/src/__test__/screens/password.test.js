import "@testing-library/jest-dom/extend-expect";
import { fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Password from "../../register/password";
import { render } from "../utils/test.utils";

describe("Password", () => {
  it("should show password validation", async () => {
    const { getByPlaceholderText, getByTestId } = render(<Password />);
    const input = getByPlaceholderText("Password");
    fireEvent.blur(input);
    await waitFor(() => {
      expect(getByTestId("inputPasswordField")).not.toBe(null);
      expect(getByTestId("inputPasswordField")).toHaveTextContent("Required");
    });
  });

  it("should show confirm password validation", async () => {
    const { getByPlaceholderText, getByTestId } = render(<Password />);
    const input = getByPlaceholderText("Password Confirmation");
    fireEvent.blur(input);
    await waitFor(() => {
      expect(getByTestId("inputCPasswordField")).not.toBe(null);
      expect(getByTestId("inputCPasswordField")).toHaveTextContent("");
    });
  });
});
