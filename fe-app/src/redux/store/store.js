import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/index"; // the value from combineReducers

const initialState = {};
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

store.subscribe(() => {
  // When state will be updated(in our case, when items will be fetched),
  // we will update local component state and force component to rerender
  // with new data.
  console.log(store.getState());
});

export default store;
