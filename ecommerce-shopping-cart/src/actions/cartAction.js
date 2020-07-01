import { ADD_TO_CART, REMOVE_FROM_CART } from "./Types";

export const addToCart = (items, product) => (dispatch) => {
  const cartItems = items.slice();

  console.log(
    "HandleAddTocart funksjonen svarer på knappen" + JSON.stringify(cartItems)
  );

  let productAlreadyIncart = false;
  console.log("Lengden på cartItems " + cartItems.length);
  if (cartItems.length !== 0) {
    console.log("Denne iffen blir oppfylt   (cartItems.lengt !== 0");
    cartItems.forEach((item) => {
      if (item.id === product.id) {
        console.log("Denne iffen blir oppfylt  (item.id === product.id");
        productAlreadyIncart = true;
        item.count++;
      } else {
        if (!productAlreadyIncart) {
          console.log("Denne iffen blir oppfylt  !productAlreadyIncar");
          if (!cartItems.some(({ value, id }) => id === product.id))
            cartItems.push({ ...product, count: 1 });
        }
      }
    });
  } else if (cartItems.length === 0) {
    console.log("Denne iffen blir oppfylt   cartItems.lengt === 0");
    cartItems.push({ ...product, count: 1 });
  }

  localStorage.setItem("CartItems", JSON.stringify(cartItems));
  return dispatch({
    type: ADD_TO_CART,
    payload: { cartItems: cartItems },
  });
};

export const removeFromCart = (items, product) => (dispatch) => {
  console.log("RemoveFrom cart " + product);
  const cartItems = items.slice().filter((elm) => elm.id !== product.id);
  console.log(items.length + "  " + cartItems.length);
  localStorage.setItem("CartItems", cartItems);
  return dispatch({
    type: REMOVE_FROM_CART,
    payload: { cartItems },
  });
};
