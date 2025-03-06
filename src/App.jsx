import React, { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import axios from "axios";
import { useParams } from "react-router";

const App = () => {
  let { id } = useParams();
  const [products, setProducts] = useState(null);
  const [categoryName, setCategoryName] = useState("Tidak tersedia");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://10.50.0.13:3001/products");
        const productList = response.data;

        // Mengupdate setiap produk dengan nama kategori
        const updatedProducts = await Promise.all(
          productList.map(async (product) => {
            if (product.categoryId) {
              try {
                // Mengambil kategori berdasarkan categoryId
                const categoryResponse = await axios.get(
                  `http://10.50.0.13:3001/categories/${product.categoryId}`
                );
                product.categoryName = categoryResponse.data.name || "Tidak tersedia";
              } catch (error) {
                product.categoryName = "Tidak tersedia";
                console.error("Error fetching category:", error);
              }
            }
            return product;
          })
        );

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {!products ? (
          <p>Data sedang dimuat</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
