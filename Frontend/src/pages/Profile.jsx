import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import API from "../services/api";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [analytics, setAnalytics] = useState(null);

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

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  const { totalQuizzes, averageScore, attempts } = analytics;

  let bestDomain = null;
  let weakestDomain = null;

  attempts.forEach((a) => {
    if (!bestDomain || a.percentage > bestDomain.percentage) {
      bestDomain = a;
    }

    if (!weakestDomain || a.percentage < weakestDomain.percentage) {
      weakestDomain = a;
    }
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 md:px-12 py-10">
      <div className="mb-12">
        <h1 className="text-3xl font-bold">
          {user?.name || "Student"}'s Profile
        </h1>

        <p className="text-gray-400 mt-2">
          Track your quiz performance and strengths
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <StatCard title="Total Quizzes Attempted" value={totalQuizzes} />

        <StatCard
          title="Average Score"
          value={`${Math.round(averageScore)}%`}
        />

        <StatCard
          title="Strongest Domain"
          value={bestDomain?.topic?.name || "N/A"}
        />
      </div>

      {weakestDomain && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-semibold mb-4 text-indigo-400">
            Performance Insight
          </h2>

          <p className="text-gray-300">
            Needs improvement in{" "}
            <span className="text-red-400 font-semibold">
              {weakestDomain.topic?.name}
            </span>{" "}
            ({Math.round(weakestDomain.percentage)}%)
          </p>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold mb-6">Quiz Attempts</h2>

        {attempts.length === 0 && (
          <p className="text-gray-400">No quizzes attempted yet.</p>
        )}

        <div className="space-y-6">
          {attempts.map((a) => (
            <div
              key={a._id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6"
            >
              <div className="flex justify-between mb-3">
                <h3 className="text-lg font-semibold">
                  {a.topic?.name || "Topic"}
                </h3>

                <span className="text-indigo-400 font-semibold">
                  {a.score} / {a.totalQuestions}
                </span>
              </div>

              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${a.percentage}%` }}
                />
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Attempted on {new Date(a.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
    <p className="text-gray-400 text-sm">{title}</p>
    <h2 className="text-3xl font-bold mt-2 text-indigo-400">{value}</h2>
  </div>
);

export default Profile;
