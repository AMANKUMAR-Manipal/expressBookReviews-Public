
const express = require('express');
const jwt = require('jsonwebtoken');
const books = require('./booksdb.js');

const regd_users = express.Router();
const users = [];

const JWT_SECRET =
  process.env.JWT_SECRET || 'development_only_change_this_secret';

// Check whether a username is already registered
const isValid = (username) => {
  return users.some(user => user.username === username);
};

// Check registered credentials
const authenticatedUser = (username, password) => {
  return users.some(
    user => user.username === username && user.password === password
  );
};

// Login
regd_users.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required.'
    });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({
      message: 'Invalid username or password.'
    });
  }

  const token = jwt.sign(
    { username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Maintain the session as well as issuing a JWT
  if (req.session) {
    req.session.username = username;
  }

  return res.status(200).json({
    message: 'User successfully logged in.',
    username,
    token
  });
});

// Add or update the logged-in user's review
regd_users.put('/auth/review/:isbn', (req, res) => {
  const username = req.user.username;
  const isbn = req.params.isbn;
  const { review } = req.body || {};

  if (!books[isbn]) {
    return res.status(404).json({
      message: 'Book not found.'
    });
  }

  if (typeof review !== 'string' || !review.trim()) {
    return res.status(400).json({
      message: 'A non-empty review is required.'
    });
  }

  const isUpdate = Object.prototype.hasOwnProperty.call(
    books[isbn].reviews,
    username
  );

  books[isbn].reviews[username] = review.trim();

  return res.status(200).json({
    message: isUpdate
      ? 'Review updated successfully.'
      : 'Review added successfully.',
    isbn,
    reviews: books[isbn].reviews
  });
});

// Delete the logged-in user's review
regd_users.delete('/auth/review/:isbn', (req, res) => {
  const username = req.user.username;
  const isbn = req.params.isbn;

  if (!books[isbn]) {
    return res.status(404).json({
      message: 'Book not found.'
    });
  }

  if (!Object.prototype.hasOwnProperty.call(
    books[isbn].reviews,
    username
  )) {
    return res.status(404).json({
      message: 'You do not have a review for this book to delete.'
    });
  }

  delete books[isbn].reviews[username];

  return res.status(200).json({
    message: 'Review deleted successfully.',
    isbn,
    reviews: books[isbn].reviews
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
