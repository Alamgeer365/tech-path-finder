import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";

const QuizPage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get(`/questions/topic/${topicId}`);
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuestions();
  }, [topicId]);

  const handleNext = async () => {
    const updatedAnswers = [
      ...answers,
      {
        questionId: questions[current]._id,
        selectedOption: selected,
      },
    ];
    setAnswers(updatedAnswers);

    setSelected(null);
    setTimeLeft(30);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      try {
        const res = await API.post("/quiz/submit", {
          topicId,
          answers: updatedAnswers,
        });

        navigate(`/score/${topicId}`, {
          state: res.data,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (!started || !questions.length) return;

    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, started, questions.length]);

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        No Quiz Available
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-6">Quiz</h1>

        <p className="text-gray-400 mb-4">
          {questions.length} Questions, 30 Seconds Each
        </p>

        <button
          onClick={() => setStarted(true)}
          className="bg-indigo-600 px-8 py-3 rounded-xl"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  const question = questions[current];
  const timeProgress = (timeLeft / 30) * 100;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-10 py-10">
      <div className="flex justify-between mb-4">
        <h1>
          Question {current + 1} / {questions.length}
        </h1>
        <span className="text-red-400">{timeLeft}s</span>
      </div>

      <div className="w-full bg-gray-800 h-2 mb-6 rounded">
        <div
          className="bg-red-500 h-2 rounded"
          style={{ width: `${timeProgress}%` }}
        />
      </div>

      <div className="bg-gray-900 p-8 rounded-xl max-w-3xl mx-auto">
        <h2 className="text-xl mb-6">{question.question}</h2>

        <div className="space-y-4">
          {question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full text-left p-3 rounded ${
                selected === i ? "bg-indigo-600" : "bg-gray-800"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-8 text-right">
          <button
            disabled={selected === null}
            onClick={handleNext}
            className="bg-indigo-600 px-6 py-2 rounded disabled:opacity-50"
          >
            {current + 1 === questions.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
