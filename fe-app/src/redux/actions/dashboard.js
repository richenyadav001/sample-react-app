import Api from "../../api/axios";
import {
    GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS
} from "../actionType/actionTypes";
const AxiosApi = new Api();

export const getProduct = (data = {}) => {
  console.log("Get Product called");
  return (dispatch) => {
    AxiosApi.request("/products", "GET", data).then((data) => {
      console.log(data);
      if (typeof data === "object") {
        dispatch(getProductSuccess(data[0].items));
      } else {
        // add data to global redux store
        dispatch(getProductError(data));
      }
    });
  };
};

export const getProductSuccess = (data) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: data,
  };
};

export const getProductError = (data) => {
  return {
    type: GET_PRODUCTS_ERROR,
    payload: data,
  };
};

function helloWord(item) {
    return 'Hello' + item;
}

helloWord('item');