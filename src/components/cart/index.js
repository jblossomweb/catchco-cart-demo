import React, { useState } from "react";
import countOccurrences from "../../utils/countOccurences";
import "./index.css";

const Cart = ({ items, products }) => {
  const [pctOff, setPctOff] = useState(0);

  const handleCoupon = (event) => {
    const { value } = event.currentTarget;
    setPctOff(Number(value));
  };

  const quantities = items.reduce(
    (lines, item) => ({
      ...lines,
      [item]: countOccurrences(items, item),
    }),
    {}
  );

  const subTotal = items.reduce(
    (total, i) => total + products[i]?.price || 0,
    0
  );
  const discount = subTotal * (pctOff / 100);
  const totalPrice = subTotal - discount;

  return (
    <div className="card outlined my-16 mr-25 flex-30">
      <section className="layout-row align-items-center justify-content-center px-16">
        <h4>Your Cart</h4>
      </section>
      <div className="divider" />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th className="numeric">Quantity</th>
            <th className="numeric">Price</th>
            <th className="numeric">Ext</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(quantities).map((cartItem, idx) => (
            <tr
              data-testid={"cart-item-" + idx}
              key={idx + 1}
              className="slide-up-fade-in"
            >
              <td>{idx + 1}.</td>
              <td className="name" data-testid="cart-item-name">
                {products[cartItem]?.heading}
              </td>
              <td className="numeric quantity" data-testid="cart-item-quantity">
                {quantities[cartItem]}
              </td>
              <td className="numeric quantity" data-testid="cart-item-price">
                {products[cartItem]?.price}
              </td>
              <td className="numeric quantity" data-testid="cart-item-ext">
                {products[cartItem]?.price * quantities[cartItem]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="layout-row justify-content-between align-items-center px-8 mx-12">
        <h5>Select Coupon</h5>
        <select
          data-testid="cart-coupon"
          className="coupon-select"
          onChange={handleCoupon}
        >
          <option value="0">None</option>
          <option value="10">OFF10</option>
          <option value="20">OFF20</option>
        </select>
      </div>
      <ul className="bordered inset ma-0 px-8 mt-30">
        <li className="layout-row justify-content-between py-12 caption font-weight-light">
          <span>Subtotal</span>
          <span data-testid="cart-subtotal">${subTotal}</span>
        </li>
        <li className="layout-row justify-content-between py-12 caption font-weight-light">
          <span>Discount (-)</span>
          <span className="discount" data-testid="cart-discount">
            ${discount}
          </span>
        </li>
        <li className="layout-row justify-content-between py-12 font-weight-bold">
          <span>Total</span>
          <span data-testid="cart-total">${totalPrice}</span>
        </li>
      </ul>
    </div>
  );
};

export default Cart;
