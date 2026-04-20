# String Number Sum API

A simple REST API that takes a string of digits and returns the sum of the first **N** digits.

---

## 🚀 Features
- Works with a continuous string (e.g. `"123456"`)
- Sums digits one by one (1 + 2 + 3 ...)
- Returns the sum of the first **N** digits
- Validates input

---

## 📦 Endpoint

### POST /sum

#### Request Body
```json
{
  "input": "123456",
  "n": 3
}
```

#### Success Response
```json
{
  "sum": 6
}
```

#### Error Response
```json
{
  "error": "N exceeds the length of the string"
}
```

---

## ⚙️ How It Works
1. The API receives a string of digits
2. Splits the string into individual characters
3. Converts each character into a number
4. Takes the first **N** digits
5. Returns their sum

---

## 🛠️ Installation

```bash
git clone https://github.com/Adam-hash-a11y/string-number-sum-api.git
cd string-number-sum-api
npm install
```

## ▶️ Run the Project

```bash
npm run dev
```


## 📌 Notes
- Input must be a string of digits (e.g. `"12345"`)
- The API returns an error if **N** is greater than the string length
