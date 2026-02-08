import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Target, BarChart3, Briefcase } from "lucide-react";
import AuthButton from "../AuthButton.jsx";

const HeroSection = () => {
  const Token = localStorage.getItem("Token");
  const navigator = useNavigate();

  const islogin = () => {
    if (Token) navigator("/Analyze");
    else navigator("/login");
  };

  const SeeJob = () => {
    if (Token) navigator("/JobList");
    else navigator("/login");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-28 overflow-hidden bg-[#fafafa]">
      {/* --- PROFESSIONAL BACKGROUND ARCHITECTURE --- */}
      <div className="absolute inset-0 z-0">
        {/* Fine-tuned subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
        
        {/* Soft, realistic depth orbs (Slate & Steel Blue) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px]" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* --- TAGLINE --- */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <span className="text-[13px] font-semibold text-slate-600 tracking-wide uppercase">
            AI-Powered Career Intelligence
          </span>
        </motion.div>

        {/* --- HEADLINE --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-[80px] font-bold tracking-tight text-slate-900 leading-[0.95] mb-8">
            Bridge the gap between <br />
            <span className="text-indigo-600 italic font-serif">your potential</span> & your dream job.
          </h1>
        </motion.div>

        {/* --- SUBTEXT --- */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-2xl text-lg text-slate-500 mb-12 leading-relaxed"
        >
          Our precision AI engine analyzes your professional profile against current market benchmarks, identifying critical skill gaps and surfacing optimized career opportunities.
        </motion.p>

        {/* --- ACTION AREA --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 p-2 bg-white/40 backdrop-blur-md rounded-2xl border border-white shadow-xl shadow-slate-200/50"
        >
          <AuthButton 
            variant="primary" 
            className="w-full sm:w-56 h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
            onClick={islogin}
          >
            <BarChart3 className="w-4 h-4" />
            Analyze Resume
          </AuthButton>

          <AuthButton 
            variant="secondary" 
            className="w-full sm:w-56 h-14 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-sm"
            onClick={SeeJob}
          >
            <Briefcase className="w-4 h-4 text-slate-500" />
            Explore Jobs
          </AuthButton>
        </motion.div>

        {/* --- REALISTIC METRICS BARS --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-200 pt-12"
        >
          <div className="flex flex-col items-center md:items-start">
            <Target className="w-5 h-5 text-indigo-600 mb-3" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Precision Matching</h3>
            <p className="text-xs text-slate-400 mt-1">Semantic analysis for ATS optimization.</p>
          </div>
          <div className="flex flex-col items-center md:items-start border-x-0 md:border-x border-slate-200 md:px-12">
            <Sparkles className="w-5 h-5 text-indigo-600 mb-3" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Skill Gap Discovery</h3>
            <p className="text-xs text-slate-400 mt-1">Identify and bridge missing competencies.</p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <BarChart3 className="w-5 h-5 text-indigo-600 mb-3" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Market Insights</h3>
            <p className="text-xs text-slate-400 mt-1">Real-time demand forecasting for your role.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;