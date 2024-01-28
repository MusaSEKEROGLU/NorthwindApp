import React, { Component } from "react";
import { Table, Button } from "reactstrap";
export default class ProductList extends Component {
  render() {
    return (
      <div>
        <h3 className="mt-3">
          {this.props.info.title} - {this.props.currentCategory}
        </h3>
        <Table dark>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantit Per Unit</th>
              <th>Unit Price</th>
              <th>Unit In Stock</th>
              <th>Process</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((prd) => (
              <tr key={prd.id}>
                <th scope="row">{prd.id}</th>
                <td>{prd.productName}</td>
                <td>{prd.quantityPerUnit}</td>
                <td>{prd.unitPrice}</td>
                <td>{prd.unitsInStock}</td>
                <th>
                  <Button onClick={() => this.props.addToCart(prd)} color="info">
                    AddToCart
                  </Button>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
