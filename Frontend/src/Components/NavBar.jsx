import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogIn, ChevronRight } from 'lucide-react';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");

  const handleProfileClick = () => {
    if (token) {
      navigate("/Profile");
    } else {
      navigate("/Login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        
        {/* --- LOGO --- */}
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
          >
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-slate-900 font-bold text-lg tracking-tight">
              Resume<span className="text-indigo-600">AI</span>
            </span>
          </Link>

          {/* --- OPTIONAL: HIDDEN LINKS FOR PROF. LOOK --- */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
            <Link to="/Analyze" className="hover:text-slate-900 transition-colors">Analyzer</Link>
            <Link to="/JobList" className="hover:text-slate-900 transition-colors">Job Board</Link>
          </div>
        </div>

        {/* --- AUTH SECTION --- */}
        <div className="flex items-center gap-4">
          {token ? (
            /* USER LOGGED IN: Profile Avatar */
            <button 
              onClick={handleProfileClick}
              className="flex items-center gap-2 p-1 pr-3 rounded-full border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                <img 
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600">
                Account
              </span>
            </button>
          ) : (
            /* USER NOT LOGGED IN: Login Button */
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/Login")}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 transition-colors"
              >
                Sign in
              </button>
              <button 
                onClick={() => navigate("/Register")}
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
              >
                Get Started
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;