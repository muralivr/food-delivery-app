import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const { getTotalCartAmount, token, url, cartItem, food_list } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  }

  async function placeOrder(e) {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      items: orderItems,
      address: data,
      amount: getTotalCartAmount() + 2,
    };
    await axios
      .post(url + "/api/order/place", orderData, { headers: { token } })
      .then((res) => {
        console.log(res);

        if (res.data.success) {
          const { session_url } = res.data;
          window.location.replace(session_url);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else {
      if (getTotalCartAmount() === 0) {
        navigate("/cart");
      }
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="First Name"
            value={data.firstname}
            name="firstname"
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            value={data.lastname}
            name="lastname"
            onChange={handleChange}
          />
        </div>
        <input
          required
          type="text"
          placeholder="Email"
          value={data.email}
          name="email"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="Street"
          value={data.street}
          name="street"
          onChange={handleChange}
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="City"
            value={data.city}
            name="city"
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="State"
            value={data.state}
            name="state"
            onChange={handleChange}
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="Zip Code"
            value={data.zipcode}
            name="zipcode"
            onChange={handleChange}
          />
          <input
            required
            type="text"
            placeholder="Country"
            value={data.country}
            name="country"
            onChange={handleChange}
          />
        </div>
        <input
          required
          type="text"
          placeholder="Phone"
          value={data.phone}
          name="phone"
          onChange={handleChange}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
