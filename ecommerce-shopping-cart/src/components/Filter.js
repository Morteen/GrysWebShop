import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productAction";

class Filter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          {this.props.filteredProducts.length} produkter funnet
        </div>
        <div className="col-md-4">
          <label>Sorter etter pris </label>
          <select
            className="form-control"
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="">Select</option>

            <option value="lowest">Fra lavest til høyest</option>
            <option value="Highest">Fra høyest til lavest</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Sorter etter str </label>
          <select
            className="form-control"
            value={this.props.size}
            onChange={(e) =>
              this.props.filterProducts(this.props.products, e.target.value)
            }
          >
            <option value="">Alle</option>
            <option value="XS">XS</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.products.items,
  filteredProducts: state.products.filteredItems,
  size: state.products.size,
  sort: state.products.sorts,
});

export default connect(mapStateToProps, { filterProducts, sortProducts })(
  Filter
);
