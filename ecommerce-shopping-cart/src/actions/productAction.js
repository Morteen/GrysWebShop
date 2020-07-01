import {
  FETCH_PPRODUCT,
  FILTER_PRODUCT_BY_SIZE,
  ORDER_PRODUCT_BY_PRICE,
} from "./Types";

export const fetchProducts = () => (dispatch) => {
  fetch("http://localhost:8000/products")
    .then((res) => res.json())
    .then((data) => {
      console.log(JSON.stringify("Data fra fetchProducts action " + data));
      return dispatch({ type: FETCH_PPRODUCT, payload: data });
    });
};

export const filterProducts = (products, size) => (dispatch) => {
  console.log(
    "Log av filtered products " +
      size +
      "    " +
      products.filter((a) => a.availableSizes.indexOf(size) >= 0)
  );
  return dispatch({
    type: FILTER_PRODUCT_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((a) => a.availableSizes.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (items, sort) => (dispatch) => {
  const products = items.slice();
  if (sort !== "") {
    if (sort === "lowest") {
      products.sort(function (a, b) {
        return a.price - b.price;
      });
    } else if (sort === "Highest") {
      products.sort(function (a, b) {
        return b.price - a.price;
      });
    }
  } else {
    products.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  return dispatch({
    type: ORDER_PRODUCT_BY_PRICE,
    payload: {
      sort: sort,
      items: products,
    },
  });
};
