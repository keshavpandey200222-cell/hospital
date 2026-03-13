import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Activity, AlertCircle } from 'lucide-react';
import Layout from '../components/common/Layout';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, error: authError, loading } = useAuth();
  const [localError, setLocalError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords don't match");
      return;
    }

    const success = await register(formData.name, formData.email, formData.password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <Layout>
      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold font-heading text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500 font-medium">Join HealthSync to manage your healthcare.</p>
          </div>

          {(localError || authError) && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm font-bold border border-red-100">
              <AlertCircle size={18} />
              {localError || authError}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  placeholder="John Doe"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  placeholder="john@example.com"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center mt-6 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all hover:-translate-y-0.5"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary-600 hover:text-primary-500 transition-colors">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </Layout>
  );
};

export default Register;
