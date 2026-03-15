import { useLocation, useNavigate } from "react-router-dom";

const ScoreCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    score = 0,
    totalQuestions = 0,
    percentage = 0,
  } = location.state || {};

  let feedback = "";

  if (percentage >= 80) feedback = "Excellent";
  else if (percentage >= 50) feedback = "Good";
  else feedback = "Needs Improvement";

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center text-center">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-10 max-w-md">
        <h1 className="text-3xl font-bold mb-6">Quiz Result</h1>

        <p className="text-xl mb-3">
          Score: {score} / {totalQuestions}
        </p>

        <p className="text-4xl font-bold text-indigo-400 mb-4">
          {percentage}%
        </p>

        <p className="mb-6">{feedback}</p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-indigo-600 px-6 py-2 rounded"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ScoreCard;
