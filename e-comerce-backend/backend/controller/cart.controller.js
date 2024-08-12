const Cart = require("../models/Cart");

// Function to send error responses
const sendResponseError = (statusCode, message, res) => {
  res.status(statusCode).send({ error: message });
};

// Controller to get all products in the user's cart
const getCartProducts = async (req, res) => {
  try {
    // Find all cart items for the logged-in user and populate the product details
    const carts = await Cart.find({ userId: req.user._id }).populate("productId");

    res.status(200).send({ status: "ok", carts }); // Send the cart items in the response
  } catch (err) {
    console.error("Error fetching cart products:", err);
    sendResponseError(500, "Failed to retrieve cart products", res); // Send error response if something goes wrong
  }
};

// Controller to add or update a product in the user's cart
const addProductInCart = async (req, res) => {
  const { productId, count } = req.body;

  try {
    // Find the cart item by product ID and update it, or create a new one if it doesn't exist
    const cart = await Cart.findOneAndUpdate(
      { productId, userId: req.user._id },
      { productId, count, userId: req.user._id },
      { upsert: true, new: true } // `new: true` returns the updated document
    );

    res.status(201).send({ status: "ok", cart }); // Send the updated cart item in the response
  } catch (err) {
    console.error("Error adding product to cart:", err);
    sendResponseError(500, "Failed to add product to cart", res); // Send error response if something goes wrong
  }
};

// Controller to delete a product from the user's cart by its ID
const deleteProductInCart = async (req, res) => {
  try {
    // Remove the cart item by its ID
    await Cart.findByIdAndRemove(req.params.id);
    res.status(200).send({ status: "ok" }); // Send a success response
  } catch (err) {
    console.error("Error deleting product from cart:", err);
    sendResponseError(500, "Failed to delete product from cart", res); // Send error response if something goes wrong
  }
};

module.exports = { addProductInCart, deleteProductInCart, getCartProducts };
