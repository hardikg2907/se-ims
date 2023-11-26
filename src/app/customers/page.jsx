// pages/customers/index.js
"use client";
import React, { useState, useEffect } from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
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
import { Textarea } from "@/components/ui/textarea";
import { XCircle, TrashIcon } from "lucide-react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    contactInfo: "",
    address: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      // Implement the logic to delete the customer using an API request
      //   console.log(`Deleting customer with ID: ${customerId}`);

      // Example: You can use axios or fetch to send a DELETE request to your API
      await axios.delete(`/api/customers/${customerId}`);

      // After successful deletion, update the customers list (refetch or update state)
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const addCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/customers", newCustomer);
      setNewCustomer({
        name: "",
        contactInfo: "",
        address: "",
      });
      await fetchCustomers();
      setIsModal(false);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div>
      <h1 className="font-bold py-2 text-2xl px-6 text-gray-600">
        Customer Management
      </h1>
      <Dialog open={isModal} onOpenChange={setIsModal}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-green-500 text-white font-bold rounded-md hover:bg-green-800 hover:text-gray-300 mb-4 py-4 px-2 mx-6 my-2 shadow-lg shadow-gray-400/40"
          >
            Add New Customer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Fill in the details for the new customer.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={addCustomer}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newCustomer.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="contactInfo" className="text-right">
                  Contact Info
                </label>
                <Input
                  type="text"
                  name="contactInfo"
                  placeholder="Contact Info"
                  value={newCustomer.contactInfo}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="address" className="text-right">
                  Address
                </label>
                <Textarea
                  name="address"
                  placeholder="Address"
                  value={newCustomer.address}
                  className="col-span-3 resize-none"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Customer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <h2 className="mt-2 mx-6 font-bold text-gray-600 text-lg mb-4">
        Customer List
      </h2>
      <ul className="grid gap-4 mx-4">
        {customers?.map((customer) => (
          <li
            key={customer._id}
            className="bg-gray-50 hover:font-bold hover:bg-gray-100 text-slate-700 border p-4 rounded-md transition-transform duration-300 ease-in-out transform hover:shadow-md hover:-translate-y-1 hover:border-blue-500 flex justify-between mx-2"
          >
            <h3 className="cursor-pointer">{customer.name}</h3>

            <p>Contact: {customer.contactInfo}</p>
            <p>Address: {customer.address}</p>
            {/* Add additional customer details as needed */}
            <button
              onClick={() => deleteCustomer(customer._id)}
              className="top-2 right-2 p-1 bg-red-500 text-white rounded-md hover:bg-red-700"
            >
              <TrashIcon size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
