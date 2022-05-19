const dashboard = require("../../redux/actions/dashboard");
const {
  actualGetProductData,
  expectedGetProductData,
} = require("../mocks/constantsMocks");

// @ponicode
describe("Test Dashboard actions", () => {
  test("getProductSuccess action", () => {
    let result = dashboard.getProductSuccess([actualGetProductData]);
    expect(result).toStrictEqual({
      type: "GET_PRODUCTS_SUCCESS",
      payload: [expectedGetProductData],
    });
  });
  test("getProductError action", () => {
    let result = dashboard.getProductError({ message: "Could not be laaded" });
    expect(result).toStrictEqual({
      type: "GET_PRODUCTS_ERROR",
      payload: { message: "Could not be laaded" },
    });
  });
});
