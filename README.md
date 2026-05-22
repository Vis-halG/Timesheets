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
The backend is pre-configured with placeholders for the Firebase Admin SDK. To connect:
1. Create a Firebase project.
2. Generate a Service Account key (JSON).
3. Add the JSON content to your `backend/.env` under `FIREBASE_SERVICE_ACCOUNT`.
