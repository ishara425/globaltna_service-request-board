# GlobalTNA Service Request Board

A full-stack web application where homeowners can post service requests and tradespeople can browse, update, and manage them.

## Tech Stack

- **Frontend:** Next.js 16 (App Router) + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Deployment:** Vercel (Frontend) + Railway (Backend)

## Live Demo

- **Frontend:** https://globaltna-frontend.vercel.app
- **Backend API:** https://globaltnaservice-request-board-production.up.railway.app/api/jobs

## Project Structure
globaltna_service-request-board/
├── backend/
│   ├── models/
│   │   └── JobRequest.js
│   ├── routes/
│   │   └── jobs.js
│   ├── server.js
│   ├── seed.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── jobs/[id]/
│   │   │   └── page.js
│   │   ├── new/
│   │   │   └── page.js
│   │   ├── layout.js
│   │   └── page.js
│   └── package.json
└── README.md

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/ishara425/globaltna_service-request-board.git
cd globaltna_service-request-board
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your values:
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/globaltna
PORT=5000

Start the backend:

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file:
NEXT_PUBLIC_API_URL=http://localhost:5000

Start the frontend:

```bash
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 4. Seed Sample Data (Optional)

```bash
cd backend
npm run seed
```

This inserts 8 sample job requests into the database.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all jobs |
| GET | `/api/jobs?category=Plumbing` | Filter by category |
| GET | `/api/jobs?status=Open` | Filter by status |
| GET | `/api/jobs/:id` | Get single job |
| POST | `/api/jobs` | Create new job |
| PATCH | `/api/jobs/:id` | Update job status |
| DELETE | `/api/jobs/:id` | Delete job |

## Features

### Core
- Browse all service requests
- Filter by category and status
- Search by title or description
- Post a new service request with validation
- View full job details
- Update job status (Open / In Progress / Closed)
- Delete a job

### Bonus
- Keyword search across title and description
- Seed script with 8 sample jobs
- Deployed frontend on Vercel
- Deployed backend on Railway

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Server port (default: 5000) |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

## Running Both Apps

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Then open `http://localhost:3000` in your browser.

> **Note:** Backend is hosted on Railway free tier. It may take 30-60 seconds to wake up on first visit.
