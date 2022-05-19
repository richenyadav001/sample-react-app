import {
  LOGIN_FAILIURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actionType/actionTypes";

const initialstate = {
  isAuthenticated: false,
  message: "",
  error: false,
  user: {},
};

const loginReducer = (state = initialstate, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const newState = {
        ...state,
        isAuthenticated: true,
        message: "Success",
        error: false,
        user: action.payload,
      };
      return newState;
    case LOGIN_FAILIURE:
      const failState = {
        ...state,
        isAuthenticated: false,
        message: action.payload,
        error: true,
        user: {},
      };
      return failState;
    case LOGOUT:
      const logoutState = {
        ...state,
        isAuthenticated: false,
        message: "User logout",
        error: true,
        user: {},
      };
      return logoutState;
    default:
      return state;
  }
};

export default loginReducer;
