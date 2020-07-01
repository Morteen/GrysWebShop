import {
  FETCH_PPRODUCT,
  FILTER_PRODUCT_BY_SIZE,
  ORDER_PRODUCT_BY_PRICE,
} from "../actions/Types";

const initialState = { items: [], filteredItems: [], size: "" };

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PPRODUCT:
      console.log("Log fra product reducer" + action.payload);
      return { ...state, items: action.payload, filteredItems: action.payload };
    case FILTER_PRODUCT_BY_SIZE:
      return {
        ...state,
        filteredItems: action.payload.items,
        size: action.payload.size,
      };
    case ORDER_PRODUCT_BY_PRICE:
      return {
        ...state,
        filteredItems: action.payload.items,
        sort: action.payload.sort,
      };
    default:
      return state;
  }
}
