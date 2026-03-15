import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/auth-context";

const Dashboard = () => {

  const [analytics, setAnalytics] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ============================= */
  /* REDIRECT ADMIN */
  /* ============================= */

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  /* ============================= */
  /* FETCH ANALYTICS */
  /* ============================= */

  useEffect(() => {

    const fetchAnalytics = async () => {
      try {

        const res = await API.get("/analytics/progress");

        setAnalytics(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchAnalytics();

  }, []);

  /* ============================= */
  /* LOADING STATE */
  /* ============================= */

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        Loading dashboard...
      </div>
    );
  }

  /* ============================= */
  /* DASHBOARD UI */
  /* ============================= */

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">

      <h1 className="text-3xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        <StatCard
          title="Quizzes Attempted"
          value={analytics.totalQuizzes}
        />

        <StatCard
          title="Average Score"
          value={`${Math.round(analytics.averageScore)}%`}
        />

        <StatCard
          title="Attempts"
          value={analytics.attempts.length}
        />

      </div>

    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">

    <p className="text-gray-400">
      {title}
    </p>

    <h2 className="text-2xl font-bold text-indigo-400">
      {value}
    </h2>

  </div>
);

export default Dashboard;