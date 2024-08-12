const Product = require("../models/Product");

// Controller to get a list of all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Fetch all products from the database
    res.json(products); // Return the products as a JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "An error occurred on the server" }); // Send a 500 status code with an error message
  }
};

// Controller to get a single product by its ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Fetch a specific product using the ID from the request parameters
    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // Send a 404 status code if the product is not found
    }
    res.json(product); // Return the found product as a JSON response
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "An error occurred on the server" }); // Send a 500 status code with an error message
  }
};

module.exports = {
  getProducts,
  getProductById,
};
