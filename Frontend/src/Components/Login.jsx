import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const navigator = useNavigate();
  const [user, setUser] = useState({ "Email": "", "Password": "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    axios.post("http://localhost:5000/api/users/Login", user)
      .then(res => {
        localStorage.setItem("Token", res.data.Token);
        localStorage.setItem("Role", res.data.Role);
        navigator("/");
      })
      .catch(err => {
        alert(err.response?.data?.error || "Login failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] px-6 pt-20">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[15%] w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-slate-200 rounded-full blur-[80px] opacity-40" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[440px]"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-8 md:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
            <p className="text-slate-500 mt-2 text-sm">
              Enter your credentials to access your career dashboard.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  name="Email"
                  value={user.Email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  name="Password"
                  value={user.Password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all outline-none text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md shadow-slate-200 flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {loading ? "Authenticating..." : "Sign in"}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center pt-6 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Don't have an account?{' '}
              <Link to="/Register" className="text-indigo-600 font-semibold hover:underline underline-offset-4">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Security Note */}
        <p className="text-center text-slate-400 text-xs mt-8 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3 h-3" />
          Secure, encrypted authentication
        </p>
      </motion.div>
    </div>
  );
}

export default Login;