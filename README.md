# Timesheet Corporate Product

A full-fledged timesheet management system inspired by Clockify.

## Project Structure

- `frontend/`: React + Vite + Tailwind CSS application.
- `backend/`: Node.js + Express API (Firebase ready).

## Getting Started

### Both (Frontend & Backend)
Run this from the **root** folder:
1. `npm install`
2. `npm run install:all`
3. `npm run dev`

This starts:
- Frontend: `http://127.0.0.1:3000`
- Backend API: `http://127.0.0.1:5000`

Stop both with `Ctrl+C`.

You can also use `npm start`; it runs the same full-stack launcher.

## Demo Logins

- Admin: `admin@company.com` / `admin123`
- Employee: `employee@company.com` / `employee123`

The Admin account can access team management, approvals, projects, tasks, reports, clients, tags, schedule, kiosks, activity, and settings.
The Employee account can access time tracking, assigned tasks, own timesheet, calendar, time off, expenses, activity, and settings.

### Frontend
1. `npm run dev:frontend`

### Backend
1. `npm run dev:backend`

## Firebase Integration
The backend is pre-configured to use Firestore through the Firebase Admin SDK.

To connect locally:
1. Create a Firebase project at https://console.firebase.google.com.
2. In Project Settings, go to Service Accounts and generate a new private key.
3. Save the downloaded JSON file.
4. Create `backend/.env` and add:
   - `PORT=5000`
   - `FIREBASE_SERVICE_ACCOUNT='<JSON content>'`
   - `FIREBASE_DATABASE_URL=https://<your-project-id>.firebaseio.com`

If `FIREBASE_SERVICE_ACCOUNT` is missing, the backend will fall back to the in-memory demo database.

### Deploying frontend + backend on Vercel
Your project already includes `vercel.json` for a Vercel multi-service deployment.

For the frontend, set this environment variable in Vercel:
- `VITE_API_URL=/_/backend/api`

For the backend, set these environment variables in Vercel:
- `FIREBASE_SERVICE_ACCOUNT` (the full JSON string from the service account key)
- `FIREBASE_DATABASE_URL` (optional, but recommended)
- `PORT=5000` (optional)

Then deploy the Vercel project again. The frontend will call the backend at:
`https://<your-vercel-domain>/_/backend/api`

### Important notes
- Do not commit `backend/.env` or service account JSON to Git.
- Use Vercel Environment Variables for secrets.
- The backend API endpoints are available under `/_/backend/api/*` in production.
