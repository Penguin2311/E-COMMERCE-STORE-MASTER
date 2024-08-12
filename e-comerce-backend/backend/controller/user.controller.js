const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { sendResponseError, checkPassword, newToken } = require('../middleware/middleware');

// Controller to handle user sign-up
const signUpUser = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
    // Hash the user's password before storing it in the database
    const hash = await bcrypt.hash(password, 8);

    // Create a new user with the hashed password
    await User.create({ ...req.body, password: hash });

    res.status(201).send('Account successfully created');
  } catch (err) {
    console.log('Error: ', err);

    // Send a generic error message in case of failure
    sendResponseError(500, 'Something went wrong, please try again', res);
  }
};

// Controller to handle user sign-in
const signInUser = async (req, res) => {
  const { password, email } = req.body;
  console.log(req.body);

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // If the user is not found, prompt them to sign up
      return sendResponseError(400, 'You need to sign up first!', res);
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await checkPassword(password, user.password);
    if (isMatch) {
      // If the password matches, create a new token and send it back
      const token = newToken(user);
      return res.status(200).send({ status: 'ok', token });
    }

    // If the password doesn't match, send an error response
    sendResponseError(400, 'Invalid password!', res);
  } catch (err) {
    console.log('Error: ', err);

    // Send a generic error message in case of failure
    sendResponseError(500, `Server error: ${err.message}`, res);
  }
};

// Controller to get user information (after user has been verified)
const getUser = async (req, res) => {
  res.status(200).send({ user: req.user });
};

// Export the controller functions
module.exports = { signUpUser, signInUser, getUser };
