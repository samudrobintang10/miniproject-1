import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
      <img src={"https://cdnd.lystit.com/photos/na-kd/e130ab4d/levis-Real-World-Big-Baggy-Jeans.jpeg"} alt={product.name} className="w-full h-48 object-cover rounded-md" />
      <h3 className="mt-4 text-lg font-bold">{product.name}</h3>
      <p className="text-gray-500 text-sm">Category {product.categoryName}</p>
      <p className="mt-2 text-xl font-bold text-blue-500">${product.price.toLocaleString()}</p>
      <p className="mt-2 text-yellow-500">Rating {"★★★★★"}</p>
    </div>
  );
};

export default ProductCard;
