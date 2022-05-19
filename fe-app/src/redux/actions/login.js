import Api from "../../api/axios";
import {
  LOGIN_FAILIURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actionType/actionTypes";
const AxiosApi = new Api();

export const doLogin = (data) => {
  return (dispatch) => {
    AxiosApi.request("/login", "POST", JSON.stringify(data)).then((data) => {
      console.log(data);
      if (typeof data === "object") {
        // add data to global redux store
        dispatch(loginSuccess(data));
      } else {
        dispatch(loginFailiure(data));
      }
    });
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailiure = (data) => {
  return {
    type: LOGIN_FAILIURE,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
