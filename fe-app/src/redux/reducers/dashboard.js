import {
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
} from "../actionType/actionTypes";

const initialstate = [];

const dashboardReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      const stepOneState = [...action.payload];
      return stepOneState;
    case GET_PRODUCTS_ERROR:
      const stepTwoState = {
        ...state,
        ...action.payload,
      };
      return stepTwoState;
    default:
      return state;
  }
};

export default dashboardReducer;
