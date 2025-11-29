# API Reference

This document contains the detailed API routes, request/response examples, and quick testing instructions for the Auction Backend.

## Auth Routes

### POST /api/auth/register

Register a new user.

Request body (JSON):

```json
{
  "username": "testuser1",
  "email": "test1@example.com",
  "password": "password123"
}
```

Response (201 Created):

```json
{
  "_id": "...",
  "username": "testuser1",
  "email": "test1@example.com",
  "token": "<jwt_token_here>"
}
```

### POST /api/auth/login

Login and receive a token.

Request body (JSON):

```json
{
  "email": "test1@example.com",
  "password": "password123"
}
```

Response (200 OK):

```json
{
  "_id": "...",
  "username": "testuser1",
  "email": "test1@example.com",
  "token": "<jwt_token_here>"
}
```

### GET /api/auth/me (protected)

Get the current logged-in user.

Headers:

```
Authorization: Bearer <jwt_token_here>
```

---

## Auction Routes

### GET /api/auctions

List all auctions (public).

### GET /api/auctions/:id

Get a single auction by ID (public).

### POST /api/auctions (protected)

Create a new auction.

Headers:

```
Authorization: Bearer <jwt_token_here>
Content-Type: application/json
```

Request body (JSON):

```json
{
  "title": "Test Item 1",
  "description": "My first auction item",
  "startingPrice": 50,
  "endTime": "2025-12-31T23:59:59.000Z"
}
```

Notes:

- `endTime` must be a valid date string.
- The authenticated user (from the token) is stored as seller.

### POST /api/auctions/:id/close (protected)

Close an auction.

Headers:

```
Authorization: Bearer <jwt_token_here>
```

Behavior:

- Only the seller who created the auction can close it.
- Auction status is updated from OPEN to CLOSED.

---

## Bid Routes

### GET /api/bids/:auctionId

List all bids for a specific auction (public).

### POST /api/bids/:auctionId (protected)

Place a new bid on an auction.

Headers:

```
Authorization: Bearer <jwt_token_here>
Content-Type: application/json
```

Request body (JSON):

```json
{
  "amount": 60
}
```

Rules:

- `amount` must be a number.
- Bid must be greater than the current price (or starting price if there are no bids yet).
- Auction must be OPEN.
- Auction `endTime` must be in the future.

---

## Quick Testing Guide (Postman / curl)

1. Register a user

```
POST http://localhost:4000/api/auth/register
```

2. Login and copy the token

```
POST http://localhost:4000/api/auth/login
```

3. For all protected routes, set the header:

```
Authorization: Bearer <token>
```

4. Create an auction

```
POST http://localhost:4000/api/auctions
```

5. List auctions

```
GET http://localhost:4000/api/auctions
```

6. Place a bid on an auction

```
POST http://localhost:4000/api/bids/<auctionId>
```

7. List bids for an auction

```
GET http://localhost:4000/api/bids/<auctionId>
```

---

## Troubleshooting

- If you see LF/CRLF warnings from Git for many files (especially under `node_modules/`), make sure `node_modules/` is in `.gitignore`. If `node_modules/` was accidentally committed, run:

```cmd
git rm -r --cached node_modules
git commit -m "chore(git): remove node_modules from repo and add to .gitignore"
```

- If server crashes with `Cannot find module '../models/User'`, ensure `src/models/User.js` exists and exports the model (the project expects `require('../models/User')`).

- Ensure `.env` contains `MONGODB_URI` and `JWT_SECRET`. If MongoDB connection fails, check the connection string and your network/Atlas IP whitelist.

---

## Possible Future Improvements

- Pagination and filtering for auctions
- Image upload for auction items
- User roles (admin, seller, bidder)
- Email verification and password reset
- More detailed validation and error messages
