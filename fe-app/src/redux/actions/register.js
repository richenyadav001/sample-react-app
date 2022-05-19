import Api from "../../api/axios";
import {
  CREATE_USER_ERROR,
  CREATE_USER_STEP_1,
  CREATE_USER_STEP_2,
} from "../actionType/actionTypes";
import { loginSuccess } from "./login";
const AxiosApi = new Api();

export const register = (data) => {
  return {
    type: CREATE_USER_STEP_1,
    payload: data,
  };
};

export const registerUpload = (data) => {
  return {
    type: CREATE_USER_STEP_2,
    payload: data,
  };
};

export const createUser = (data) => {
  return (dispatch) => {
    AxiosApi.request("/create-user", "POST", data).then((data) => {
      console.log(data);
      if (typeof data === "object" && Object.keys(data).length > 1) {
        dispatch(createUserSuccess(data));
      } else {
        // add data to global redux store
        dispatch(createUserError(data));
      }
    });
  };
};

export const createUserSuccess = (data) => {
  return (dispatch) => {
    dispatch(loginSuccess(data));
  };
};

export const createUserError = (data) => {
  return {
    type: CREATE_USER_ERROR,
    payload: data,
  };
};
