import React from "react";
import "./Orders.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { assets } from "../../assets/assets.js";

function Orders({ url }) {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    await axios
      .get(url + "/api/order/list")
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function statusHandler(e, orderId) {
    await axios.post(url + "/api/order/status", {
      orderId,
      status: e.target.value,
    }).then(async (res)=>{
      if(res.data.success){
        await fetchOrders()
      }
    }).catch((err)=>{
      console.log(err);
      
    })
  }
  return (
    <div className="order add">
      <h2>Order Page</h2>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "X" + item.quantity;
                  } else {
                    return item.name + "X" + item.quantity + ",";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstname + " " + order.address.lastname}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select
                name=""
                id=""
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
