# Tech Path Finder

Tech Path Finder is a full-stack MERN learning platform that helps students explore curated tech domains, study topic-based video lectures, and reinforce learning with timed MCQ quizzes.

## What The App Does

- Browse learning domains such as web development or other admin-created tracks
- Open a domain and study topic-by-topic through embedded lecture videos
- Attempt timed quizzes for each topic
- Track quiz history and performance in a learner dashboard
- Get personalized next-step recommendations based on quiz attempts
- Manage domains, topics, quizzes, and users from an admin panel

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JWT authentication

## Project Structure

```text
Tech-Path-Finder/
|-- Frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |   `-- services/
|   `-- .env.example
|-- Backend/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- server.js
|   `-- .env.example
>>>>>>> eafb4e7 (Update project setup and access controls)
|-- start-backend.cmd
|-- start-frontend.cmd
`-- start-project.cmd
```

## Features

### Student Features

- Create an account and log in
- Explore all available learning paths
- Watch lecture videos inside the topic page
- Take timed quiz questions for each topic
- See score cards after quiz submission
- View quiz history and progress insights
- Receive personalized recommendations for what to study next

### Admin Features

- Create and delete domains
- Add and delete topics
- Add quiz questions to topics
- View registered users
- Delete users from the admin dashboard
- Restrict admin pages to authenticated admin accounts

## Recent Improvements

- Added environment-based frontend API configuration using `VITE_API_URL`
- Protected learner-only and admin-only routes more safely
- Added missing backend user management endpoints for the admin dashboard
- Added example environment files for easier setup
- Rewrote the root README to match the actual project behavior

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Alamgeer365/tech-path-finder.git
cd tech-path-finder
```

### 2. Install dependencies

```bash
cd Backend
npm install
cd ..
cd Frontend
npm install
```

### 3. Configure environment variables

Create these files from the included examples:

- `Backend/.env`
- `Frontend/.env`

Backend example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_secure_secret
```

Frontend example:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Run the backend

```bash
cd Backend
npm run dev
```

### 5. Run the frontend

```bash
cd Frontend
npm run dev
```

The frontend usually runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

## Available Scripts

### Frontend

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production build
- `npm run lint` runs ESLint
- `npm run preview` previews the production build locally

### Backend

- `npm run dev` starts the backend with nodemon
- `npm start` starts the backend with Node

## API Overview

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Domains

- `GET /api/domains`
- `GET /api/domains/:id`
- `POST /api/domains`
- `DELETE /api/domains/:id`

### Topics

- `GET /api/topics`
- `GET /api/topics/domain/:domainId`
- `POST /api/topics`
- `DELETE /api/topics/:id`

### Questions

- `GET /api/questions/topic/:topicId`
- `POST /api/questions`
- `DELETE /api/questions/:id`

### Quiz And Analytics

- `POST /api/quiz/submit`
- `GET /api/quiz/my-attempts`
- `GET /api/analytics/progress`
- `GET /api/analytics/recommendation`

### Users

- `GET /api/users`
- `DELETE /api/users/:id`

## Notes

- Admin routes require a valid JWT and an `admin` role
- Learner progress depends on quiz attempts stored in MongoDB
- Environment files are ignored by Git, so use the example files for sharing setup

## Future Ideas

- Add edit/update support for domains, topics, and quiz questions
- Add search and filtering for learning paths
- Add topic ordering and completion tracking
- Add unit and integration tests
- Deploy frontend and backend with separate production environment configs
