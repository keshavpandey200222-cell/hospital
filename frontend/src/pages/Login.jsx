import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Activity, AlertCircle } from 'lucide-react';
import Layout from '../components/common/Layout';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, error, loading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">

          <div className="text-center mb-8">
            <div className="mx-auto bg-primary-100 text-primary-600 h-16 w-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Activity size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 font-heading">Welcome Back</h2>
            <p className="text-slate-500 font-medium mb-6">Please enter your details to sign in.</p>
            
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-left mb-4">
              <p className="text-sm font-bold text-emerald-800 mb-2">Try the Patient Demo Account</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-emerald-700 font-medium">
                  demo@example.com / password123
                </div>
                <button 
                  type="button" 
                  onClick={() => { setEmail('demo@example.com'); setPassword('password123'); }}
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-500 transition-colors"
                >
                  Auto-fill Form
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-left">
              <p className="text-sm font-bold text-blue-800 mb-2">Try the Doctor Demo Account</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-blue-700 font-medium">
                  doctor@example.com / password123
                </div>
                <button 
                  type="button" 
                  onClick={() => { setEmail('doctor@example.com'); setPassword('password123'); }}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500 transition-colors"
                >
                  Auto-fill Doctor
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm font-bold border border-red-100">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  placeholder="admin@hms.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white transition-all ${loading ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                }`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-primary-600 hover:text-primary-500 transition-colors">
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </Layout>
  );
};

export default Login;
