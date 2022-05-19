import { fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import Register from "../../register/register";
import { render } from "../utils/test.utils";

describe("Register", () => {
  it("should show name validation", async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Register isLogin={true} />
    );
    const input = getByPlaceholderText("Name");
    fireEvent.blur(input);
    await waitFor(() => {
      expect(getByTestId("inputNameField")).not.toBe(null);
      expect(getByTestId("inputNameField")).toHaveTextContent("Required");
    });
  });

  it("should show Address validation", async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Register isLogin={true} />
    );
    const input = getByPlaceholderText("Address");
    fireEvent.blur(input);
    await waitFor(() => {
      expect(getByTestId("inputAddressField")).not.toBe(null);
      expect(getByTestId("inputAddressField")).toHaveTextContent("Required");
    });
  });

  it("should show Email validation", async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Register isLogin={true} />
    );
    const input = getByPlaceholderText("Email");
    fireEvent.blur(input);
    await waitFor(() => {
      expect(getByTestId("inputEmailField")).not.toBe(null);
      expect(getByTestId("inputEmailField")).toHaveTextContent("Required");
    });
  });

  it("should show documentType validation", async () => {
    const { getByTestId } = render(<Register isLogin={true} />);
    const input = getByTestId("inputDocField");
    fireEvent.blur(input);
    await waitFor(() => {
      expect(getByTestId("inputDocField")).not.toBe(null);
      expect(getByTestId("inputDocField")).toHaveTextContent(
        "AdhaarPan CardPassport"
      );
    });
  });
});
