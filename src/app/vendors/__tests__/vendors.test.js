// Import necessary dependencies and setup

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Home from "../page";

// Set up axios mock
const mockAxios = new MockAdapter(axios);

// Sample data for testing
const sampleVendors = [
  {
    _id: "1",
    name: "Vendor 1",
    contactInfo: "Contact 1",
    address: "Address 1",
  },
  {
    _id: "2",
    name: "Vendor 2",
    contactInfo: "Contact 2",
    address: "Address 2",
  },
];

// Mock the axios.get request for fetching vendors
mockAxios.onGet("/api/vendors").reply(200, sampleVendors);

// Mock the axios.post request for adding a vendor
mockAxios.onPost("/api/vendors").reply(200);

// Mock the axios.delete request for deleting a vendor
mockAxios.onDelete("/api/vendors/1").reply(200);

// Test suite for the Home component
describe("Home Component", () => {
  // Test case for rendering the component and fetching vendors
  it("renders the component and fetches vendors successfully", async () => {
    render(<Home />);

    // Wait for vendors to be loaded
    await waitFor(() => {
      // Check if the vendors are rendered on the page
      expect(screen.getByText("Vendor 1")).toBeInTheDocument();
      expect(screen.getByText("Vendor 2")).toBeInTheDocument();
    });
  });

  // Test case for opening and submitting the modal form
  it("opens the modal form and adds a new vendor", async () => {
    render(<Home />);

    // Open the modal form
    userEvent.click(screen.getByText("Add New Vendor"));

    // Fill in the form
    userEvent.type(screen.getByLabelText("Name"), "New Vendor");
    userEvent.type(screen.getByLabelText("Contact Info"), "New Contact");
    userEvent.type(screen.getByLabelText("Address"), "New Address");

    // Submit the form
    userEvent.click(screen.getByText("Add Vendor"));

    // Wait for the form to be submitted and vendors to be reloaded
    await waitFor(() => {
      // Check if the new vendor is rendered on the page
      expect(screen.getByText("New Vendor")).toBeInTheDocument();
    });
  });

  // Test case for deleting a vendor
  it("deletes a vendor successfully", async () => {
    render(<Home />);

    // Wait for vendors to be loaded
    await waitFor(() => {
      // Check if the vendors are rendered on the page
      expect(screen.getByText("Vendor 1")).toBeInTheDocument();
    });

    // Click the delete button for the first vendor
    userEvent.click(screen.getByText("Remove"));

    // Wait for the vendor to be deleted and vendors to be reloaded
    await waitFor(() => {
      // Check if the first vendor is no longer on the page
      expect(screen.queryByText("Vendor 1")).not.toBeInTheDocument();
    });
  });
});

// Clean up axios mock after all tests are done
afterAll(() => {
  mockAxios.restore();
});
