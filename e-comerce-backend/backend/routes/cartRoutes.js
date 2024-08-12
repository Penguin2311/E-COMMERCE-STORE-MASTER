const express = require('express');
const {
  addProductInCart,
  deleteProductInCart,
  getCartProducts,
} = require('../controller/cart.controller'); // Import controller functions for cart operations
const { verifyUser } = require('../middleware/middleware'); // Import middleware to verify user
const router = express.Router(); // Create a new router instance

// Define routes for cart operations
router
  .route('/')
  .get(verifyUser, getCartProducts) // Route to get all products in the cart (user must be verified)
  .post(verifyUser, addProductInCart); // Route to add a product to the cart (user must be verified)

// Route to delete a product from the cart by its ID (user must be verified)
router.route('/:id').delete(verifyUser, deleteProductInCart);

module.exports = router; // Export the router for use in other parts of the application
