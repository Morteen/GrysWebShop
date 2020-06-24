import React, { Component } from "react";

export class Filter extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4">{this.props.count} produkter funnet </div>
        <div className="col-md-4">
          <label>Sorter etter pris </label>
          <select
            className="form-control"
            value={this.props.sort}
            onChange={this.props.handleChangeSort}
          >
            <option value="">Select</option>

            <option value="lowest">Fra lavest til høyest</option>
            <option value="Highest">Fra høyest til lavest</option>
          </select>
        </div>
        <div className="col-md-4"></div>
      </div>
    );
  }
}

export default Filter;
