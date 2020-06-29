import React, { Component } from "react";
import "./App.css";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Basket from "./components/Basket";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      cartItems: [],
    };
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
  }

  componentWillMount() {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          products: data,
          filteredProducts: data,
        })
      );
    /*if (localStorage.getItem("CartItems")) {
      console.log(" Hurra localstorage er opprettet");
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("CartItems")),
      });
    }*/
  }

  handleChangeSort(e) {
    this.setState({ sort: e.target.value });
    this.listProduct();
  }
  handleChangeSize(e) {
    this.setState({ size: e.target.value });
    this.listProduct();
  }
  handleAddToCart(e, product) {
    console.log(
      "HandleAddTocart funksjonen svarer på knappen" + JSON.stringify(product)
    );

    const cartItems = this.state.cartItems;
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
    this.setState({ cartItems: cartItems });
  }
  listProduct() {
    this.setState((state) => {
      if (state.sort !== "") {
        state.products.sort((a, b) =>
          state.sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : a.price < b.price
            ? 1
            : -1
        );
      } else {
        state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      if (state.size !== "") {
        return {
          filteredProducts: state.products.filter(
            (a) => a.availableSizes.indexOf(state.size) >= 0
          ),
        };
      }
      return { filteredProducts: state.products };
    });
  }

  handleRemoveFromCart(e, item) {
    this.setState((state) => {
      const cartItems = state.cartItems.filter((elm) => elm.id !== item.id);
      localStorage.setItem("CartItems", cartItems);
      return { cartItems };
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Grys webshop</h1>
        <hr></hr>
        <div className="row">
          <div className="col-md-8">
            <Filter
              size={this.state.size}
              sort={this.state.sort}
              handleChangeSize={this.handleChangeSize}
              handleChangeSort={this.handleChangeSort}
              count={this.state.filteredProducts.length}
            />
            <hr></hr>

            <Products
              products={this.state.filteredProducts}
              handleAddToCart={this.handleAddToCart}
            />
          </div>
          <div className="col-md-4">
            <Basket
              cartItems={this.state.cartItems}
              handleRemoveFromCart={this.handleRemoveFromCart}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

/* handleAddToCart(e, product) {
    console.log(
      "HandleAddTocart funksjonen svarer på knappen" + JSON.stringify(product)
    );
    this.setState((state) => {
      const cartItems = state.cartItems;
      let productAlreadyIncart = false;

      if (cartItems.length < 1) {
        cartItems.push({ ...product, count: 1 });
        productAlreadyIncart = true;
        console.log(
          "Lengden på cartItems arrayen nå produktet ikke finnes der fra før " +
            cartItems.length
        );
        return { cartItems };
      } else {
        cartItems.forEach((item) => {
          if (item.id === product.id) {
            productAlreadyIncart = true;
            item.count++;
            console.log(
              "Hvis " +
                item.id +
                "  = " +
                product.id +
                "  så legge man til en " +
                cartItems.length +
                " Sjekk innhold " +
                JSON.stringify(cartItems)
            );
          }
          if (productAlreadyIncart === false) {
            console.log(
              "product før push hvis productet ikke er i kurven fra før " +
                JSON.stringify(product)
            );
            cartItems.push({ ...product, count: 1 });
          }

          localStorage.setItem("CartItems", JSON.stringify(cartItems));
          return { cartItems };
        });
      }
    });
  }*/
