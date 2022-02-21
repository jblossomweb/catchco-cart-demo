import React, { useState } from "react";
import "./App.css";
import productsData from "./data/products.json";
import ProductList from "./components/product-list";
import Cart from "./components/cart";
import "h8k-components";

const title = "HackerShop";

const products = productsData.map((product, index) => {
  product.id = index + 1;
  product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
  return product;
});

const App = () => {
  const [items, setItems] = useState([]);

  const addToCart = (index) => {
    setItems([...items, index]);
  };

  const removeFromCart = (index) => {
    setItems(items.filter((val) => val !== index));
  };

  return (
    <div>
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-row shop-component">
        <ProductList
          products={products}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
        <Cart items={items} products={products} />
      </div>
    </div>
  );
};

export default App;
