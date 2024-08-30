import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
  const { cartItem, addToCart, removeCart, url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={url + "/images/" + image} alt="" className="food-item-img" />
        {!cartItem[id] ? (
          <img
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
            className="add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItem[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          {name}
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
