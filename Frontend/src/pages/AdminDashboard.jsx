import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [domains, setDomains] = useState([]);
  const [topics, setTopics] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchDomains();
    fetchTopics();
    fetchUsers();
  }, []);

  const fetchDomains = async () => {
    try {
      const res = await API.get("/domains");
      setDomains(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTopics = async () => {
    try {
      const res = await API.get("/topics");
      setTopics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDomain = async (id) => {
    if (!window.confirm("Delete this domain?")) return;

    await API.delete(`/domains/${id}`);
    fetchDomains();
  };

  const deleteTopic = async (id) => {
    if (!window.confirm("Delete this topic?")) return;

    await API.delete(`/topics/${id}`);
    fetchTopics();
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await API.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">

      {/* HEADER */}
      <div className="flex justify-between mb-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <button
          onClick={() => navigate("/admin/add-domain")}
          className="bg-indigo-600 px-5 py-2 rounded-lg"
        >
          + Add Domain
        </button>
      </div>

      {/* ================= DOMAINS ================= */}

      <h2 className="text-xl mb-6 text-indigo-400">Domains</h2>

      <div className="grid md:grid-cols-3 gap-8 mb-16">

        {domains.map((domain) => (
          <div
            key={domain._id}
            className="bg-gray-900 border border-gray-800 p-6 rounded-xl"
          >

            <h3 className="text-xl font-semibold mb-2">
              {domain.name}
            </h3>

            <p className="text-gray-400 mb-4">
              {domain.description}
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => navigate(`/admin/add-topic/${domain._id}`)}
                className="bg-green-600 px-3 py-1 rounded"
              >
                Add Topic
              </button>

              <button
                onClick={() => navigate(`/admin/add-quiz/${domain._id}`)}
                className="bg-indigo-600 px-3 py-1 rounded"
              >
                Add Quiz
              </button>

              <button
                onClick={() => deleteDomain(domain._id)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* ================= TOPICS ================= */}

      <h2 className="text-xl mb-6 text-indigo-400">Topics</h2>

      <div className="grid md:grid-cols-3 gap-8 mb-16">

        {topics.map((topic) => (
          <div
            key={topic._id}
            className="bg-gray-900 border border-gray-800 p-6 rounded-xl"
          >

            <h3 className="text-lg font-semibold mb-2">
              {topic.name}
            </h3>

            <p className="text-gray-400 mb-4">
              Domain: {topic.domain?.name || "Unknown"}
            </p>

            <button
              onClick={() => deleteTopic(topic._id)}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Delete Topic
            </button>

          </div>
        ))}

      </div>

      {/* ================= USERS ================= */}

      <h2 className="text-xl mb-6 text-indigo-400">Users</h2>

      <div className="grid md:grid-cols-3 gap-8">

        {users.map((user) => (
          <div
            key={user._id}
            className="bg-gray-900 border border-gray-800 p-6 rounded-xl"
          >

            <h3 className="font-semibold">{user.name}</h3>

            <p className="text-gray-400 mb-3">
              {user.email}
            </p>

            <button
              onClick={() => deleteUser(user._id)}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Delete User
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AdminDashboard;
