const express = require('express');
const {
  signUpUser,
  signInUser,
  getUser,
} = require('../controller/user.controller'); // Import user controller functions
const { verifyUser } = require('../middleware/middleware'); // Import middleware for user verification
const router = express.Router(); // Create a new router instance

// Route to handle user sign-up
router.post('/signup', signUpUser);

// Route to handle user sign-in
router.post('/signin', signInUser);

// Route to get user information, requires user to be verified
router.route('/me').get(verifyUser, getUser);

module.exports = router; // Export the router to use in other parts of the application
