import React, { useEffect, useState } from "react";
import axios from "axios";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/users/jobs",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setJobs(response.data.jobs || []);
      } catch (err) {
        setError(
          err.response?.data?.error || "Failed to fetch jobs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-pulse text-lg tracking-wide">
          Loading remote opportunities…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Remote Jobs Explorer
        </h1>
        <p className="text-gray-400 mt-3">
          Curated global remote jobs powered by Remotive
        </p>
      </div>

      {/* Jobs Grid */}
      {jobs.length === 0 ? (
        <p className="text-center text-gray-400">
          No jobs available right now.
        </p>
      ) : (
        <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="
                relative
                bg-white/10
                backdrop-blur-xl
                border border-white/10
                rounded-2xl
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]
              "
            >
              {/* Job Type Badge */}
              <span className="absolute top-4 right-4 text-xs uppercase tracking-wide bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                {job.type}
              </span>

              <h2 className="text-lg font-semibold leading-snug mb-2">
                {job.title}
              </h2>

              <p className="text-sm text-gray-300">
                {job.company}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {job.location}
              </p>

              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-6
                  text-sm
                  font-medium
                  text-blue-400
                  hover:text-blue-300
                  transition
                "
              >
                View Job
                <span className="text-lg">→</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
