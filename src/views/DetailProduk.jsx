import {
  faMinus,
  faPlus,
  faShoppingCart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router";

export default function ProductDetail() {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [categoryName, setCategoryName] = useState("Tidak tersedia");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      userId: Number(localStorage.getItem("userId")),
      productId: Number(id),
      quantity: quantity,
    };

    try {
      // Check if the product already exists in the cart
      const response = await axios.get(
        `http://10.50.0.13:3001/cart?userId=${formData.userId}&productId=${formData.productId}`
      );

      if (response.data.length > 0) {
        // Product exists, update the quantity
        const existingItem = response.data[0];
        const updatedQuantity = existingItem.quantity + formData.quantity;

        await axios.put(`http://10.50.0.13:3001/cart/${existingItem.id}`, {
          userId: formData.userId,
          productId: formData.productId,
          quantity: updatedQuantity,
        });
        toast.success("Quantity updated in cart");
      } else {
        // Product does not exist, add new item
        await axios.post("http://10.50.0.13:3001/cart", formData);
        toast.success("Added to cart");
      }

      setTimeout(() => navigate("/cart"), 1000);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menambahkan ke keranjang");
    }
  };

  useEffect(() => {
    if (!id) return;

    const getData = async () => {
      try {
        const response = await axios.get(
          `http://10.50.0.13:3001/products/${id}`
        );
        setData(response.data);

        if (response.data.categoryId) {
          const categoryResponse = await axios.get(
            `http://10.50.0.13:3001/categories/${response.data.categoryId}`
          );
          setCategoryName(categoryResponse.data.name || "Tidak tersedia");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getData();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      {!data ? (
        <p>Data sedang dimuat...</p>
      ) : (
        <Card className="w-full max-w-3xl shadow-lg rounded-xl">
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="flex justify-center">
              <img
                src={data.image}
                alt="Product"
                className="rounded-lg shadow-md"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between">
              <h2 className="text-sm text-gray-600">
                Kategori: {categoryName}
              </h2>
              <h1 className="mb-2 text-2xl font-bold text-gray-800">
                <p>{data.name}</p>
              </h1>
              <p className="mb-4 text-sm text-gray-600">{data.description}</p>

              <div>
                {/* Rating */}
                <div className="flex items-center mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon icon={faStar} key={i} />
                  ))}
                  <span className="ml-2 text-gray-600">(4.5/5)</span>
                </div>

                {/* Price */}
                <p className="text-2xl font-semibold text-gray-900">
                  Rp {data.price || "Stok Kosong"}
                </p>
                <p className="pt-1 text-sm text-gray-400 fontsemibold">
                  Stok: {data.stock || "Stok Kosong"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center mt-6 space-x-4">
                {/* Tombol Kurangi */}
                <button
                  onClick={decreaseQuantity}
                  className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full hover:bg-gray-400"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>

                {/* Kuantitas */}
                <span className="w-8 text-lg font-semibold text-center">
                  {quantity}
                </span>

                {/* Tombol Tambah */}
                <button
                  onClick={increaseQuantity}
                  className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full hover:bg-gray-400"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>

                {/* Tombol Tambah ke Keranjang */}
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
