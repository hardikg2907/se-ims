// pages/index.js
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import ProductModal from "../components/ProductModal";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("/api/products");
    console.log(response.data);
    setProducts(response.data);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProduct = () => {
    closeModal();
    fetchProducts();
  };

  const handleIncreaseInventory = async (id) => {
    try {
      await axios.put(`/api/products/${id}`, {
        adjustmentType: "increase",
        quantity: 1,
      });
      fetchProducts();
    } catch (error) {
      console.error("Error increasing inventory:", error);
    }
  };

  const handleDecreaseInventory = async (id) => {
    try {
      await axios.put(`/api/products/${id}`, {
        adjustmentType: "decrease",
        quantity: 1,
      });
      fetchProducts();
    } catch (error) {
      console.error("Error decreasing inventory:", error);
    }
  };

  // ... (existing functions)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Management</h1>
      <button
        onClick={openModal}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-700 mb-4"
      >
        Add New Product
      </button>

      {/* ... (existing form code) */}

      <h2 className="text-2xl font-bold mt-8 mb-4">Product List</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <li
            key={product._id}
            className="p-4 border border-gray-300 rounded-md"
          >
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-blue-500 font-bold">
              Category: {product.category}
            </p>
            <p className="mt-2">
              <span className="font-bold">Quantity:</span> {product.quantity}
            </p>
            <p>
              <span className="font-bold">Price:</span> ${product.price}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleIncreaseInventory(product._id)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
              >
                Increase Inventory
              </button>
              <button
                onClick={() => handleDecreaseInventory(product._id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
              >
                Decrease Inventory
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* <ProductModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={handleAddProduct}
      /> */}
    </div>
  );
};

export default Home;
