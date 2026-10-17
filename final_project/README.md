This project implements a RESTful Book Reviews API using Node.js and Express.js. It was developed as part of the IBM Developer Skills Network Express Book Reviews practice project.

The application allows users to browse books, search by ISBN, author, or title, register and log in, and manage their own book reviews through authenticated API requests.

**GitHub repository:** https://github.com/hassancodebase/expressBookReviews

## Technologies

- Node.js
- Express.js
- Axios
- JSON Web Tokens (JWT)
- Express Session
- JavaScript and JSON
- PowerShell and cURL for API testing

## Project Structure

```text
final_project/
├── router/
│   ├── auth_users.js
│   ├── booksdb.js
│   └── general.js
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation and Setup

### 1. Navigate to the project directory

```bash
cd final_project
```

### 2. Install dependencies

```bash
npm install
```

Axios is required for the asynchronous HTTP retrieval functions:

```bash
npm install axios
```

### 3. Start the server

```bash
npm start
```

The application runs on port `5000` by default.

## API Endpoints

### Public book endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Retrieve all books |
| GET | `/isbn/:isbn` | Retrieve a book by its identifier |
| GET | `/author/:author` | Retrieve books matching an author |
| GET | `/title/:title` | Retrieve books matching a title |
| GET | `/review/:isbn` | Retrieve reviews for a book |

Example requests:

```bash
curl http://localhost:5000/
curl http://localhost:5000/isbn/1
curl http://localhost:5000/author/Chinua
curl http://localhost:5000/title/Pride
curl http://localhost:5000/review/1
```

### User registration and authentication

| HTTP Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/customer/login` | Validate credentials and return an authentication token |

Example registration request:

```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"pass123"}'
```

Example login request:

```bash
curl -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"pass123"}'
```

A successful login returns a JWT token. Use that token in the `Authorization` header for protected review operations.

### Review management

| HTTP Method | Endpoint | Description |
|---|---|---|
| PUT | `/customer/auth/review/:isbn` | Add or update the authenticated user's review |
| DELETE | `/customer/auth/review/:isbn` | Delete the authenticated user's review |

Example request to add or update a review:

```bash
curl -X PUT http://localhost:5000/customer/auth/review/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"review":"An excellent and memorable book."}'
```

Example request to delete a review:

```bash
curl -X DELETE http://localhost:5000/customer/auth/review/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Replace `YOUR_TOKEN` with the token returned by the login endpoint.

## Assignment Tasks Implemented

1. **GitHub repository:** Forked and worked on the Express Book Reviews project.
2. **Retrieve all books:** Implemented `GET /`.
3. **Retrieve by ISBN:** Implemented `GET /isbn/:isbn`.
4. **Retrieve by author:** Implemented `GET /author/:author`.
5. **Retrieve by title:** Implemented `GET /title/:title`.
6. **Retrieve book reviews:** Implemented `GET /review/:isbn`.
7. **Register users:** Implemented `POST /register`, including duplicate-username validation.
8. **Log in users:** Implemented `POST /customer/login` with credential validation and JWT generation.
9. **Add or update reviews:** Implemented authenticated `PUT /customer/auth/review/:isbn`.
10. **Delete reviews:** Implemented authenticated `DELETE /customer/auth/review/:isbn`.
11. **Asynchronous book retrieval:** Added Axios-based `async/await` functions for retrieving all books, books by ISBN, author, and title in `router/general.js`.

## Assignment Evidence Files

The following files capture the API responses used to demonstrate the assignment tasks:

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

Keep these files in the directory required by your assignment instructions.

## Implementation Notes

- Book data and user accounts are stored in memory for this learning project.
- User reviews are associated with usernames, allowing users to update or delete their own reviews.
- JWT authentication protects the review-management endpoints.
- In-memory users and reviews may be reset when the server restarts.
- The default development secrets should be replaced with secure environment variables for any production deployment.
