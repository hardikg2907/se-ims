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

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("stock-in");
  const [quantity, setQuantity] = useState(0);
  const [productId, setProductId] = useState("");
  const [newTransactionDialogOpen, setNewTransactionDialogOpen] =
    useState(false);
  const [products, setProducts] = useState([]);

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
      <h1>Transaction Management</h1>
      {/* New Transaction Dialog */}
      <Dialog
        open={newTransactionDialogOpen}
        onOpenChange={setNewTransactionDialogOpen}
      >
        <DialogTrigger asChild>
          <Button variant="outline">Add New Transaction</Button>
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
                <Select onValueChange={(e) => setProductId(e)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent>
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] truncate">Transaction ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
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
              <TableCell>{transaction?.product?.name}</TableCell>
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
