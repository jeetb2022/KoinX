# KoinX


### Endpoints:

#### POST /api/convert/crypto

- Endpoint to convert the price of one cryptocurrency to another on a specific date.
  
  **Request Body:**
  ```json
  {
    "fromCurrency": "bitcoin",
    "toCurrency": "ethereum",
    "date": "12-01-2023"
  }
**Response:**

  ```json
{
  "exchangeRate": 4.5678
}

```
#### POST /api/companies/currency

-  Endpoint to get the list of companies holding a specific cryptocurrency.

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
