const QuizAttempt = require("../models/QuizAttempt");

/* ========================= */
/* USER PROGRESS */
/* ========================= */

exports.getUserProgress = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({
      user: req.user._id,
    }).populate("topic");

    const totalQuizzes = attempts.length;

    let averageScore = 0;

    if (totalQuizzes > 0) {
      averageScore =
        attempts.reduce((acc, a) => acc + a.percentage, 0) /
        totalQuizzes;

      averageScore = Number(averageScore.toFixed(2));
    }

    res.json({
      totalQuizzes,
      averageScore,
      attempts,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};