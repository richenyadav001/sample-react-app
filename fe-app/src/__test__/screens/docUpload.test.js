import "@testing-library/jest-dom/extend-expect";
import { fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import DocUpload from "../../register/docUpload";
import { render } from "../utils/test.utils";

describe("DocUpload", () => {
  it("should show photo validation", async () => {
    const { getByTestId, getByLabelText } = render(<DocUpload />);
    const input = getByLabelText("Photo Upload");
    fireEvent.blur(input);
    await waitFor(() => {
      expect(getByTestId("inputPhotoField")).not.toBe(null);
      expect(getByTestId("inputPhotoField")).toHaveTextContent("");
    });
  });

  it("should show doc validation", async () => {
    const { getByTestId, getByLabelText } = render(<DocUpload />);
    const input = getByLabelText("Document Upload");
    fireEvent.blur(input);
    await waitFor(() => {
      expect(getByTestId("inputDocumentField")).not.toBe(null);
      expect(getByTestId("inputDocumentField")).toHaveTextContent("");
    });
  });
});
