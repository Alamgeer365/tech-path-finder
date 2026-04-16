import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DomainPage from "./pages/DomainPage";
import QuizPage from "./pages/QuizPage";
import ScoreCard from "./pages/ScoreCard";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/AdminDashboard";
import AddDomain from "./pages/AddDomain";
import AddQuiz from "./pages/AddQuize";
import AddTopic from "./pages/AddTopic";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  useEffect(() => {
    document.title = "Tech Path Finder";
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/domain/:domain" element={<DomainPage />} />

        <Route
          path="/quiz/:topicId"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/score/:topicId"
          element={
            <ProtectedRoute>
              <ScoreCard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-domain"
          element={
            <ProtectedRoute adminOnly>
              <AddDomain />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-topic/:domain"
          element={
            <ProtectedRoute adminOnly>
              <AddTopic />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/add-quiz/:domain"
          element={
            <ProtectedRoute adminOnly>
              <AddQuiz />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
