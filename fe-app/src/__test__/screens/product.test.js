import { screen } from "@testing-library/react";
import React from "react";
import Product from "../../dashboard/products";
import { render } from "../utils/test.utils";

describe("Product", () => {
  it("should not render list of products before button click", () => {
    render(<Product />);
    const list = screen.queryByTestId("card-container");
    //   const { getAllByRole } = within(list);
    //   const items = getAllByRole("listitem");
    expect(list).toBe(null);
  });
});
