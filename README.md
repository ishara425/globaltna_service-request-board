## Setup Instructions

### Backend
cd backend
npm install
cp .env.example .env
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## Environment Variables

### Backend (backend/.env)
MONGO_URI=your_mongodb_connection_string
PORT=5000

### Frontend (frontend/.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000

## Live URLs
Frontend: https://globaltna-frontend.vercel.app
Backend: https://globaltnaservice-request-board-production.up.railway.app
