import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FileText, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const JobListSection = () => {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzingJobId, setAnalyzingJobId] = useState(null);
  const [popupData, setPopupData] = useState(null); // For modal popup
  const fileInputRef = useRef(null);

  // Fetch jobs from backend
useEffect(() => {
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/users/jobs");
      console.log(res.data); // check what API returns
      setJobs(Array.isArray(res.data) ? res.data : res.data.jobs || []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoadingJobs(false);
    }
  };
  fetchJobs();
}, []);

  // Resume upload handler
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  // Analyze job readiness
  const analyzeJobReadiness = async (job) => {
    if (!selectedFile) {
      alert("Please upload your resume first!");
      return;
    }

    setAnalyzingJobId(job.title);

    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);
      formData.append("target_job_title", job.title); // send job title to backend

      const response = await axios.post(
        "http://localhost:5000/api/users/analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Show popup with results
      setPopupData({
        jobTitle: job.title,
        jobReadiness: response.data.job_readiness,
        missingSkills: response.data.missing_skills || [],
      });
    } catch (err) {
      console.error(err);
      alert("Analysis failed!");
    } finally {
      setAnalyzingJobId(null);
    }
  };

  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Job Listings
          </h2>
          <p className="text-gray-400 mt-2">
            Upload your resume and check if you are ready for these jobs
          </p>
        </div>

        {/* Resume Upload */}
        <div className="text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-white/20 rounded-2xl p-8 cursor-pointer hover:border-blue-400 inline-block"
          >
            <FileText className="w-10 h-10 mx-auto text-gray-400 mb-2" />
            {selectedFile ? (
              <p>{selectedFile.name}</p>
            ) : (
              <p className="text-gray-400">Click to upload PDF / DOCX</p>
            )}
          </div>
        </div>

        {/* Jobs List */}
        {loadingJobs ? (
          <p className="text-center text-gray-400">Loading jobs...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <motion.div
                key={job.title + job.company}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 border border-white/10 rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                    <h3 className="text-xl font-bold">{job.title}</h3>
                  </div>
                  <p className="text-gray-400">{job.company}</p>
                  <p className="text-gray-400">{job.location}</p>
                  <p className="text-gray-400">{job.type}</p>
                  <a
                    href={job.url}
                    target="_blank"
                    className="text-blue-400 hover:underline text-sm mt-1 inline-block"
                  >
                    View Job
                  </a>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => analyzeJobReadiness(job)}
                    disabled={analyzingJobId === job.title}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold disabled:opacity-50 w-full"
                  >
                    {analyzingJobId === job.title
                      ? "Analyzing..."
                      : "Analyze Job Readiness"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Popup Modal */}
        {popupData && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-2xl p-8 max-w-md w-full space-y-4">
              <h2 className="text-2xl font-bold">
                {popupData.jobTitle} Analysis
              </h2>
              <p>
                Status:{" "}
                <span
                  className={
                    popupData.jobReadiness === "Job Ready"
                      ? "text-green-500 font-bold"
                      : "text-red-500 font-bold"
                  }
                >
                  {popupData.jobReadiness}
                </span>
              </p>
              {popupData.missingSkills.length > 0 && (
                <div>
                  <p className="font-semibold mt-2">Skills:</p>
                  <ul className="list-disc list-inside text-gray-700">
                    {popupData.missingSkills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="text-right">
                <button
                  onClick={() => setPopupData(null)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-xl mt-4"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListSection;
