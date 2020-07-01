import { combineReducers } from "redux";
import productreducer from "./productReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  products: productreducer,
  cart: cartReducer,
});
