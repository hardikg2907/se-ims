// Import necessary dependencies and setup

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Page from "../page";

// Set up axios mock
const mockAxios = new MockAdapter(axios);

// Sample data for testing
const sampleProducts = [
  {
    _id: "1",
    name: "Product 1",
    description: "Description 1",
    category: "Category 1",
    quantity: 10,
    price: 20,
  },
  {
    _id: "2",
    name: "Product 2",
    description: "Description 2",
    category: "Category 2",
    quantity: 5,
    price: 30,
  },
];

// Mock the axios.get request for fetching products
mockAxios.onGet("/api/products").reply(200, sampleProducts);

// Mock the axios.post request for adding a product
mockAxios.onPost("/api/products").reply(200);

// Mock the axios.delete request for deleting a product
mockAxios.onDelete("/api/products/1").reply(200);

// Test suite for the page
describe("Product Management Page", () => {
  // Test case for rendering the page and fetching products
  it("renders the page and fetches products successfully", async () => {
    render(<Page />);

    // Wait for products to be loaded
    await waitFor(() => {
      // Check if the products are rendered on the page
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  // Test case for opening and submitting the modal form
  it("opens the modal form and adds a new product", async () => {
    render(<Page />);

    // Open the modal form
    userEvent.click(screen.getByText("Add New Product"));

    // Fill in the form
    userEvent.type(screen.getByLabelText("Name"), "New Product");
    userEvent.type(screen.getByLabelText("Description"), "New Description");
    userEvent.type(screen.getByLabelText("Category"), "New Category");
    userEvent.type(screen.getByLabelText("Quantity"), "15");
    userEvent.type(screen.getByLabelText("Price"), "25");

    // Submit the form
    userEvent.click(screen.getByText("Add Product"));

    // Wait for the form to be submitted and products to be reloaded
    await waitFor(() => {
      // Check if the new product is rendered on the page
      expect(screen.getByText("New Product")).toBeInTheDocument();
    });
  });
});

// Clean up axios mock after all tests are done
afterAll(() => {
  mockAxios.restore();
});
