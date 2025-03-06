import { useState, useEffect } from "react";
import { Checkbox, Button } from "@mui/material";

export default function ShoppingCart({ userId }) {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetch(`http://10.50.0.13:3001/cart?userId=${localStorage.getItem("userId")}`)
      .then((res) => res.json())
      .then(async (cartData) => {
        console.log("Cart Data:", cartData); // Debugging

        // Fetch detail produk berdasarkan productId
        const productRequests = cartData.map((item) =>
          fetch(`http://10.50.0.13:3001/products/${item.productId}`)
            .then((res) => res.json())
            .then((product) => ({
              ...item,
              ...product, // Gabungkan data produk
            }))
        );

        // Tunggu semua request selesai
        const cartWithProducts = await Promise.all(productRequests);

        console.log("Cart with Product Details:", cartWithProducts); // Debugging

        // Gabungkan produk yang sama berdasarkan productId
        const mergedCart = cartWithProducts.reduce((acc, item) => {
          const existingItem = acc.find((p) => p.productId === item.productId);
          if (existingItem) {
            existingItem.quantity += item.quantity; // Tambahkan kuantitas jika produk sudah ada
          } else {
            acc.push(item); // Tambahkan produk baru jika belum ada
          }
          return acc;
        }, []);

        setCart(mergedCart);
      })
      .catch((err) => console.error("Error fetching cart data:", err));
  }, [userId]);

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const totalPrice = cart.reduce((total, item) => {
    if (selectedItems.includes(item.id)) {
      return total + item.price * item.quantity;
    }
    return total;
  }, 0);

  return (
    <div className="max-w-3xl p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Keranjang</h1>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <Checkbox
            checked={selectedItems.length === cart.length}
            onChange={toggleSelectAll}
          />
          <span className="text-lg font-semibold">
            Pilih Semua ({cart.length})
          </span>
        </div>
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center py-4 space-x-4 border-t"
          >
            <Checkbox
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleSelect(item.id)}
            />
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-16 h-16 rounded-md"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.stock}</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  ${(item.price || item.product?.price || 0).toLocaleString()}
                </span>
                {item.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${item.oldPrice?.toLocaleString() || 0}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center border rounded-md">
              <Button onClick={() => updateQuantity(item.id, -1)}>-</Button>
              <span className="px-2">{item.quantity}</span>
              <Button onClick={() => updateQuantity(item.id, 1)}>+</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
        <h2 className="mb-2 text-lg font-bold">Ringkasan Belanja</h2>
        <p className="mb-5 text-gray-600">Total: ${totalPrice.toLocaleString()}</p>
        <Button
          variant="contained"
          className="w-full mt-2"
          disabled={selectedItems.length === 0}
        >
          Beli ({selectedItems.length} item)
        </Button>
      </div>
    </div>
  );
}
