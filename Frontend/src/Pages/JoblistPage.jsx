import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { 
  Briefcase, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  X, 
  Target, 
  BarChart3, 
  ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const JobListSection = () => {
  // 1. All Hooks at the top
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzingJobId, setAnalyzingJobId] = useState(null);
  const [popupData, setPopupData] = useState(null);
  
  // FIX: Ensure this is defined before it's used in the return block
  const fileInputRef = useRef(null);

  // 2. Fetch Jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/users/jobs");
        setJobs(Array.isArray(res.data) ? res.data : res.data.jobs || []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobs();
  }, []);

  // 3. Handle File Selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  // 4. Analysis Logic
  const analyzeJobReadiness = async (job) => {
    if (!selectedFile) {
      alert("Please upload your resume first!");
      return;
    }

    setAnalyzingJobId(job.title);
    
    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);
      // Key must match Python's request.form.get("target_role")
      formData.append("target_role", job.title); 

      const response = await axios.post(
        "http://localhost:5000/api/users/analyze",
        formData,
        { 
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 45000 // Extended timeout for AI processing
        }
      );

      setPopupData({
        jobTitle: job.title,
        jobReadiness: response.data.job_readiness,
        matchScore: response.data.match_score,
        semanticSim: response.data.semantic_similarity,
        missingSkills: response.data.missing_skills || [],
        roadmap: response.data.skill_roadmap || []
      });

    } catch (err) {
      console.error("Analysis Error:", err);
      const msg = err.response?.data?.message || "Analysis failed. Ensure backend is running.";
      alert(msg);
    } finally {
      setAnalyzingJobId(null);
    }
  };

  return (
    <section className="min-h-screen bg-[#fafafa] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Market <span className="text-indigo-600">Opportunities</span>
          </h2>
          <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
            Benchmark your profile against live industry roles and discover exactly what skills you need.
          </p>
        </div>

        {/* --- UPLOAD ZONE --- */}
        <div className="mb-12">
          {/* hidden input correctly using the ref */}
          <input 
            ref={fileInputRef} 
            type="file" 
            accept=".pdf,.docx" 
            onChange={handleFileSelect} 
            className="hidden" 
          />
          <motion.div
            whileHover={{ y: -2 }}
            onClick={() => fileInputRef.current.click()}
            className={`relative group border-2 border-dashed rounded-[32px] p-10 cursor-pointer transition-all text-center
              ${selectedFile ? 'border-indigo-400 bg-indigo-50/30' : 'border-slate-200 bg-white hover:border-indigo-400'}`}
          >
            <div className="flex flex-col items-center">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 
                ${selectedFile ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                <UploadCloud className="w-7 h-7" />
              </div>
              {selectedFile ? (
                <div>
                  <p className="text-slate-900 font-bold text-lg">{selectedFile.name}</p>
                  <p className="text-indigo-600 text-xs font-black uppercase tracking-widest mt-1">File Uploaded</p>
                </div>
              ) : (
                <>
                  <p className="text-slate-900 font-bold text-lg">Upload Resume to Analyze</p>
                  <p className="text-slate-500 text-sm mt-1">Click to browse (PDF, DOCX)</p>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* --- JOBS GRID --- */}
        {loadingJobs ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-slate-200 rounded-[24px] p-7 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                    <Briefcase className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight">{job.title}</h3>
                <p className="text-slate-500 font-medium text-sm mb-6">{job.company} • {job.location}</p>

                <div className="flex gap-3 pt-6 border-t border-slate-50 mt-auto">
                  <button
                    onClick={() => analyzeJobReadiness(job)}
                    disabled={analyzingJobId === job.title}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold py-3.5 rounded-xl transition-all"
                  >
                    {analyzingJobId === job.title ? "Analyzing..." : "Check Readiness"}
                  </button>
                  <a href={job.url} target="_blank" rel="noreferrer" className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-indigo-600 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- MODAL POPUP --- */}
        <AnimatePresence>
          {popupData && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                onClick={() => setPopupData(null)} 
                className="fixed inset-0 bg-slate-900/80 backdrop-blur-md" 
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-white rounded-[40px] shadow-2xl max-w-2xl w-full p-10 overflow-hidden"
              >
                <div className="flex justify-between mb-8">
                   <h2 className="text-2xl font-black text-slate-900">{popupData.jobTitle}</h2>
                   <button onClick={() => setPopupData(null)}><X className="text-slate-400" /></button>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-slate-900 rounded-3xl p-6 text-white text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-2">Match Score</p>
                    <div className="text-5xl font-black mb-2">{popupData.matchScore}</div>
                    <div className="text-[10px] font-bold py-1 px-3 bg-white/10 rounded-full inline-block">
                      {popupData.jobReadiness}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                       <span className="text-xs font-bold text-slate-500">Semantic Sim</span>
                       <span className="font-black text-indigo-600">{Math.round(popupData.semanticSim * 100)}%</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                       <span className="text-xs font-bold text-slate-500">Skills Needed</span>
                       <span className="font-black text-slate-900">{popupData.missingSkills.length}</span>
                    </div>
                  </div>
                </div>

                {popupData.roadmap.length > 0 && (
                  <div className="mb-8">
                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4">Priority Roadmap</p>
                    <div className="space-y-2">
                      {popupData.roadmap.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl">
                          <span className="text-sm font-bold text-slate-700">{item.skill}</span>
                          <span className="text-[10px] font-black text-indigo-500 uppercase">{item.timeframe}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => setPopupData(null)}
                  className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl"
                >
                  Close Analysis
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default JobListSection;