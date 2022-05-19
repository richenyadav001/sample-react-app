const login = require("../../redux/actions/login");
const loginReducer = require("../../redux/reducers/login");

const {
  actualLoginSuccess,
  expectedLoginSuccess,
} = require("../mocks/constantsMocks");

const initialstate = {
  isAuthenticated: false,
  message: "",
  error: false,
  user: {},
};

const action = {
  type: "LOGIN_SUCCESS",
  payload: expectedLoginSuccess,
};

describe("Test login actions", () => {
  test("login reducer", () => {
    let result = loginReducer(initialstate, action);
    expect(result).toBe({
      isAuthenticated: true,
      message: "Success",
      error: false,
      user: expectedLoginSuccess,
    });
  });

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
