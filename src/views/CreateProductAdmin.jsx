import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    categoryId: 0,
    image: "",
    description: "",
    stock: 0,
    userId: localStorage.getItem("userId"),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://10.50.0.13:3001/products", {
        name: formData.name,
        price: parseFloat(formData.price), // Ensures price can accept decimals like 10.99
        categoryId: parseInt(formData.categoryId, 10), // Converts to integer
        image: formData.image,
        description: formData.description,
        stock: parseInt(formData.stock, 10), // Converts to integer
        userId: parseInt(formData.userId, 10), // Converts to integer
      });
      toast("Product created successfully");
      navigate("/listproductadmin");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="categoryId"
          placeholder="Category ID"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
