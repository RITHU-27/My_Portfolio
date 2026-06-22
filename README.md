# MERN Portfolio

A full-stack personal portfolio built with the **MERN** stack (MongoDB, Express, React, Node.js).

- **Frontend** — React + Vite, responsive design, animated sections (Hero, About, Skills, Projects, Contact) using Framer Motion.
- **Backend** — Express REST API with a MongoDB (Mongoose) data layer. Serves projects and stores contact-form submissions. Hardened with Helmet, CORS, rate limiting, and request validation.

```
portfolio/
├── client/   # React + Vite frontend
└── server/   # Express + MongoDB backend
```

## Prerequisites

- Node.js 18+
- A MongoDB instance — either local (`mongod`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

## 1. Backend setup

```bash
cd server
cp .env.example .env        # then edit MONGO_URI if needed
npm install
npm run seed                # optional: load sample projects
npm run dev                 # starts on http://localhost:5000
```

### Environment variables (`server/.env`)

| Variable    | Description                          | Default                                   |
| ----------- | ------------------------------------ | ----------------------------------------- |
| `PORT`      | Port the API listens on              | `5000`                                     |
| `MONGO_URI` | MongoDB connection string            | `mongodb://127.0.0.1:27017/portfolio`     |

### API endpoints

| Method | Route                | Description                  |
| ------ | -------------------- | ---------------------------- |
| GET    | `/api/health`        | Health check                 |
| GET    | `/api/projects`      | List projects (`?featured=true`) |
| POST   | `/api/projects`      | Create a project             |
| GET    | `/api/projects/:id`  | Get one project              |
| PUT    | `/api/projects/:id`  | Update a project             |
| DELETE | `/api/projects/:id`  | Delete a project             |
| GET    | `/api/messages`      | List contact messages        |
| POST   | `/api/messages`      | Submit a contact message     |

## 2. Frontend setup

```bash
cd client
cp .env.example .env        # optional; leave VITE_API_URL empty for local dev
npm install
npm run dev                 # starts on http://localhost:5173
```

The Vite dev server proxies `/api` to `http://localhost:5000`, so run the backend alongside it.

## 3. Personalize

Edit `client/src/data/portfolio.js` to change your name, title, about text, skills, experience, and social links. Manage projects through the API (or `server/src/seed.js`).

## Production build

```bash
cd client && npm run build   # outputs to client/dist
```

Serve `client/dist` from any static host (Netlify, Vercel, etc.) and deploy the backend (Render, Railway, Fly.io, etc.) with `MONGO_URI` pointing at Atlas. Set `VITE_API_URL` to the deployed API URL before building the frontend.
