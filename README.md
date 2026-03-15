# Tech Path Finder

Tech Path Finder is a full-stack learning platform that helps users explore technology domains, watch topic-based video lessons, take quizzes, and track learning progress through analytics. It combines a React-based learner experience with an Express and MongoDB backend that supports authentication, role-based admin actions, content management, and quiz performance reporting.

## Why this project matters

Most beginner learning platforms stop at static content. Tech Path Finder is designed as an interactive product:

- learners can browse curated domains and drill down into topic-level content
- each topic can include a video resource and quiz questions
- users can submit quiz attempts and review their performance over time
- admins can manage domains, topics, and quiz content from the application

This makes the project closer to a real product workflow than a basic CRUD demo.

## Core capabilities

- JWT-based authentication with protected routes
- role-based access control for admin-only content management
- domain, topic, and question management APIs
- quiz submission flow with score and percentage calculation
- learner analytics dashboard for quiz history and performance trends
- responsive React frontend with route-based navigation
- REST API architecture using Express and MongoDB

## Product walkthrough

### Student experience

- register and log in
- explore available tech domains from the home page
- open a domain to see its learning topics
- launch a quiz for a selected topic
- view score feedback after submission
- track quiz history and performance insights from the profile page

### Admin experience

- create new learning domains
- add topics to a domain
- attach quiz questions to a topic
- remove outdated domains, topics, and questions

## Tech stack

### Frontend

- React 19
- React Router 7
- Vite
- Tailwind CSS 4
- Axios

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs
- dotenv

## Architecture

```text
Frontend (React + Vite)
  -> Axios API client
  -> Express REST API
  -> MongoDB via Mongoose
```

### Backend modules

- `auth`: registration, login, current-user lookup
- `domains`: public listing and admin-managed creation/deletion
- `topics`: public topic retrieval by domain and admin-managed topic creation/deletion
- `questions`: public quiz question retrieval by topic and admin-managed question creation/deletion
- `quiz`: quiz submission and user attempt history
- `analytics`: user progress and average-score reporting

## Repository structure

```text
Tech-Path-Finder/
|-- Backend/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- package.json
|   `-- server.js
|-- Frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |   `-- services/
|   `-- package.json
|-- start-backend.cmd
|-- start-frontend.cmd
`-- start-project.cmd
```

## Environment variables

Copy `Backend/.env.example` to `Backend/.env` and update the values for your environment:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

The `.env` file is intentionally excluded from source control.

## Local setup

### 1. Clone the repository

```bash
git clone https://github.com/Alamgeer365/tech-path-finder.git
cd tech-path-finder
```

### 2. Install dependencies

```bash
cd Backend
npm install
```

```bash
cd Frontend
npm install
```

### 3. Start the application

Backend:

```bash
cd Backend
npm run dev
```

Frontend:

```bash
cd Frontend
npm run dev
```

You can also use the helper scripts in the repo root on Windows:

```bash
start-backend.cmd
start-frontend.cmd
start-project.cmd
```

## API overview

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

- `GET /api/topics/domain/:domainId`
- `POST /api/topics`
- `DELETE /api/topics/:id`

### Questions

- `GET /api/questions/topic/:topicId`
- `POST /api/questions`
- `DELETE /api/questions/:id`

### Quiz and analytics

- `POST /api/quiz/submit`
- `GET /api/quiz/my-attempts`
- `GET /api/analytics/progress`

Protected and admin-only routes require a valid bearer token.

## Engineering highlights

- separated frontend and backend for clearer ownership and scalability
- organized backend by controller, model, middleware, and route responsibilities
- reusable Axios client with auth token injection
- persistent quiz-attempt storage to support analytics instead of only temporary UI scoring
- role-aware workflow that supports both learner and administrator use cases

## Current scope

This repository is focused on core product functionality: authentication, content delivery, quiz workflows, and learning analytics. It is a strong foundation for extending into recommendations, progress-based roadmaps, certificates, or deployment automation.

## Author

**Alamgeer Shekh**

- GitHub: [Alamgeer365](https://github.com/Alamgeer365)
