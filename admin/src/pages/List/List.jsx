import React from "react";
import "./List.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function List({url}) {
  
  const [list, setList] = useState([]);
  async function fetchList() {
    await axios
      .get(`${url}/api/food/list`)
      .then((res) => {
        if (res.data.success) {
          setList(res.data.foods);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  }
  useEffect(() => {
    fetchList();
  }, []);

  async function removeFood(foodId) {
    await axios
      .delete("http://localhost:4000/api/food/remove/" + foodId)
      .then((res) => {
        if (res.data.success) {
          fetchList();
          toast.success(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error")
      });
  }
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Images</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((food, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${food.image}`} alt="" />
              <p>{food.name}</p>
              <p>{food.category}</p>
              <p>{food.price}</p>
              <p onClick={() => removeFood(food._id)} className="cross">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
