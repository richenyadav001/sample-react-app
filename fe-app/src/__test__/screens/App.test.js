import App from "../../App";
import { render, screen } from "../utils/test.utils";

describe("App", () => {
  render(<App />);
  test("renders company image", () => {
    const imageElement = screen.getAllByAltText(/company/i);
    const imageElements = screen.getAllByRole(/presentation/i);
    expect(imageElements.length).toBe(2);
    expect(imageElement[0]).toBeInTheDocument();
  });
});
