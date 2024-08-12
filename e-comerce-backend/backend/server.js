require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const cors = require("cors");
const mongoose = require("mongoose");

// Import product data and Product model
const productData = require('./data/products')
const Product = require('./models/Product')

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


const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
