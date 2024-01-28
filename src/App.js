import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartList from "./CartList";
import NotFound from "./NotFound";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => this.setState({ products: data }));
  };
  //sepete ürün ekleme
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.productName + " added to cart");
  };
  //sepetten ürün silme
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
  };

  render() {
    let productInfo = { title: "Products" };
    let categoryInfo = { title: "Categories" };
    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <BrowserRouter>
                <Routes>
                  <Route
                    exact
                    path="/"
                    render={
                      <ProductList
                        addToCart={this.addToCart}
                        products={this.state.products}
                        currentCategory={this.state.currentCategory}
                        info={productInfo}
                      />
                    }
                  />
                  <Route exact path="/cart" component={<CartList />} />
                  <Route component={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
