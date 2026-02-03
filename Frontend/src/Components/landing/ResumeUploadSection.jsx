import { motion } from "framer-motion";
import { Upload, FileText, Lock, CheckCircle, AlertTriangle, Star } from "lucide-react";
import { useRef, useState } from "react";
import axios from "axios";

const ResumeUploadSection = () => {
  const fileInputRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file || !selectedRole) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("target_role", selectedRole);

      const response = await axios.post(
        "http://localhost:5000/api/users/analyze",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setAnalysisResult(response.data);
    } catch (err) {
      alert("Resume analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-28 px-4 bg-black text-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-10"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <FileText className="w-10 h-10 text-blue-400" />
            </div>
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AI Resume Analyzer
            </h2>
            <p className="text-gray-400 mt-4">
              Upload your resume and unlock AI-powered insights
            </p>
          </div>

          {/* Role Select */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full md:w-2/3 mx-auto block px-4 py-3 mb-6 rounded-xl bg-black/40 border border-white/10"
          >
            <option value="">Select Target Role</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="fullstack">Full Stack Developer</option>
            <option value="data-scientist">Data Scientist</option>
            <option value="ai-engineer">AI / ML Engineer</option>
          </select>

          {/* Upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-white/20 rounded-2xl p-10 text-center cursor-pointer hover:border-blue-400"
          >
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            {file ? <p>{file.name}</p> : <p className="text-gray-400">Click to upload PDF / DOCX</p>}
          </div>

          {/* Submit */}
          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              disabled={!file || !selectedRole || loading}
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>

          {/* Result */}
          {analysisResult && analysisResult.status === "success" && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-16 space-y-12">
              {/* Job Readiness */}
              <Stat label="Job Readiness" value={analysisResult.job_readiness} />

              {/* Matched Skills */}
              <SkillSection title="Matched Skills" data={analysisResult.matched_skills} icon={<CheckCircle />} />

              {/* Missing Skills */}
              <SkillSection
                title="Missing Skills"
                data={analysisResult.missing_skills}
                icon={<AlertTriangle />}
                emptyText="No missing skills 🎉"
              />

              {/* Best Fit Roles */}
              <SkillSection title="Best Fit Roles" data={analysisResult.best_fit_jobs} icon={<Star />} />

              {/* Skill Roadmap */}
              {analysisResult.skill_roadmap && analysisResult.skill_roadmap.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Skill Roadmap</h3>
                  <ul className="space-y-3 text-gray-300">
                    {analysisResult.skill_roadmap.map((item, i) => (
                      <li key={i}>
                        • <strong>{item.skill}</strong>: {item.resource} ({item.duration})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          <div className="flex justify-center gap-2 mt-10 text-sm text-gray-400">
            <Lock className="w-4 h-4" />
            Secure & Encrypted
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ---------- Helper Components ---------- */

const Stat = ({ label, value }) => (
  <div className="bg-black/40 border border-white/10 rounded-2xl p-6 text-center">
    <p className="text-gray-400 mb-2">{label}</p>
    <p className="text-3xl font-bold text-blue-400">{value}</p>
  </div>
);

const SkillSection = ({ title, data, icon, emptyText }) => (
  <div>
    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
      {icon} {title}
    </h3>
    {data.length === 0 ? (
      <p className="text-gray-400">{emptyText}</p>
    ) : (
      <div className="flex flex-wrap gap-3">
        {data.map((skill, i) => (
          <span key={i} className="px-4 py-2 rounded-full bg-white/10 border border-white/10">
            {skill}
          </span>
        ))}
      </div>
    )}
  </div>
);

export default ResumeUploadSection;
