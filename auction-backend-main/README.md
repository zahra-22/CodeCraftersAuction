# Auction Backend API

This is a Node.js + Express backend for an auction website. It provides REST APIs for:

- User authentication (register, login, current user)
- Managing auctions (create, list, view, close)
- Placing and listing bids on auctions

The backend uses MongoDB Atlas for data storage and JSON Web Tokens (JWT) for authentication.

---

## Tech Stack

- Node.js
- Express
# Auction Backend API

Node.js + Express backend for an auction website. This repository contains a short quick-start below; full API details and examples are in `docs/API.md`.

## Quick Start (TL;DR)

```powershell
git clone <your-github-repo-url>.git
cd auction-backend
npm install
# development
npm run dev
# production
npm start
```

Server runs by default at `http://localhost:4000`.

## Environment

Create a `.env` file in the project root with (example):

```
PORT=4000
MONGODB_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=some_long_random_secret_here
```

`.env` is ignored by `.gitignore`.

## NPM scripts

- `npm run dev` — start with `nodemon` (development)
- `npm start` — start with Node (production)

## Base URL

```
http://localhost:4000
```

## API docs

Detailed API routes, request/response examples, testing guide and troubleshooting are in `docs/API.md`.

## Troubleshooting (short)

- If you see LF/CRLF warnings from Git: ensure `node_modules/` is in `.gitignore` and untrack it with:

```cmd
git rm -r --cached node_modules
git commit -m "chore(git): remove node_modules from repo and add to .gitignore"
```

- If server errors mention missing models (e.g. `Cannot find module '../models/User'`), ensure `src/models/User.js` exists and exports a Mongoose model.

---

For full API details, open `docs/API.md`.

---

## 👥 Contributors

| Full Name | Role | Student ID |
|----------|------|-------------|
| Zahra Aden | Project Manager | 301488294 |
|            |                 |           |
|            |                 |           |
|            |                 |           |
|            |                 |           |



