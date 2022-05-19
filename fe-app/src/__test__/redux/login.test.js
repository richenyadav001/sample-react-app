const login = require("../../redux/actions/login");
const {
  actualLoginSuccess,
  expectedLoginSuccess,
} = require("../mocks/constantsMocks");

describe("Test login actions", () => {
  test("logout action", () => {
    let result = login.logout();
    expect(result).toStrictEqual({ type: "LOGOUT" });
  });
  test("loginSuccess action", () => {
    let result = login.loginSuccess(actualLoginSuccess);
    expect(result).toStrictEqual({
      type: "LOGIN_SUCCESS",
      payload: expectedLoginSuccess,
    });
  });
  test("loginFailiure action", () => {
    let result = login.loginFailiure({ message: "Could not be laaded" });
    expect(result).toStrictEqual({
      type: "LOGIN_FAILIURE",
      payload: { message: "Could not be laaded" },
    });
  });
});
