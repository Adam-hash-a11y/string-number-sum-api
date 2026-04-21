# String Number Sum API

A REST API that takes a string of digits and returns the sum of the top **N** largest digits.

---

## Features

- Accepts a string of digits (e.g. `"123456"`)
- Finds and sums the **N largest** digits
- Validates input strictly — no letters, no extra fields, no missing fields

---

## Endpoint

### POST /api/sumNumber/add

#### Request Body
```json
{
  "ch": "123456",
  "n": 3
}
```

#### Success Response
```json
{
  "data": 15
}
```

#### Error Responses
```json
{ "message": "Invalid request body" }
{ "message": "ch must be a numeric string" }
{ "message": "n must be a positive integer" }
{ "message": "n cannot exceed the length of ch" }
```

---

## How It Works

1. Validates the request body — rejects extra fields, missing fields, invalid types
2. Checks `ch` contains only digits
3. Checks `n` is a positive integer and does not exceed the length of `ch`
4. If `n` equals the length of `ch` — sums all digits directly
5. Otherwise — finds and removes the largest digit `n` times, summing as it goes

---

## Installation

```bash
git clone https://github.com/Adam-hash-a11y/string-number-sum-api.git
cd string-number-sum-api
npm install
```

## Run

```bash
npm run dev
```

## Notes

- `ch` must be a string of digits only — e.g. `"12345"`
- `n` must be a positive integer
- `n` cannot be greater than the length of `ch`
- No extra fields allowed in the request body