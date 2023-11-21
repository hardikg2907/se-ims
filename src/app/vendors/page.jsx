// pages/index.js
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import VendorModal from '../components/VendorModal';

const Home = () => {
  const [vendors, setVendors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    const response = await axios.get("/api/vendors");
    setVendors(response.data);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddVendor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/vendors", {
        name,
        contactInfo,
        address,
      });
      setName("");
      setContactInfo("");
      setAddress("");
      fetchVendors();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateVendor = async (id, name, contactInfo, address) => {
    try {
      await axios.put(`/api/vendors/${id}`, { name, contactInfo, address });
      fetchVendors();
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  const handleDeleteVendor = async (id) => {
    try {
      await axios.delete(`/api/vendors/${id}`);
      fetchVendors();
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Vendor Management</h1>
      <button
        onClick={openModal}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-700 mb-4"
      >
        Add New Vendor
      </button>

      <h2 className="text-2xl font-bold mt-8 mb-4">Vendor List</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendors?.map((vendor) => (
          <li
            key={vendor._id}
            className="p-4 border border-gray-300 rounded-md"
          >
            <h3 className="text-xl font-semibold mb-2">{vendor.name}</h3>
            <p className="text-gray-600 mb-2">Contact: {vendor.contactInfo}</p>
            <p>Address: {vendor.address}</p>
            <div className="flex justify-end mt-4">
              {/* <button
                onClick={() =>
                  handleUpdateVendor(
                    vendor._id,
                    "Updated Name",
                    "Updated Contact",
                    "Updated Address"
                  )
                }
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
              >
                Update Vendor
              </button> */}
              <button
                onClick={() => handleDeleteVendor(vendor._id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Vendor</DialogTitle>
            <DialogDescription>
              Fill in the details for the new vendor.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddVendor}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="contactInfo" className="text-right">
                  Contact Info
                </label>
                <Input
                  type="text"
                  id="contactInfo"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="address" className="text-right">
                  Address
                </label>
                <Input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Vendor</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
