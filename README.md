# 📦 String Number Sum API

A REST API that validates a numeric string and returns the sum of its **N largest digits**.

The API is built with **Node.js, TypeScript, Express, and MongoDB**, with authentication, request validation, call-history tracking, automated tests, linting, Docker support, and GitHub Actions CI.

---

# 🏗 Project Structure

```txt
.
├── src
│   ├── config
│   ├── controller
│   ├── middleware
│   ├── model
│   ├── repository
│   ├── routes
│   ├── service
│   ├── types
│   └── validator
│
├── test
│   ├── controller
│   ├── service
│   └── validator
│
├── .github
│   └── workflows
│
├── .husky
│
├── app.ts
├── main.ts
├── Dockerfile
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

---

# 🚀 Features

- Calculates the sum of the **N largest digits**
- Strict request-body validation
- Rejects unknown request fields
- Validates numeric strings
- Supports optional input sanitization
- Limits `ch` to 100 characters
- Limits JSON and URL-encoded request bodies to 10kb
- MongoDB persistence
- Repository and service layer architecture
- API call-history tracking
- Call-history filtering by status
- Protected API routes using JWT authorization
- MongoDB connection timeout handling
- API rate limiting
- Security headers with Helmet
- Automated tests with Jest and Supertest
- ESLint code-quality checks
- Husky Git hooks
- GitHub Actions CI
- Docker and Docker Compose support

---

# ⚙️ Requirements

- Node.js 20+
- npm
- MongoDB

Docker can also be used to run the API and MongoDB together.

---

# 📥 Installation

Clone the repository:

```bash
git clone https://github.com/Adam-hash-a11y/string-number-sum-api.git
cd string-number-sum-api
```

Install dependencies:

```bash
npm install
```

---

# 🌍 Environment Variables

For local development, create a `.env` file in the project root:

```env
PORT=5003
MONGO_URI=mongodb://localhost:27017/string-number-sum-api
JWT_SECRET=your_secret_key
```

### Environment variables

| Variable     | Description                      |
| ------------ | -------------------------------- |
| `PORT`       | Port used by the API             |
| `MONGO_URI`  | MongoDB connection string        |
| `JWT_SECRET` | Secret used to verify JWT tokens |

The application validates `MONGO_URI` and `JWT_SECRET` at startup and will fail to start if they are missing.

---

# ▶️ Run the API

Start the application in development mode:

```bash
npm run dev
```

The API runs on:

```txt
http://localhost:5003
```

The port can be changed through the `PORT` environment variable.

---

# 📡 API

Base URL:

```txt
/api
```

All API routes require a valid JWT token.

Authorization header:

```http
Authorization: Bearer your_token
```

---

# ➕ Sum Number

## POST `/api/sumNumber`

Calculates the sum of the **N largest digits** from `ch`.

### Request

```json
{
  "ch": "123456",
  "n": 3
}
```

### Response

```json
{
  "data": 15
}
```

The three largest digits are:

```txt
6 + 5 + 4 = 15
```

---

# 🧹 Sanitization

The `sanitize` field is optional.

When:

```json
{
  "ch": "1 2 3 4 5 6",
  "n": 3,
  "sanitize": true
}
```

whitespace is removed before validation:

```txt
123456
```

The API then continues with the normal numeric-string validation.

---

# ✅ Request Validation

The request body accepts:

```json
{
  "ch": "123456",
  "n": 3,
  "sanitize": true
}
```

Validation includes:

- `ch` is required
- `ch` must contain digits only
- `ch` cannot exceed 100 characters
- `n` is required
- `n` must be a positive integer
- `n` cannot exceed the length of `ch`
- `sanitize` is optional and must be a boolean
- Unknown fields are rejected

### Example error responses

```json
{
  "message": "Invalid request body"
}
```

```json
{
  "message": "ch must be a numeric string"
}
```

```json
{
  "message": "ch is too long"
}
```

```json
{
  "message": "n must be a positive integer"
}
```

```json
{
  "message": "n cannot exceed the length of ch"
}
```

---

# 📜 Call History

Every successful sum operation is stored in MongoDB with:

- call instance
- request status
- input data
- `n`
- `ch`
- result
- timestamp

The API also tracks failed requests for invalid `n` values.

---

# 📡 Call History Endpoints

## GET `/api/calls-history`

Returns all stored call logs.

### Filter by status

Successful calls:

```txt
/api/calls-history?status=success
```

Failed calls:

```txt
/api/calls-history?status=failed
```

Supported statuses:

```txt
success
failed
```

---

## GET `/api/calls-history/:id`

Returns a specific call log using its call instance ID.

Example:

```txt
/api/calls-history/1
```

Invalid IDs return:

```json
{
  "message": "call id must be a positive integer"
}
```

When a valid ID does not exist:

```json
{
  "message": "call log not found"
}
```

---

# 🔐 Authentication

The API uses JWT authentication to protect its routes.

Send the token using:

```http
Authorization: Bearer your_token
```

Missing authorization returns:

```txt
401 Unauthorized
```

An invalid or expired token returns:

```json
{
  "error": "Invalid or expired token"
}
```

with HTTP status:

```txt
403 Forbidden
```

---

# 🛡 Security

The API uses **Helmet** to configure security-related HTTP headers.

Request bodies are limited to:

```txt
10kb
```

The API also uses rate limiting:

```txt
10 requests per 5 minutes
```

Rate limiting is disabled during automated tests.

---

# 🧠 How It Works

```txt
Request
   ↓
Authentication
   ↓
Validation
   ↓
Sanitization
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
MongoDB
```

For a sum request:

```txt
1. Authenticate the request
2. Validate the request body
3. Sanitize ch when requested
4. Validate ch and n
5. Calculate the N largest digits
6. Store the call history
7. Store the request data
8. Return the result
```

---

# 🏛 Architecture

The project follows a layered architecture:

```txt
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

This separation keeps responsibilities isolated and improves maintainability and testability.

---

# 🗄️ Database

The application uses MongoDB with Mongoose.

MongoDB stores:

- sum requests
- call history
- call status
- call results
- timestamps
- call instance counters

The MongoDB server selection timeout is configured to:

```txt
5 seconds
```

---

# 🐳 Docker

The project includes Docker support for the API and MongoDB.

Start the services with:

```bash
docker compose up --build
```

The services are:

```txt
sum-api
express-mongodb
```

The API is exposed on:

```txt
http://localhost:5003
```

MongoDB is exposed on:

```txt
localhost:27017
```

Docker Compose uses the following environment variables:

```env
JWT_SECRET=your_secret_key
MONGO_USERNAME=your_mongodb_username
MONGO_PASSWORD=your_mongodb_password
```

The API container receives its MongoDB connection string automatically through Docker Compose.

---

# 🧪 Testing

The project includes automated tests for:

- API controllers
- services
- validators

Run the test suite:

```bash
npm test
```

The project currently has **60 automated tests**.

---

# 🔍 Linting

Run ESLint with:

```bash
npm run eslint
```

---

# ⚙️ CI Pipeline

GitHub Actions automatically:

- installs dependencies
- runs the automated test suite
- runs ESLint

The CI workflow uses **Node.js 20**.

---

# 🪝 Git Hooks

The project uses **Husky** for Git hook management.

Husky is initialized automatically after dependency installation.
