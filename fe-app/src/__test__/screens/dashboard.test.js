import { screen } from "@testing-library/react";
import React from "react";
import Dashboard from "../../dashboard/dashboard";
import { render } from "../utils/test.utils";

test("Clicks button to get products", () => {
  render(<Dashboard />);
  const handleClick = jest.fn();
  const buttonElement = screen.getByText(/Bank products/i);
  expect(buttonElement).not.toBeDisabled();
});
