import React, { Component } from "react";
import utils from "../utils";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productAction";
import { addToCart } from "../actions/cartAction";

class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const productsItems = this.props.products.map((product) => (
      <div className="col-md-4" key={product.id}>
        <div className="thumbnail text-center">
          <a
            href={`#${product.id}`}
            onClick={() => this.props.addToCart(this.props.cartItems, product)}
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
            onClick={() => this.props.addToCart(this.props.cartItems, product)}
          >
            Legg i handlekurven
          </button>
        </div>
      </div>
    )); //Slutt på map
    return <div className="row">{productsItems}</div>;
  }
}
const mapStateToProps = (state) => ({
  products: state.products.filteredItems,
  cartItems: state.cart.items,
});

export default connect(mapStateToProps, { fetchProducts, addToCart })(Products);
