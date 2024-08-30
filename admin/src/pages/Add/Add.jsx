import React from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Add({ url }) {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    discription: "",
    price: "",
    category: "Salad",
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("discription", data.discription);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);
      await axios
        .post(`${url}/api/food/add`, formData)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            setData({
              name: "",
              discription: "",
              price: "",
              category: "",
            });
            setImage(false);
            toast.success(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error);
        });
    } catch (error) {
      console.log(error);
      toast.error(res.data.message);
    }
  }
  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            value={data.name}
          />
        </div>
        <div className="add-product-discription flex-col">
          <p>Product Discription</p>
          <textarea
            type="text"
            name="discription"
            rows="6"
            placeholder="Product Discription"
            onChange={handleChange}
            value={data.discription}
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" onChange={handleChange}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              value={data.price}
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
}

export default Add;
