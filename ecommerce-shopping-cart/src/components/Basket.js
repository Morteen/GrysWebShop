import React, { Component } from "react";
import utils from "../utils";

export default class Basket extends Component {
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
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <b>{item.title} </b>
                  {item.count} = {utils.formatCurrency(item.price * item.count)}
                  <button
                    className=" btn
                      btn-danger"
                    onClick={(e) => this.props.handleRemoveFromCart(e, item)}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
            Totalt handle beløp{" "}
            {utils.formatCurrency(
              cartItems.reduce((a, c) => a + c.price * c.count, 0)
            )}
          </div>
        )}
      </div>
    );
  }
}
