import React from "react";
import Dashboard from "../../dashboard/dashboard";
import { render, screen } from "../utils/test.utils";

describe("Dashboard", () => {
  render(<Dashboard />);
  test("Clicks button to get products", () => {
    const handleClick = jest.fn();
    const buttonElement = screen.getByText(/Bank products/i);
    expect(buttonElement).not.toBeDisabled();
  });
});
