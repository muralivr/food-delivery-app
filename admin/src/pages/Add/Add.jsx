import React from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Add({ url }) {
  const [image, setImage] = useState(null); // Use `null` instead of `false` for consistency
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const navigate = useNavigate()

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!data.category) {
      toast.error("Category is required.");
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    if (image) {
      formData.append("image", image);
    }
    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        navigate("/list")
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
        });
        setImage(null);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding food item");
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
              alt="Upload preview"
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
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            type="text"
            name="description"
            rows="6"
            placeholder="Product Description"
            onChange={handleChange}
            value={data.description}
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" onChange={handleChange} value={data.category}>
              <option value="">Select a category</option> {/* Default option to prompt selection */}
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
