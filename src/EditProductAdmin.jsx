import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';
import axios from 'axios';

const EditProductAdmin = () => {
  let { id } = useParams();
  const [formData, setFormData] = useState({
    id: id,
    name: "",
    price: "",
    categoryId: "",
    image: "",
    description: "",
    stock: "",
    userId: localStorage.getItem("userId"),
  });

  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        setFormData(response.data);
        setOriginalData(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      setCategories(response.data);
    } catch (error) {
      toast.error("Error fetching categories.");
      console.error(error);
    }
  };
  fetchProduct();
  fetchCategories();
}, [id]);

const handleSave = async (event) => {
  event.preventDefault();
  if (JSON.stringify(formData) === JSON.stringify(originalData)) {
    toast("No changes detected");
    return;
  }

  try {
    await axios.put(`http://localhost:3001/products/${id}`, {
      name: formData.name,
      price: parseFloat(formData.price),
      categoryId: parseInt(formData.categoryId),
      image: formData.image,
      description: formData.description,
      stock: parseInt(formData.stock),
      userId: parseInt(formData.userId),
    });

    toast.success("Product updated successfully!");
    navigate("/listproductadmin");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update product.");
  }
};

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
};

return (
  <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
    <form onSubmit={handleSave} className="space-y-4">
      <label htmlFor='name'>Name</label>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <label htmlFor='name'>Price</label>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
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
        value={formData.image}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <label htmlFor='name'>Description</label>
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      ></textarea>
      <label htmlFor='name'>Stock</label>
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save
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

export default EditProductAdmin;
