import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const AddQuiz = () => {

  const { domain } = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [topicId, setTopicId] = useState("");

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await API.get(`/topics/domain/${domain}`);
      setTopics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!topicId) {
      alert("Please select a topic");
      return;
    }

    try {

      await API.post("/questions", {
        topicId,
        question,
        options,
        correctAnswer
      });

      alert("Question added successfully");

      navigate("/admin");

    } catch (err) {
      console.error(err);
    }

  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-10 rounded-xl w-full max-w-lg"
      >

        <h1 className="text-2xl font-bold mb-6">
          Add Quiz Question
        </h1>

        <select
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
          className="w-full mb-4 p-3 bg-gray-800 rounded"
        >

          <option value="">Select Topic</option>

          {topics.map((topic) => (
            <option key={topic._id} value={topic._id}>
              {topic.name}
            </option>
          ))}

        </select>

        <input
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full mb-4 p-3 bg-gray-800 rounded"
        />

        {options.map((opt, i) => (
          <input
            key={i}
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(e.target.value, i)}
            className="w-full mb-3 p-3 bg-gray-800 rounded"
          />
        ))}

        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(Number(e.target.value))}
          className="w-full mb-6 p-3 bg-gray-800 rounded"
        >
          <option value={0}>Option 1</option>
          <option value={1}>Option 2</option>
          <option value={2}>Option 3</option>
          <option value={3}>Option 4</option>
        </select>

        <button className="bg-indigo-600 px-6 py-2 rounded w-full">
          Add Question
        </button>

      </form>

    </div>
  );
};

export default AddQuiz;
