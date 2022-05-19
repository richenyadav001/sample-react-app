import { screen } from "@testing-library/react";
import React from "react";
import Profile from "../../dashboard/profile";
import { render } from "../utils/test.utils";

describe("Profile", () => {
  test("renders Profile Image", () => {
    render(<Profile />);
    const imageElement = screen.getAllByAltText(/Profile Image/i);
    expect(imageElement[0]).toBeInTheDocument();
  });

  test("renders Document Image", () => {
    render(<Profile />);
    const imageElement = screen.getAllByAltText(/Document Image/i);
    expect(imageElement[0]).toBeInTheDocument();
  });
});
