import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, User, Calendar, LogOut, ShieldCheck } from 'lucide-react';
import default_profile from '../assets/default_profile.webp';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ Username: "", Email: "", Age: "" });
  const [loading, setLoading] = useState(true);
  const Token = localStorage.getItem("Token");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/users/Profile", {
      headers: { Authorization: `Bearer ${Token}` }
    })
      .then(res => {
        setUser(res.data.userdata);
        setLoading(false);
      })
      .catch(() => navigate("/Login"));
  }, [Token, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) return null; // Keep it clean during load

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Profile Image & Essential Info */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 rounded-full border border-slate-200 p-1 mb-4">
            <img src={default_profile} alt="Avatar" className="w-full h-full rounded-full grayscale hover:grayscale-0 transition-all duration-500" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">{user.Username}</h1>
          <div className="flex items-center gap-1.5 text-slate-400 mt-1">
            <ShieldCheck size={14} className="text-indigo-500" />
            <span className="text-xs font-medium uppercase tracking-widest">Verified Account</span>
          </div>
        </div>

        {/* Minimalist Info Stack */}
        <div className="space-y-1 border-y border-slate-100 py-6">
          <ProfileField icon={<User size={18} />} label="Username" value={user.Username} />
          <ProfileField icon={<Mail size={18} />} label="Email Address" value={user.Email} />
          <ProfileField icon={<Calendar size={18} />} label="Reported Age" value={`${user.Age} years`} />
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col gap-3">
          <button 
            onClick={handleLogout}
            className="w-full py-3.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <LogOut size={16} />
            Sign out of account
          </button>
          
          <button 
            onClick={() => navigate("/")}
            className="w-full py-3.5 bg-white text-slate-500 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
          >
            Return to Dashboard
          </button>
        </div>

        <p className="text-center text-[11px] text-slate-300 mt-8 tracking-widest uppercase">
          Member since 2024 • End-to-End Encrypted
        </p>
      </motion.div>
    </div>
  );
};

/* --- Minimal Helper Component --- */
const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors">
    <div className="flex items-center gap-4">
      <div className="text-slate-400">{icon}</div>
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{label}</p>
        <p className="text-sm font-medium text-slate-700">{value || "—"}</p>
      </div>
    </div>
  </div>
);

export default Profile;