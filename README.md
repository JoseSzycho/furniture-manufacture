# Custom Furniture Manufacturing API

The `Custom Furniture Manufacturing API System` provides an interface for integrating a bespoke ordering and manufacturing system into your business infrastructure.

This API **streamlines the process** for estimating production time, materials cost, labor cost and order progress tracking. Additionally, the API incorporates the materials purchasing time into the production time when materials are not available.

## Table of content

- [Key features](#key-features)
- [API endpoints](#api-endpoints)
  - [authentication operations](#authentication-authentication-operations)
  - [inventory operations](#inventory-inventory-operations)
  - [labor operations](#labor-labor-operations)
  - [orders operations](#orders-orders-operations)
- [Installation](#installation)

## Key features

<details>
  <summary>Click here</summary>

- **Time estimation:** estimates an order production time based into;

- materials purchasing time
- production time for each manufacturing step

- **Cost calculation:** calculates an order cost based in;

  - materials using predefined material costs
  - labor using predefined cost structures

- **Progress tracking:** provide an order status based in:

  - reception of materials
  - actual manufacturing process step

- **Order management:**

  - provides information of all or individual orders
  - allows order cancellation or modification

- **Inventory management:**

  - manages inventory of materials and their associated cost and purchasing time
  - automatically adjust inventory when materials are used or reserved for an order

- **Manufacturing order placement:** accept and validates custom order placement based on;

  - material availability
  - pre existing labor structures
  - total production time

- **Labor structure management:** manages labor structured cost based on:

  - labor time
  - labor cost
  </details>

## API endpoints

### **`authentication`** authentication operations

![](./images/post-colour.png) **`POST`** `/api/v1/auth/login` Login the user.

<details>
  <summary>Click here</summary>

Server side create OAuth 2.0 tokens, stores them in DB and return them.

- Request

  ```http
  # Example

  # Header
  Content-Type: application/x-www-form-urlencoded

  # Body
  client_id=juan&client_secret=5678910

  ```

- **Responses:**

  - 201 OK. Response with a **access_token**, **refresh_token** and **expires_in** (expiration time of access_token in seconds). Tokens must be stored by client.

  ```json
  // Example
  // Header
  HTTP/1.1 200 OK
  Content-Type: application/json; charset=utf-8

  // Body
  {
    "access_token": "1ad67c7c-785d-4968-b34d-2d77d5802bbf",
    "refresh_token": "d4917ddd-11bb-404b-ac6d-a3123de3e24c",
    "expires_in": 60
  }
  ```

  - 400 Bad Request. (Missing argument). Response body with a JSON informative message.

  - 404 Not Found. (Invalid credentials). Response body with a JSON informative message.

  - 500 Internal Server Error. Response body with a JSON informative message.

</details>

![](./images/delete-colour.png) **`DELETE`** `/api/v1/auth/logout` Logout the user.

<details>
  <summary>Click here</summary>

Server side delete the OAuth 2.0 tokens from the DB.

- Request

  ```json
  // Example
  // Header
  Authorization: c326b621-167f-4192-9845-b11cc01597fb // Valid token
  ```

- **Responses:**

  - 204 No Content. (Successful logout).

  - 400 Bad Request. (Missing authentication token). Response body with a JSON informative message.

  - 401 Unauthorized. (Invalid authentication token). Response body with a JSON informative message.

  - 500 Internal Server Error. Response body with a JSON informative message.

</details>

![](./images/post-colour.png) **`POST`** `/api/v1/auth/refresh-tokens` Refresh the OAuth 2.0 tokens.

<details>
  <summary>Click here</summary>

Server side generates a new token and a new refresh token, update the old ones in the DB side and response with the new tokens.

- Request

  ```json
  // Example
  // Header
  Content-Type: application/x-www-form-urlencoded

  // Body
  refresh_token=1ea0e31e-2fc8-429b-9038-827f35e42dc3
  ```

- **Responses:**

  - 201 OK. Response with a **new token** and a **new refresh token**. Tokens must be stored by client.

  ```json
  // Example
  // Header
  HTTP/1.1 200 OK
  Content-Type: application/json; charset=utf-8

  // Body
  {
    "access_token": "add11a75-3dfa-4f76-888e-967a1a1a738a",
    "refresh_token": "51b27992-2043-4233-9dc9-56c31086688d",
    "expires_in": 60
  }
  ```

  - 400 Bad Request. (Missing authentication token). Response body with a JSON informative message.

  - 401 Unauthorized. (Invalid authentication token). Response body with a JSON informative message.

  - 500 Internal Server Error. Response body with a JSON informative message.

</details>

### **`inventory`** inventory operations

![](./images/get-colour.png) **`GET`** `/v1/inventory` Returns all inventory

<details>
  <summary>Click here</summary>

- **Responses:**

  - 200, successful operation

    - **Example**

    ```json
    HTTP 200 OK
      Content-Type: application/json
    [
      {
        "id": "a7cbefaf-b451-4a40-8e77-753bf1f5f639",
        "createdAt": "4/10/2023, 3:58:56 PM",
        "description": "wood",
        "quantity": 24,
        "pricePerUnit": 15,
        "unit": "m2",
        "purchaseTime": 5
      },
      {
        "id": "6f69f3d7-7d7f-4cac-b0c1-82fa337d797c",
        "createdAt": "3/10/2023, 2:58:56 PM",
        "description": "nails",
        "quantity": 1000,
        "pricePerUnit": 0.12,
        "unit": "unit",
        "purchaseTime": 1
      }
    ]
    ```

  - 204, no content

</details>

![](./images/post-colour.png) **`POST`** `/v1/inventory` Creates a new material

<details>
  <summary>Click here</summary>

- **Example**

```json
{
  "description": "wood",
  "quantity": 24,
  "pricePerUnit": 15, // USD
  "unit": "m2",
  "purchaseTime": 5 // days
}
```

- **Responses:**
  - 201, created resource
  - 400, bad request
  - 409, conflict

</details>

![](./images/get-colour.png) **`GET`** `/v1/inventory/{materialID}` Returns a material by material ID

<details>
  <summary>Click here</summary>

**Responses:**

- 200, successful operation

  - **Example**

  ```json
  HTTP 200 OK
    Content-Type: application/json
  {
    "id": "a7cbefaf-b451-4a40-8e77-753bf1f5f639",
    "createdAt": "4/10/2023, 3:58:56 PM",
    "description": "wood",
    "quantity": 24,
    "pricePerUnit": 15,
    "unit": "m2",
    "purchaseTime": 5
  }
  ```

- 404, not found

</details>

![](./images/patch-colour.png) **`PATCH`** `/v1/inventory/{materialID}` Updates a material by material ID

<details>
  <summary>Click here</summary>

- **Example**

```json
{
  "description": "wood",
  "quantity": 24,
  "pricePerUnit": 15,
  "unit": "m2",
  "purchaseTime": 5
}
```

- **Responses:**
  - 204, updated resource
  - 400, bad request
  - 404, not found

</details>

### **`labor:`** labor operations

![](./images/get-colour.png) **`GET`** `/v1/labors` Returns all labors

<details>
  <summary>Click here</summary>

- **Responses:**

- 200, successful operation

  - **Example**

  ```json
  HTTP 200 OK
    Content-Type: application/json
  [
    {
      "id": "7b45ccd1-e1c3-4e75-99ed-aa41bcc98dd1",
      "createdAt": "4/10/2023, 1:55:56 PM",
      "description": "screw a leg",
      "pricePerUnit": 1, // USD
      "timePerUnit": 2, // seconds
      "unit": "unit"
    },
    {
      "id": "cfb4b8ec-fea7-41c1-aa00-a88456ddf7c0",
      "createdAt": "2/10/2023, 1:23:54 PM",
      "description": "sanding board surface",
      "pricePerUnit": 30, // USD
      "timePerUnit": 3600, // seconds
      "unit": "m2"
    }
  ]
  ```

- 204, no content

</details>

![](./images/post-colour.png) **`POST`** `/v1/labors` Creates a new labor

<details>
  <summary>Click here</summary>

- **Example**

```json
{
  "description": "screw a leg",
  "pricePerUnit": 24, // USD
  "timePerUnit": 2, // seconds
  "unit": "unit"
}
```

- **Responses:**
  - 201, created resource
  - 400, bad request
  - 409, conflict

</details>

![](./images/get-colour.png) **`GET`** `/v1/labors/{laborID}` Returns a labor by labor ID

<details>
  <summary>Click here</summary>

**Responses:**

- 200, successful operation

  - **Example**

  ```json
  HTTP 200 OK
    Content-Type: application/json
  {
    "id": "7b45ccd1-e1c3-4e75-99ed-aa41bcc98dd1",
    "createdAt": "4/10/2023, 1:55:56 PM",
    "description": "screw a leg",
    "pricePerUnit": 1, // USD
    "timePerUnit": 2, // seconds
    "unit": "unit"
  }
  ```

- 404, not found

</details>

![](./images/patch-colour.png) **`PATCH`** `/v1/labors/{laborID}` Updates a labor by labor ID

<details>
  <summary>Click here</summary>

- **Example**

```json
{
  "description": "screw a leg",
  "pricePerUnit": 1, // USD
  "timePerUnit": 2, // seconds
  "unit": "unit"
}
```

- **Responses:**
  - 204, updated resource
  - 400, bad request
  - 404, not found

</details>

### **`orders:`** orders operations

![](./images/get-colour.png) **`GET`** `/v1/orders` Returns all manufacture orders

<details>
  <summary>Click here</summary>

- **Responses:**

- 200, successful operation

  - **Example**

  ```json
  HTTP 200 OK
    Content-Type: application/json
  [
    {
      "id": "54c42fec-f0a5-4e39-b9f6-e42e2a3c0222",
      "createdAt": "4/10/2023, 1:55:56 PM",
      "description": "antique table",
      "status": "pending",
      "manufactured": 0,
      "price": 450,
      "totalProductionTime": 143,
      "unitsToManufacture": 25,
      "materials": [
        { "id": "4818bf86-d823-447c-8b44-314b9f3c6006", "quantity": 4 },
        { "id": "1e763ff7-c953-4648-8662-535e2666ddb9", "quantity": 8 }
      ],
      "labors": [
        { "id": "58aed305-ca17-4885-8be7-0d66160112b9", "quantity": 1 },
        { "id": "557fa85c-08bf-48dd-a7d5-7d3df895881c", "quantity": 3 }
      ]
    },
    {
      "id": "26cfc6a8-3b4f-462c-bac7-5225e8586797",
      "createdAt": "2/10/2023, 1:23:54 PM",
      "description": "antique chair",
      "status": "in production",
      "manufactured": 40,
      "price": 3000,
      "totalProductionTime": 15,
      "unitsToManufacture": 100,
      "materials": [
        { "id": "4818bf86-d823-447c-8b44-314b9f3c6006", "quantity": 4 },
        { "id": "1e763ff7-c953-4648-8662-535e2666ddb9", "quantity": 1450 }
      ],
      "labors": [
        { "id": "58aed305-ca17-4885-8be7-0d66160112b9", "quantity": 1 },
        { "id": "557fa85c-08bf-48dd-a7d5-7d3df895881c", "quantity": 100 }
      ]
    }
  ]
  ```

- 204, no content

</details>

![](./images/post-colour.png) **`POST`** `/v1/order` Creates a new manufacture order

<details>
  <summary>Click here</summary>

- **Example**

```json
{
  "description": "antique table",
  "unitsToManufacture": 25,
  "materials": [
    { "id": "4818bf86-d823-447c-8b44-314b9f3c6006", "quantity": 4 },
    { "id": "1e763ff7-c953-4648-8662-535e2666ddb9", "quantity": 8 }
  ],
  "labors": [
    { "id": "58aed305-ca17-4885-8be7-0d66160112b9", "quantity": 1 },
    { "id": "557fa85c-08bf-48dd-a7d5-7d3df895881c", "quantity": 3 }
  ]
}
```

- **Responses:**
  - 201, created resource
  - 400, bad request
  - 409, conflict

</details>

![](./images/get-colour.png) **`GET`** `/v1/orders/{orderID}` Returns a manufacture order by manufacture order ID

<details>
  <summary>Click here</summary>

**Responses:**

- 200, successful operation

  - **Example**

  ```json
  HTTP 200 OK
    Content-Type: application/json
  {
    "id": "54c42fec-f0a5-4e39-b9f6-e42e2a3c0222",
    "createdAt": "4/10/2023, 1:55:56 PM",
    "description": "antique table",
    "status": "pending",
    "manufactured": 0,
    "price": 450,
    "totalProductionTime": 143,
    "unitsToManufacture": 25,
    "materials": [
      { "id": "4818bf86-d823-447c-8b44-314b9f3c6006", "quantity": 4 },
      { "id": "1e763ff7-c953-4648-8662-535e2666ddb9", "quantity": 8 }
    ],
    "labors": [
      { "id": "58aed305-ca17-4885-8be7-0d66160112b9", "quantity": 1 },
      { "id": "557fa85c-08bf-48dd-a7d5-7d3df895881c", "quantity": 3 }
    ]
  }
  ```

- 404, not found

</details>

![](./images/patch-colour.png) **`PATCH`** `/v1/orders/{orderID}` Update a manufacture order by manufacture order ID

<details>
  <summary>Click here</summary>
  
- **Example**

```json
{
  "description": "antique table",
  "status": "pending",
  "manufactured": 0,
  "price": 450,
  "totalProductionTime": 143,
  "unitsToManufacture": 25,
  "materials": [
    { "id": "4818bf86-d823-447c-8b44-314b9f3c6006", "quantity": 4 },
    { "id": "1e763ff7-c953-4648-8662-535e2666ddb9", "quantity": 8 }
  ],
  "labors": [
    { "id": "58aed305-ca17-4885-8be7-0d66160112b9", "quantity": 1 },
    { "id": "557fa85c-08bf-48dd-a7d5-7d3df895881c", "quantity": 3 }
  ]
}
```

- **Responses:**
  - 204, updated resource
  - 400, bad request
  - 404, not found

</details>

![](./images/delete-colour.png) **`DELETE`** `/v1/orders/{orderID}` Delete an unplaced manufacture order by manufacture order ID

<details>
  <summary>Click here</summary>

- **Responses:**
  - 204, deleted resource
  - 404, not found

</details>

## Installation

1. `Clone` the repository

```bash
git clone https://github.com/jszychowskilaba/furniture-manufacturing.git
```

2. `Install` dependencies

```bash
npm install
```

3. `Compile` code if you modify TypeScript code

```bash
npx tsc
```

4. `Compose` docker containers

```bash
docker compose up
```

5. `Have fun`
