# KoinX

### Endpoints:
#### Hosted URL: [http://ec2-34-234-82-27.compute-1.amazonaws.com:8000](http://ec2-34-234-82-27.compute-1.amazonaws.com:8000)
#### Swagger API Documentation : http://ec2-34-234-82-27.compute-1.amazonaws.com:8000/api-docs/
#### POST /api/convert/crypto

- Endpoint to convert the price of one cryptocurrency to another on a specific date.
  
  **Request Body:**
  ```json
  {
    "fromCurrency": "bitcoin",
    "toCurrency": "ethereum",
    "date": "12-01-2023"
  }
  ```
  **Response:**

  ```json
  {
  "exchangeRate": 4.5678
  }
  ```
#### POST /api/companies/currency

- Endpoint to get the list of companies holding a specific cryptocurrency.

  **Request Body:**
  ```json
  {
  "currency": "bitcoin"
  }
  ```
  **Response:**
  ```json
  [
  "Company A",
  "Company B",
  "Company C"
    ]
### Transactional Approach

A transactional approach is implemented when fetching and storing cryptocurrency data. This ensures that if any error occurs during the insert and delete write operation, the entire transaction is rolled back. Data will be restored to the previous state, maintaining data consistency.

### Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Cron
- Coingecko API

### Contributors

- @jeetb2022
