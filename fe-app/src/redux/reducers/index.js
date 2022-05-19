import { combineReducers } from "redux";
import dashboardReducer from "./dashboard";
import loginReducer from "./login";
import registerReducer from "./register";
// Combine all reducers as root reducer
export default combineReducers({
  loginData: loginReducer,
  registerData: registerReducer,
  dashboardData: dashboardReducer,
});
