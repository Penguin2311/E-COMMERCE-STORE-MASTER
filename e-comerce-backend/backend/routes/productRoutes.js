const express = require("express");
const router = express.Router(); // Initialize a new router object
const {
  getProducts,
  getProductById,
} = require("../controller/productControllers"); // Import controller functions

// Route to fetch all products
router.get("/", getProducts);

// Route to fetch a specific product by its ID
router.get("/:id", getProductById);

module.exports = router; // Export the router for use in other modules
