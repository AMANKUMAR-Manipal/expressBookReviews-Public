const axios = require('axios');
const express = require('express');
const books = require('./booksdb.js');
const { isValid, users } = require('./auth_users.js');

const public_users = express.Router();

// Register a new user
public_users.post('/register', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username and password are required.'
    });
  }

  if (isValid(username)) {
    return res.status(409).json({
      message: 'Username already exists.'
    });
  }

  users.push({ username, password });

  return res.status(201).json({
    message: 'User successfully registered. Now you can login.'
  });
});

// Get all books
public_users.get('/', (req, res) => {
  return res.status(200).json(books);
});

// Get book by ISBN (numeric database key in this starter project)
public_users.get('/isbn/:isbn', (req, res) => {
  const book = books[req.params.isbn];

  if (!book) {
    return res.status(404).json({
      message: 'Book not found.'
    });
  }

  return res.status(200).json(book);
});

// Search books by author (case-insensitive partial match)
public_users.get('/author/:author', (req, res) => {
  const author = req.params.author.toLowerCase();

  const results = Object.values(books).filter(book =>
    book.author.toLowerCase().includes(author)
  );

  return res.status(200).json(results);
});

// Search books by title (case-insensitive partial match)
public_users.get('/title/:title', (req, res) => {
  const title = req.params.title.toLowerCase();

  const results = Object.values(books).filter(book =>
    book.title.toLowerCase().includes(title)
  );

  return res.status(200).json(results);
});

// Get reviews for a specific book
public_users.get('/review/:isbn', (req, res) => {
  const book = books[req.params.isbn];

  if (!book) {
    return res.status(404).json({
      message: 'Book not found.'
    });
  }

  return res.status(200).json(book.reviews);
});

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

async function getAllBooks() {
  const response = await axios.get(`${API_BASE_URL}/`);
  return response.data;
}

async function getBookByISBN(isbn) {
  const response = await axios.get(
    `${API_BASE_URL}/isbn/${encodeURIComponent(isbn)}`
  );
  return response.data;
}

async function getBooksByAuthor(author) {
  const response = await axios.get(
    `${API_BASE_URL}/author/${encodeURIComponent(author)}`
  );
  return response.data;
}

async function getBooksByTitle(title) {
  const response = await axios.get(
    `${API_BASE_URL}/title/${encodeURIComponent(title)}`
  );
  return response.data;
}

module.exports.bookApi = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle
};

module.exports.general = public_users;
