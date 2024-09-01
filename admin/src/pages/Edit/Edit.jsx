import React, { useEffect, useState } from "react";
import "./Edit.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function Edit({ url }) {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url + "/api/food/fetchfood/" + id)
      .then((res) => {
        setData(res.data.food);
        setImage(`${url}/images/${res.data.food.image}`); // Set the image URL
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, url]);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);

      if (image instanceof File) {
        formData.append("image", image); // Only append if it's a File object
      }

      await axios
        .put(`${url}/api/food/edit/${id}`, formData)
        .then((res) => {
          if (res.data.success) {
            navigate("/list");
            setData({
              name: "",
              description: "",
              price: "",
              category: "",
            });
            setImage(null);
            toast.success(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={
                image && typeof image === "string"
                  ? image // Display the image URL from the server
                  : image && URL.createObjectURL(image)
              } // Create an object URL for the file
              alt="Uploaded preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
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
            <select
              name="category"
              onChange={handleChange}
              value={data.category}
            >
              <option value="">Select a category</option>
              {/* Default option to prompt selection */}
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
          UPDATE
        </button>
      </form>
    </div>
  );
}

export default Edit;
