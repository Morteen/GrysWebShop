import React, { Component } from "react";
import utils from "../utils";

export default class Products extends Component {
  render() {
    const productsItems = this.props.products.map((product) => (
      <div className="col-md-4">
        <div className="thumbnail text-center">
          <a
            href={`#${product.id}`}
            onClick={(e) => this.props.handleAddToCart(e, product)}
          >
            <img
              src={`/products/${product.sku}_2.jpg`}
              alt={product.title}
            ></img>
            <p>{product.title}</p>
          </a>
          <b>{utils.formatCurrency(product.price)}</b>
          <button
            className="btn btn-default"
            onClick={(e) => this.props.handleAddToCart(e, product)}
          >
            Legg i handlekurven
          </button>
        </div>
      </div>
    )); //Slutt på map
    return <div className="row">{productsItems}</div>;
  }
}
