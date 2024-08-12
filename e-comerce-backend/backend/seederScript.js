require('dotenv').config()

// Import product data and Product model
const productData = require('./data/products')
const Product = require('./models/Product')
const mongoose = require("mongoose");

// Function to establish connection with MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variable or a default one
    await mongoose.connect( 
      process.env.MONGO_URI ||
        "mongodb+srv://AshishArora1806:Vmm5HmkMXtFpAfQ7@cluster0.hdbla.mongodb.net/",
      {
        useNewUrlParser: true, // Use the new URL parser
        useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
      }
    );

    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    process.exit(1); // Exit process with failure code
  }
};

// Establish connection to MongoDB
connectDB()

// Function to import product data into the database
const importData = async () => {
  try {
    // Remove all existing products
    await Product.deleteMany({})

    // Insert new product data
    await Product.insertMany(productData)

    console.log('Data import completed successfully')

    process.exit() // Exit process after successful import
  } catch (error) {
    console.error('Data import failed', error)
    process.exit(1) // Exit process with failure code
  }
}

// Start the data import process
importData()