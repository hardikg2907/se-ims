// Import necessary dependencies and setup

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Customers from "../page";

// Set up axios mock
const mockAxios = new MockAdapter(axios);

// Sample data for testing
const sampleCustomers = [
  {
    _id: "1",
    name: "Customer 1",
    contactInfo: "Contact 1",
    address: "Address 1",
  },
  {
    _id: "2",
    name: "Customer 2",
    contactInfo: "Contact 2",
    address: "Address 2",
  },
];

// Mock the axios.get request for fetching customers
mockAxios.onGet("/api/customers").reply(200, sampleCustomers);

// Mock the axios.post request for adding a customer
mockAxios.onPost("/api/customers").reply(200);
// Mock the axios.delete request for deleting a customer
mockAxios.onDelete("/api/customers/1").reply(200);

// Test suite for the Customers component
describe("Customers Component", () => {
  // Test case for rendering the component and fetching customers
  it("renders the component and fetches customers successfully", async () => {
    render(<Customers />);

    // Wait for customers to be loaded
    await waitFor(() => {
      // Check if the customers are rendered on the page
      expect(screen.getByText("Customer 1")).toBeInTheDocument();
      expect(screen.getByText("Customer 2")).toBeInTheDocument();
    });
  });

  // Test case for opening and submitting the modal form
  it("opens the modal form and adds a new customer", async () => {
    render(<Customers />);

    // Open the modal form
    userEvent.click(screen.getByText("Add New Customer"));

    // Fill in the form
    userEvent.type(screen.getByLabelText("Name"), "New Customer");
    userEvent.type(screen.getByLabelText("Contact Info"), "New Contact");
    userEvent.type(screen.getByLabelText("Address"), "New Address");

    // Submit the form
    userEvent.click(screen.getByText("Add Customer"));

    // Wait for the form to be submitted and customers to be reloaded
    await waitFor(() => {
      // Check if the new customer is rendered on the page
      expect(screen.getByText("New Customer")).toBeInTheDocument();
    });
  });

  // Test case for deleting a customer
  it("deletes a customer successfully", async () => {
    render(<Customers />);

    // Wait for customers to be loaded
    await waitFor(() => {
      // Check if the customers are rendered on the page
      expect(screen.getByText("Customer 1")).toBeInTheDocument();
    });

    // Click the delete button for the first customer
    userEvent.click(screen.getByTestId("delete-button-1"));

    // Wait for the customer to be deleted and customers to be reloaded
    await waitFor(() => {
      // Check if the first customer is no longer on the page
      expect(screen.queryByText("Customer 1")).not.toBeInTheDocument();
    });
  });
});

// Clean up axios mock after all tests are done
afterAll(() => {
  mockAxios.restore();
});
