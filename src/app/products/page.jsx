"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("/api/products");
    setProducts(response.data?.products);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/products", formData);
    setFormData({
      name: "",
      description: "",
      category: "",
      quantity: 0,
      price: 0,
    });
    fetchProducts();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Management</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full mb-4"
          required
        />

        <label className="block mb-2">Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full mb-4"
        />

        <label className="block mb-2">Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full mb-4"
        />

        <label className="block mb-2">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full mb-4"
          required
        />

        <label className="block mb-2">Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 w-full mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
