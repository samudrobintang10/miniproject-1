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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        setFormData(
          {
            id: response.data.id,
            name: response.data.name,
            price: response.data.price,
            categoryId: response.data.categoryId,
            image: response.data.image,
            description: response.data.description,
            stock: response.data.stock,
            userId: localStorage.getItem("userId"),
          }
        );
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3001/products/${id}`, {
        name: formData.name,
        price: parseFloat(formData.price), // Ensures price can accept decimals like 10.99
        categoryId: parseInt(formData.categoryId, 10), // Converts to integer
        image: formData.image,
        description: formData.description,
        stock: parseInt(formData.stock, 10), // Converts to integer
        userId: parseInt(formData.userId, 10), // Converts to integer
      });
      toast.success("Product updated successfully!");
      navigate('/listproductadmin');
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product.");
    }
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
        <label htmlFor='name'>Category ID</label>
        <input
          type="number"
          name="categoryId"
          placeholder="Category ID"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
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
      </form>
    </div>
  );
};

export default EditProductAdmin;
