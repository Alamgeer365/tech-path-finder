import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const DomainPage = () => {
  const { domain } = useParams();
  const navigate = useNavigate();

  const [domainData, setDomainData] = useState(null);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchDomain = async () => {
      try {
        const res = await API.get(`/domains/${domain}`);
        setDomainData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTopics = async () => {
      try {
        const res = await API.get(`/topics/domain/${domain}`);
        setTopics(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDomain();
    fetchTopics();
  }, [domain]);

  if (!domainData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-3">{domainData.name}</h1>

      <p className="text-gray-400 mb-10">{domainData.description}</p>

      <div className="grid md:grid-cols-3 gap-8">
        {topics.map((topic) => (
          <div
            key={topic._id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-3">{topic.name}</h3>

            <button
              onClick={() => navigate(`/quiz/${topic._id}`)}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainPage;
