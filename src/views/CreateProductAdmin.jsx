import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData,] = useState({
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
      await axios.post("http://localhost:3001/products", {
        name: formData.name,
        price: parseFloat(formData.price), // Ensures price can accept decimals like 10.99
        categoryId: parseInt(formData.categoryId, 10), // Converts to integer
        image: formData.image,
        description: formData.description,
        stock: parseInt(formData.stock, 10), // Converts to integer
        userId: parseInt(formData.userId, 10), // Converts to integer
      });
      toast.success("Product created successfully");
      navigate("/listproductadmin");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true"); // Tandai bahwa sudah reload
      window.location.reload(); // Reload hanya sekali
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/categories");
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching categories.");
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor='name'>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <label htmlFor='name'>Price</label>
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <label htmlFor='name'>Category</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="border p-2 w-full mb-4"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor='name'>Image Product</label>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <label htmlFor='name'>Description</label>
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <label htmlFor='name'>Stock</label>
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
        <button
          type="submit"
          className="border-2 border-blue-500 bg-gray-200 px-4 py-2 rounded ml-2"
          onClick={() => navigate("/listproductadmin")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
