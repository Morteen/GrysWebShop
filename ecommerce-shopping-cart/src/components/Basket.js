import React, { Component } from "react";
import { connect } from "react-redux";
import utils from "../utils";
import { addToCart, removeFromCart } from "../actions/cartAction";

class Basket extends Component {
  render() {
    const { cartItems } = this.props;
    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          "Handlekurven er tom"
        ) : (
          <div>Du har {cartItems.length} i handlekurven</div>
        )}
        {cartItems.length > 0 && (
          <div>
            <ul id="cartList">
              {cartItems.map((item, index) => (
                <li key={index}>
                  <b>{item.title} </b>
                  {item.count} = {utils.formatCurrency(item.price * item.count)}
                  <div
                    onClick={() =>
                      this.props.removeFromCart(this.props.cartItems, item)
                    }
                  >
                    x
                  </div>
                </li>
              ))}
            </ul>
            Totalt handle beløp{" "}
            {utils.formatCurrency(
              cartItems.reduce((a, c) => a + c.price * c.count, 0)
            )}
            <br></br>
            <button
              className="btn btn-primary"
              onClick={() => alert("Checkout må implementeres")}
            >
              Kjøp
            </button>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.cart.items,
});

export default connect(mapStateToProps, { removeFromCart })(Basket);
