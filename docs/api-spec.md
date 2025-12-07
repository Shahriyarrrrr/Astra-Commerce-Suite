# Astra E-Commerce System — API Specification

Version: 1.0  
Base URL: `/api/`

All responses follow the structure:
{ ok: true | false, ...data }

---

## Authentication

### POST `/api/auth/login`
Body:
- email
- password

Response:
- ok
- token
- user

### POST `/api/auth/register`
Body:
- name
- email
- password

Response:
- ok
- user

---

## Products

### GET `/api/products/list`
Query:
- page
- q
- category
- sort

Response:
- ok
- products
- page
- total

### GET `/api/products/view/:id`
Response:
- ok
- product

### POST `/api/products/add`
Body:
- title  
- price  
- img  
- category  
- stock  

Response:
- ok
- product

---

## Cart

### POST `/api/cart/update`
Body:
- userId
- cart[]

Response:
- ok
- cart

### GET `/api/cart/view/:userId`
Response:
- ok
- cart

---

## Orders

### POST `/api/orders/create`
Body:
- address
- cart
- ship
- shipCost
- pay
- promo

Response:
- ok
- order

### GET `/api/orders/list`
Response:
- ok
- orders[]

### GET `/api/orders/view/:id`
Response:
- ok
- order

---

## Wishlist

### GET `/api/wishlist/`
Response:
- ok
- wishlist[]

### POST `/api/wishlist/add`
Body:
- title
- img
- price

Response:
- ok
- item

### POST `/api/wishlist/remove`
Body:
- id

Response:
- ok

---

## Blog

### GET `/api/blog/list`
Response:
- ok
- posts[]

### GET `/api/blog/view/:id`
Response:
- ok
- post

### POST `/api/blog/add`
Body:
- title
- img
- category
- body

Response:
- ok
- post

---

## Uploads

### POST `/api/uploads/image`
Form-data:
- file

Response:
- ok
- file (URL)

---

## Profile

### POST `/api/profile/update`
Body:
- id
- name
- email
- bio
- avatar

Response:
- ok
- user

### GET `/api/profile/info/:id`
Response:
- ok
- user

---

## Admin

### GET `/api/admin/users`
### GET `/api/admin/audit`
### POST `/api/admin/product/update`
### POST `/api/admin/product/delete`

---

## Payments

### POST `/api/pay/mock`
### POST `/stripe/charge`
### POST `/paypal/pay`

Each returns a transaction reference:
- id
- amount
- currency

---

# **End of API Specification**
