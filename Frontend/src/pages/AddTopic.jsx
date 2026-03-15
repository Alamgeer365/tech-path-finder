import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const AddTopic = () => {

  const { domain } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !videoUrl) {
      alert("Please fill all fields");
      return;
    }

    try {

      await API.post("/topics", {
        name,
        videoUrl,
        domainId: domain
      });

      alert("Topic added successfully");

      navigate("/admin");

    } catch (err) {
      console.error(err);
      alert("Failed to create topic");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-10 rounded-xl w-full max-w-lg"
      >

        <h1 className="text-2xl font-bold mb-6">
          Add Topic
        </h1>

        <input
          placeholder="Topic Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-3 bg-gray-800 rounded"
        />

        <input
          placeholder="YouTube Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full mb-6 p-3 bg-gray-800 rounded"
        />

        <button className="bg-indigo-600 px-6 py-2 rounded w-full">
          Create Topic
        </button>

      </form>

    </div>
  );
};

export default AddTopic;
