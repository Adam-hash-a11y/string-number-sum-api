# 📦 String Number Sum API

A REST API that validates input strictly and returns the sum of the **N largest digits** from a numeric string.

This project includes:

- strict validation layer
- unit tests (API, service, validator)
- CI pipeline (GitHub Actions)
- linting + pre-commit hooks (Husky)

---

## 🏗 Project Structure

```
src
├── api
├── controller
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

## 🚀 Features

- Accepts a numeric string input (e.g. `"123456"`)
- Returns sum of the **N largest digits**
- Strict validation:
  - no letters allowed
  - no extra fields
  - no missing fields
- Fully tested (unit tests for all layers)
- CI pipeline with automated test + lint checks
- Pre-commit hook enforcement via Husky

---

## ⚙️ Installation

```bash
git clone https://github.com/Adam-hash-a11y/string-number-sum-api.git
cd string-number-sum-api
npm install
```

---

## ▶️ Run Project

```bash
npm run dev
```

---

## 📡 API Endpoint

### POST `/api/sumNumber/add`

---

## 📥 Request Body

```json
{
  "ch": "123456",
  "n": 3
}
```

---

## 📤 Success Response

```json
{
  "data": 15
}
```

---

## ❌ Error Responses

```json
{ "message": "Invalid request body" }
{ "message": "ch must be a numeric string" }
{ "message": "n must be a positive integer" }
{ "message": "n cannot exceed the length of ch" }
```

---

## ⚙️ How It Works

1. Validates request body structure (no extra/missing fields)
2. Ensures `ch` contains only digits
3. Validates `n` is a positive integer
4. Ensures `n <= length of ch`
5. Computes sum of the **N largest digits**

---

## 🧠 Example

### Input

```json
{
  "ch": "987654",
  "n": 3
}
```

### Process

- Pick largest digits → 9 + 8 + 7

### Output

```json
{
  "data": 24
}
```

---

## 🧪 Testing

- API tests → request/response validation
- Service tests → business logic
- Validator tests → input validation rules

```bash
npm test
```

---

## ⚙️ CI Pipeline

- Runs unit tests
- Runs ESLint checks
- Ensures code quality before merge

---

## 🪝 Git Hooks

Pre-commit hooks (Husky) ensure:

- lint rules are respected
- code quality is enforced before commits

---

## 📌 Notes

- `ch` must be a string of digits only
- `n` must be a positive integer
- `n` cannot exceed the length of `ch`
- No extra fields allowed in request body
