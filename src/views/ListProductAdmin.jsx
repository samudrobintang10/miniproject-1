import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const ListProductAdmin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://10.50.0.13:3001/products");
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <Link
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 flex items-center justify-center"
          to={"/createproductadmin"}
        >
          Create
        </Link>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="border border-gray-300 p-2">{product.id}</td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">${product.price}</td>
              <td className="border border-gray-300 p-2">
                <button className="bg-yellow-500 text-white px-4 py-1 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProductAdmin;
