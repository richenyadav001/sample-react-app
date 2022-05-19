import { render, screen } from "@testing-library/react";
import Thumb from "../../register/thumb";

const value = {
  lastModified: "",
  name: "thumb",
  type: "",
  webkitRelativePath: "",
};

describe("Thumb", () => {
  test('Thumb must and alt = "Thumb"', () => {
    render(<Thumb file={value} />);
    const thumb = screen.getByRole("img");
    expect(thumb).toHaveAttribute("alt", "thumb");
    expect(thumb).toHaveAttribute("height", "200");
    expect(thumb).toHaveAttribute("width", "200");
  });
});
