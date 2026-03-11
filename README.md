# Inventory API

This is a REST API for managing inventory, built with Node.js, Express, and SQLite.

## Features

- **Authentication**: JWT based authentication.
- **Inventory CRUD**: Create, Read, Update, Delete inventory items.
- **Security**: Basic security with Helmet and CORS.
- **Database**: SQLite database with `sqlite` and `sqlite3`.

## Setup

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Start the server:
    ```bash
    npm start
    ```
    Or for development with auto-restart:
    ```bash
    npm run dev
    ```

The server will start on port 3000 (default) and create the database `inventory.db` automatically.

## API Endpoints

### Auth

- **POST /api/v1/auth/login**
    - Body: `{ "login": "admin", "password": "admin" }`
    - Response: `{ "status": "success", "token": "...", "data": { "user": ... } }`

### Inventory (Protected)

All inventory routes require the `Authorization` header with `Bearer <token>`.

- **GET /api/v1/inventario**
    - Get all inventory items.

- **GET /api/v1/inventario/:id**
    - Get a single inventory item by ID.

- **POST /api/v1/inventario**
    - Create a new inventory item.
    - Body:
      ```json
      {
        "modelo": "Model X",
        "marca": "Brand Y",
        "nombreProducto": "Product Z",
        "stock": 100
      }
      ```

- **PATCH /api/v1/inventario/:id**
    - Update an inventory item.
    - Body: (any combination of fields)
      ```json
      {
        "stock": 150
      }
      ```

- **DELETE /api/v1/inventario/:id**
    - Delete an inventory item.

## Default User

- **Login**: `admin`
- **Password**: `admin`
