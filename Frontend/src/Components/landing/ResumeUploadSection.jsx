import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, AlertCircle, Star, Target, ArrowRight, BookOpen, Clock, ChevronRight, Shield } from "lucide-react";
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
      const response = await axios.post("http://localhost:5000/api/users/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setAnalysisResult(response.data);
    } catch (err) {
      alert("Analysis engine encountered an error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F8FAFC] py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        
        {/* --- DYNAMIC HEADER --- */}
        {!analysisResult && (
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest border border-indigo-100"
            >
              Enterprise Grade AI
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mt-6 tracking-tight">
              Analyze your <span className="text-indigo-600">Career Gap.</span>
            </h1>
            <p className="text-slate-500 mt-4 text-lg max-w-xl mx-auto">
              Upload your professional profile to receive a data-backed analysis of your market readiness.
            </p>
          </div>
        )}

        {/* --- UPLOAD STAGE --- */}
        {!analysisResult && (
          <motion.div layoutId="main-card" className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100 p-2 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Left Side: Upload Zone */}
              <div 
                onClick={() => fileInputRef.current.click()}
                className={`flex-1 group relative rounded-[26px] border-2 border-dashed transition-all p-12 flex flex-col items-center justify-center cursor-pointer
                ${file ? 'border-indigo-500 bg-indigo-50/20' : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50'}`}
              >
                <input ref={fileInputRef} type="file" accept=".pdf,.docx" onChange={handleFileSelect} className="hidden" />
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${file ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'}`}>
                  {file ? <CheckCircle2 className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                </div>
                <p className="text-slate-900 font-bold text-xl">{file ? file.name : "Drop your resume"}</p>
                <p className="text-slate-400 text-sm mt-1">PDF or DOCX supported (Max 5MB)</p>
              </div>

              {/* Right Side: Controls */}
              <div className="w-full md:w-[380px] bg-slate-50 rounded-[26px] p-8 flex flex-col justify-between">
                <div>
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Target Role</label>
                  <select 
                    value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full mt-3 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-sm"
                  >
                    <option value="">Choose Industry Role</option>
                    <option value="frontend">Frontend Engineer</option>
                    <option value="backend">Backend Engineer</option>
                    <option value="fullstack">Full Stack Engineer</option>
                    <option value="ai-engineer">AI / ML Engineer</option>
                  </select>
                  
                  <div className="mt-8 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-indigo-500 mt-0.5" />
                    <p className="text-xs text-slate-500 leading-relaxed">Your data is processed via secure AES-256 encryption and is never stored on our public servers.</p>
                  </div>
                </div>

                <button 
                  onClick={handleSubmit}
                  disabled={!file || !selectedRole || loading}
                  className="w-full mt-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200 disabled:bg-slate-300 disabled:shadow-none active:scale-[0.98]"
                >
                  {loading ? "PROCESSING AI..." : "GENERATE ANALYSIS"}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- RESULTS DASHBOARD --- */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              {/* Dashboard Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <button onClick={() => setAnalysisResult(null)} className="text-indigo-600 font-bold text-sm flex items-center gap-1 mb-2 hover:underline">
                   ← Back to Upload
                  </button>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Analysis Overview</h2>
                </div>
                <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                   <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold">PDF</div>
                   <div>
                     <p className="text-sm font-bold text-slate-900">{file?.name}</p>
                     <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{selectedRole} Track</p>
                   </div>
                </div>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Score Card */}
                <div className="lg:col-span-4 bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-8">Readiness Score</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-8xl font-black tracking-tighter">{analysisResult.job_readiness}</span>
                       <span className="text-2xl text-slate-500 font-bold">/100</span>
                    </div>
                    <p className="mt-8 text-slate-300 leading-relaxed italic border-l-2 border-indigo-500 pl-4">
                      "Your profile shows strong potential for senior roles, but lacks specific cloud-native expertise required by top firms."
                    </p>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-[80px]" />
                </div>

                {/* Skills Distribution */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SkillListCard 
                    title="Verified Competencies" 
                    items={analysisResult.matched_skills} 
                    icon={<CheckCircle2 className="text-emerald-500" />} 
                    color="emerald"
                  />
                  <SkillListCard 
                    title="High-Priority Gaps" 
                    items={analysisResult.missing_skills} 
                    icon={<AlertCircle className="text-rose-500" />} 
                    color="rose"
                  />
                </div>
              </div>

              {/* Roadmap Section */}
              <div className="bg-white rounded-[32px] border border-slate-200 p-10 shadow-sm">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Personalized Learning Roadmap</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {analysisResult.skill_roadmap?.map((step, i) => (
                    <div key={i} className="group bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all p-6 rounded-2xl border border-transparent hover:border-slate-100">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-white rounded-lg text-[10px] font-black uppercase text-indigo-600 border border-slate-100 shadow-sm">{step.skill}</span>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                      </div>
                      <p className="font-bold text-slate-900 mb-2">{step.resource}</p>
                      <div className="flex items-center gap-3 text-slate-400 text-xs font-bold">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {step.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

/* --- SUB-COMPONENTS --- */

const SkillListCard = ({ title, items, icon, color }) => (
  <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
    <div className="flex items-center gap-2 mb-6">
      {icon}
      <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm">{title}</h4>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.length > 0 ? items.map((s, i) => (
        <span key={i} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors
          ${color === 'emerald' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
          {s}
        </span>
      )) : <p className="text-slate-400 text-sm">No items found.</p>}
    </div>
  </div>
);

export default ResumeUploadSection;