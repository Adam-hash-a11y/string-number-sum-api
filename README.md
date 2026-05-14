# 📦 String Number Sum API

A REST API that validates input strictly and returns the sum of the **N largest digits** from a numeric string.

This project now includes:

- strict validation layer
- sanitization support
- middleware architecture
- repository + database layer
- MongoDB integration
- API call tracking/history
- authorization middleware
- unit tests (API, service, validator)
- CI pipeline (GitHub Actions)
- linting + pre-commit hooks (Husky)

---

# 🏗 Project Structure

```txt
src
├── api
├── controller
├── config
├── middleware
├── model
├── repository
├── routes
├── service
├── types
└── validator

test
├── api
├── service
└── validator

.github
└── workflows

.husky
```

---

# 🚀 Features

- Accepts a numeric string input (e.g. `"123456"`)
- Returns the sum of the **N largest digits**
- Strict validation:
  - no letters allowed
  - no extra fields
  - no missing fields
- Optional sanitization support
- MongoDB persistence layer
- Repository pattern architecture
- API request tracking/history logging
- Protected routes with authorization middleware
- Query filtering for logs
- Fully tested (API, service, validator)
- CI pipeline with automated test + lint checks
- Pre-commit hook enforcement via Husky

---

# ⚙️ Installation

```bash
git clone https://github.com/Adam-hash-a11y/string-number-sum-api.git
cd string-number-sum-api
npm install
```

---

# ▶️ Run Project

```bash
npm run dev
```

---

# 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/string-number-sum-api
AUTH_TOKEN=your_secret_token
```

---

# 📡 API Endpoints

## POST `/api/sumNumber/`

Calculates the sum of the **N largest digits**.

---

# 📥 Request Body

```json
{
  "ch": "123456",
  "n": 3,
  "sanitize": true
}
```

---

# 🧹 Sanitize Option

The `sanitize` field is optional.

When `sanitize=true`:
- spaces are removed from `ch`
- non-digit formatting characters can be cleaned before validation

Examples:

```json
{
  "ch": "1 2 3 4 5 6",
  "n": 3,
  "sanitize": true
}
```

Sanitized value:

```txt
123456
```

---

# 📤 Success Response

```json
{
  "data": 15
}
```

---

# ❌ Error Responses

```json
{ "message": "Invalid request body" }

{ "message": "ch must be a numeric string" }

{ "message": "n must be a positive integer" }

{ "message": "n cannot exceed the length of ch" }

{ "message": "Unauthorized" }
```

---

# ⚙️ How It Works

1. Validates request body structure
2. Optionally sanitizes `ch`
3. Ensures `ch` contains only digits
4. Validates `n` is a positive integer
5. Ensures `n <= length of ch`
6. Computes sum of the **N largest digits**
7. Logs API request into MongoDB

---

# 🧠 Example

## Input

```json
{
  "ch": "987654",
  "n": 3
}
```

## Process

```txt
9 + 8 + 7
```

## Output

```json
{
  "data": 24
}
```

---

# 📜 Call History Resource

The API tracks and stores all requests in MongoDB.

Each call log contains:
- request status
- request payload
- response result
- timestamp
- success/failure state

---

# 📡 Tracking Endpoints

## GET `/calls-history`

Returns all call logs.

Supports query filtering:

```txt
/?status=success
/?status=failed
```

---

## GET `/calls-history/:id`

Returns a specific call log by ID.

---

# 🔐 Authorization

Tracking routes are protected using authorization middleware.

Example:

```http
Authorization: Bearer your_token
```

---

# 🧱 Architecture

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

This separation improves:
- scalability
- maintainability
- testability

---

# 🧪 Testing

The project includes:

- API tests
- Service tests
- Validator tests

Run tests with:

```bash
npm test
```

---

# ⚙️ CI Pipeline

GitHub Actions automatically:

- runs unit tests
- runs ESLint
- validates code quality before merge

---

# 🪝 Git Hooks

Pre-commit hooks (Husky) ensure:

- lint rules are respected
- bad commits are prevented
- code quality checks run before commits

---

# 📌 Notes

- `ch` must be a string of digits only
- `n` must be a positive integer
- `n` cannot exceed the length of `ch`
- `sanitize` is optional
- No extra fields allowed in request body
- Tracking routes require authorization
