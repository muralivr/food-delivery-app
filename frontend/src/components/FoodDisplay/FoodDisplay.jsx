import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext);
  const [search, setSearch] = useState("");

  const filteredFood = food_list.filter((food)=>{
    const matchedSearch = food.name.toLowerCase().includes(search.toLowerCase())
    return matchedSearch
  })
  return (
    <div className="food-display" id="food-display">
      <div className="text-search">
        <h2>Top Dishes Near You</h2>
        <div className="search">
          <input
            type="text"
            placeholder="Search Food..."
            onChange={(e)=>{setSearch(e.target.value)}}
          />
        </div>
      </div>
      <div className="food-item-list">
        {filteredFood.map((food, index) => {
          if (category === "All" || category === food.category) {
            return (
              <FoodItem
                key={index}
                id={food._id}
                name={food.name}
                description={food.description}
                image={food.image}
                price={food.price}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default FoodDisplay;
