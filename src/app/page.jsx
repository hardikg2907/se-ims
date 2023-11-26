// pages/transactions/index.js
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
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
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
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("stock-in");
  const [quantity, setQuantity] = useState(0);
  const [productId, setProductId] = useState("");
  const [newTransactionDialogOpen, setNewTransactionDialogOpen] =
    useState(false);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchTransactions();
    fetchProducts();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "type") {
      setTransactionType(value);
    } else if (name === "quantity") {
      setQuantity(+value);
    } else if (name === "productId") {
      setProductId(value);
    }
  };

  const addTransaction = async () => {
    try {
      await axios.post("/api/transactions", {
        type: transactionType,
        quantity,
        productId,
      });
      setTransactionType("stock-in");
      setQuantity(0);
      setProductId("");
      fetchTransactions();
      setNewTransactionDialogOpen(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };
  console.log(productId);
  return (
    <div>
      <h1 className="font-bold py-2 text-2xl px-6 text-gray-600">
        Transaction Management
      </h1>
      {/* New Transaction Dialog */}
      <Dialog
        open={newTransactionDialogOpen}
        onOpenChange={setNewTransactionDialogOpen}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-green-500 text-white font-bold rounded-md hover:bg-green-800 hover:text-gray-300 mb-4 py-4 px-2 mx-6 my-2 shadow-lg shadow-gray-400/40"
          >
            Add New Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Transaction</DialogTitle>
            <DialogDescription>
              Fill in the details for the new transaction.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTransaction();
            }}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="type" className="text-right">
                  Transaction Type
                </label>
                <Select onValueChange={setTransactionType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent onChange>
                    <SelectItem value="stock-in">Stock In</SelectItem>
                    <SelectItem value="stock-out">Stock Out</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="quantity" className="text-right">
                  Quantity
                </label>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleInputChange}
                  className="col-span-3 border border-gray-300 p-2 w-full mb-4"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="productId" className="text-right">
                  Product
                </label>
                <Select
                  onValueChange={(e) => {
                    if (e === "+") router.push("/products");
                    else setProductId(e);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+" className="cursor-pointer">
                      + Add Product
                    </SelectItem>
                    {products?.map((product) => (
                      <SelectItem key={product._id} value={product._id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Transaction</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <h2 className="mt-2 mx-6 font-bold text-gray-600 text-lg">
        Transaction List
      </h2>

      <Table className="mt-4">
        <TableHeader className="bg-gray-200 text-gray-700">
          <TableHead className="w-[100px] truncate">Transaction ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell className="font-medium">{transaction._id}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell
                className={
                  transaction.type === "stock-in"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {transaction.type === "stock-in" ? "+" : "-"}
                {transaction.quantity}
              </TableCell>
              <TableCell>
                {" "}
                <HoverCard>
                  <HoverCardTrigger>
                    <span className="hover:underline cursor-pointer">
                      {transaction?.product?.name}
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="">
                      <p className="text-lg mb-2">
                        <span className="font-semibold">Product Name:</span>
                        <br />
                        {transaction?.product?.name}
                      </p>
                      <div>
                        <p>
                          {" "}
                          <span className="font-semibold">Price: </span>
                          Rs.{transaction?.product?.price}
                        </p>
                        {/* Add additional product details as needed */}
                      </div>
                      <div>
                        <p>
                          {" "}
                          <span className="font-semibold">Category: </span>
                          {transaction?.product?.category || "-"}
                        </p>
                        <p>
                          <span className="font-semibold">Quantity: </span>
                          {transaction?.product?.quantity}
                        </p>
                        {/* Add more details based on your product structure */}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-700">
                        <span className="font-semibold">Description: </span>
                        {transaction?.product?.description || "-"}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell>
                {new Date(transaction.timestamp).toLocaleString()}
              </TableCell>
              {/* Add additional transaction details as needed */}
            </TableRow>
          ))}
        </TableBody>
        {/* You can calculate the total or display other footer information if needed */}
      </Table>
    </div>
  );
}
