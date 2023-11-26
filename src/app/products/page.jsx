"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon } from "lucide-react";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [isModal, setIsModal] = useState(false);
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
    setProducts(response.data);
  };

  const handleInputChange = (e) => {
    if (e.target.name === "quantity" || e.target.name === "price")
      setFormData({ ...formData, [e.target.name]: +e.target.value });
    else setFormData({ ...formData, [e.target.name]: e.target.value });
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
    setIsModal(false);
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h1 className="font-bold py-2 text-2xl px-6 text-gray-600">
        Product Management
      </h1>

      <Dialog open={isModal} onOpenChange={setIsModal}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-green-500 mx-6 text-white font-bold rounded-md hover:bg-green-800 hover:text-gray-300 mb-4 py-4 px-2  my-2 shadow-lg shadow-gray-400/40"
          >
            Add New Product
          </Button>
        </DialogTrigger>
        <h2 className="mt-2 mx-6 font-bold text-gray-600 text-lg ">
          Product List
        </h2>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details for the new product.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right">
                  Description
                </label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="category" className="text-right">
                  Category
                </label>
                <Input
                  type="text"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="quantity" className="text-right">
                  Quantity
                </label>
                <Input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="price" className="text-right">
                  Price
                </label>
                <Input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Product</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Table className="mt-4">
        <TableHeader className="bg-gray-200 text-gray-700">
          {/* <TableRow className="hover:none"> */}
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right ">Price</TableHead>
          <TableHead></TableHead>
          {/* </TableRow> */}
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product.name}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="text-right">{product.price}</TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="top-2 right-2 p-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                >
                  <TrashIcon size={18} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
