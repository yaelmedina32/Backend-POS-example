# Inventory API

A simple inventory management REST API built with **Node.js**, **Express**, and **SQLite**.  
The project demonstrates a production-style backend structure including authentication, modular routing, and security middleware.

---

## Overview

This API provides a minimal backend for managing inventory items.  
It supports authentication, CRUD operations, and basic security practices.

The project was designed as a **backend architecture example**, focusing on:

- Modular route organization
- Authentication with JWT
- Input validation
- Secure middleware configuration
- Clear API structure

---

## Tech Stack

- **Node.js**
- **Express**
- **SQLite**
- **JWT Authentication**
- **Helmet**
- **CORS**

---

## Features

- JWT based authentication
- Inventory CRUD operations
- Secure API configuration
- SQLite database with automatic initialization
- Modular route architecture

---

## Project Structure

- src/
- controllers/
- routes/
- middleware/
- database/
- utils/


- **controllers/** → business logic
- **routes/** → API endpoints
- **middleware/** → authentication and security
- **database/** → SQLite initialization
- **utils/** → shared utilities

---

## Setup

Install dependencies:

```bash
npm start
npm install
```
Server listening on: http://localhost:3000

**Authenticate User**
- POST /api/v1/auth/login**
{
  "login": "admin",
  "password": "admin"
}

**Authorization: Bearer <token>**

**Get all items**
- GET /api/v1/inventario

**Get Item by Id**
- GET /api/v1/inventario/:id

**Create Item**
- POST /api/v1/inventario
{
  "modelo": "Model X",
  "marca": "Brand Y",
  "nombreProducto": "Product Z",
  "stock": 100
}
