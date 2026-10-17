# Express Book Reviews API

## Project Overview

This project implements a Book Reviews REST API using Node.js and Express.js. It is based on the IBM Developer Skills Network Express Book Reviews project and demonstrates book retrieval, user registration, authentication, and review management.

**GitHub Repository:** [hassancodebase/expressBookReviews](https://github.com/hassancodebase/expressBookReviews)

## Technologies Used

- Node.js
- Express.js
- JSON for request and response data
- JSON Web Tokens (JWT) for authentication
- Express Session
- Axios and async/await for asynchronous HTTP requests

## Project Structure

```text
expressBookReviews/
├── final_project/
│   ├── router/
│   │   ├── auth_users.js
│   │   ├── booksdb.js
│   │   └── general.js
│   ├── index.js
│   ├── package.json
│   └── README.md
├── .gitignore
├── LICENSE
└── README.md
```

## Implemented Assignment Tasks

### Task 1: GitHub Repository

Forked the original IBM Developer Skills Network repository and worked on the project in my own GitHub repository.

- Repository: [expressBookReviews](https://github.com/hassancodebase/expressBookReviews)
- Original repository: [IBM Developer Skills Network](https://github.com/ibm-developer-skills-network/expressBookReviews)

### Task 2: Retrieve All Books

Implemented `GET /` to return all books and their details.

### Task 3: Retrieve a Book by ISBN

Implemented `GET /isbn/:isbn` to retrieve a specific book using its identifier.

### Task 4: Retrieve Books by Author

Implemented `GET /author/:author` to search for books by author name.

### Task 5: Retrieve Books by Title

Implemented `GET /title/:title` to search for books by title.

### Task 6: Retrieve Book Reviews

Implemented `GET /review/:isbn` to retrieve the reviews associated with a book.

### Task 7: User Registration

Implemented `POST /register` to register a new user and check for existing usernames.

### Task 8: User Login

Implemented `POST /customer/login` to validate user credentials and issue a JWT authentication token.

### Task 9: Add or Update a Review

Implemented `PUT /customer/auth/review/:isbn` to add a review or update the authenticated user's existing review.

### Task 10: Delete a Review

Implemented `DELETE /customer/auth/review/:isbn` to delete the authenticated user's review for a book.

### Task 11: Axios and Asynchronous Book Retrieval

The `general.js` implementation includes asynchronous functions using Axios and async/await to retrieve:

- All books
- A book by ISBN
- Books by author
- Books by title

Source file: [final_project/router/general.js](https://github.com/hassancodebase/expressBookReviews/blob/main/final_project/router/general.js)

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Retrieve all books |
| GET | `/isbn/:isbn` | Retrieve a book by identifier |
| GET | `/author/:author` | Search books by author |
| GET | `/title/:title` | Search books by title |
| GET | `/review/:isbn` | Retrieve a book's reviews |
| POST | `/register` | Register a user |
| POST | `/customer/login` | Log in and receive a token |
| PUT | `/customer/auth/review/:isbn` | Add or update a review |
| DELETE | `/customer/auth/review/:isbn` | Delete the logged-in user's review |

Authenticated review requests require an `Authorization` header in the format `Bearer <token>`.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/hassancodebase/expressBookReviews.git
   ```

2. Navigate to the application directory:

   ```bash
   cd expressBookReviews/final_project
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the application:

   ```bash
   npm start
   ```

5. The server runs on port `5000` by default.

## Assignment Evidence

The following files contain saved command outputs for the assignment tasks:

- `githubrepo`
- `getallbooks`
- `getbooksbyISBN`
- `getbooksbyauthor`
- `getbooksbytitle`
- `getbookreview`
- `register`
- `login`
- `reviewadded`
- `deletereview`

These files should be retained in the location required by the assignment rubric.

## Notes

- User accounts and book reviews are stored in memory in this exercise, so they may reset when the server restarts.
- The authentication and password handling are intended for learning purposes, not production use.
- Configure appropriate secrets through environment variables before deploying an application.
