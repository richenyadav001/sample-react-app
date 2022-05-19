const register = require("../../redux/actions/register");
const {
  actualRegisterData,
  expectedRegisterData,
  actualRegisterUploadData,
  expectedRegisterUploadData,
} = require("../mocks/constantsMocks");

describe("Test register actions", () => {
  test("register action", () => {
    let result = register.register(actualRegisterData);
    expect(result).toStrictEqual({
      type: "CREATE_USER_STEP_1",
      payload: expectedRegisterData,
    });
  });
  test("registerUpload action", () => {
    let result = register.registerUpload(actualRegisterUploadData);
    expect(result).toStrictEqual({
      type: "CREATE_USER_STEP_2",
      payload: expectedRegisterUploadData,
    });
  });
  test("createUserError action", () => {
    let result = register.createUserError({ message: "Could not be laaded" });
    expect(result).toStrictEqual({
      type: "CREATE_USER_ERROR",
      payload: { message: "Could not be laaded" },
    });
  });
});
