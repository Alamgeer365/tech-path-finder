import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import API from "../services/api";

const Home = () => {

  const { user } = useContext(AuthContext);
  const [domains, setDomains] = useState([]);

  useEffect(() => {

    const fetchDomains = async () => {
      try {
        const res = await API.get("/domains");
        setDomains(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDomains();

  }, []);

  return (
    <div className="bg-gray-950 text-white">

      {/* HERO SECTION */}

      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">

        <h1 className="text-5xl font-bold max-w-4xl leading-tight">
          Discover Your Tech Career Path
        </h1>

        <p className="text-gray-400 mt-6 max-w-2xl text-lg">
          Explore curated learning paths, watch lectures, and test your
          knowledge with quizzes designed for real-world skills.
        </p>

        <div className="flex gap-6 mt-10">

          {!user ? (
            <>
              <Link
                to="/register"
                className="bg-indigo-600 px-8 py-3 rounded-xl"
              >
                Start Learning
              </Link>

              <Link
                to="/login"
                className="border border-indigo-500 px-8 py-3 rounded-xl"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="bg-indigo-600 px-8 py-3 rounded-xl"
              >
                Go To Dashboard
              </Link>
            </>
          )}

        </div>

      </section>

      {/* FEATURED DOMAINS */}

      <section className="py-20 px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          Popular Learning Paths
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {domains.map((domain) => (

            <Link
              key={domain._id}
              to={`/domain/${domain._id}`}
              className="bg-gray-900 p-8 rounded-xl hover:scale-105 transition"
            >

              <h3 className="text-xl font-semibold mb-3 text-indigo-400">
                {domain.name}
              </h3>

              <p className="text-gray-400">
                {domain.description}
              </p>

            </Link>

          ))}

        </div>

      </section>

      {/* SAMPLE LECTURES */}

      <section className="py-20 px-6 bg-gray-900">

        <h2 className="text-3xl font-bold text-center mb-12">
          Sample Lectures
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <iframe
            className="w-full h-64 rounded-xl"
            src="https://www.youtube.com/embed/UB1O30fR-EE"
            title="HTML Crash Course"
            allowFullScreen
          />

          <iframe
            className="w-full h-64 rounded-xl"
            src="https://www.youtube.com/embed/3PHXvlpOkf4"
            title="JavaScript Basics"
            allowFullScreen
          />

          <iframe
            className="w-full h-64 rounded-xl"
            src="https://www.youtube.com/embed/ZxKM3DCV2kE"
            title="React Intro"
            allowFullScreen
          />

        </div>

      </section>

      {/* CTA */}

      <section className="py-24 text-center">

        <h2 className="text-4xl font-bold mb-6">
          Ready to Start Learning?
        </h2>

        <p className="text-gray-400 mb-8">
          Explore structured tech learning paths today.
        </p>

        <Link
          to="/register"
          className="bg-indigo-600 px-10 py-4 rounded-xl text-lg"
        >
          Start Your Journey
        </Link>

      </section>

    </div>
  );

};

export default Home;
