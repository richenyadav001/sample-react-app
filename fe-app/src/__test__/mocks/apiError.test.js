import ApiError from "../../api/apiError";

describe("Axios Api Error", () => {
  test("it should trigeer formatted error", async () => {
    const res = new ApiError("/login", 404, "Not found");
    expect(res.statusCode).toBe(404);
  });
});
