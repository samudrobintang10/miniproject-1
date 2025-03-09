import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

const ListProductAdmin = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get("http://localhost:3001/products");
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  let navigate = useNavigate()
  const handleEdit = (id) => {
    navigate(`/editproductadmin/${id}`);
  };

  const handleDelete = (id) => {
    try {
      axios.delete("http://localhost:3001/products/" + id, {
      })
      toast.success("Products deleted successfully!")
      navigate('/listproductadmin')
      setProducts((prevData) => prevData.filter((item) => item.id !== id));

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Products</h1>
        <div className="flex space-x-2">
          <Link
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center"
            to="/createproductadmin"
          >
            Create
          </Link>
          <Link
            className="border-2 border-blue-500 bg-gray-200 px-4 py-2 rounded flex items-center justify-center"
            to="/"
          >
            Back
          </Link>
        </div>
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
                <button className="bg-yellow-500 text-white px-4 py-1 rounded mr-2" onClick={() => handleEdit(product.id)}>
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(product.id)}>
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
