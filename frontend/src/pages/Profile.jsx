import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { User, Mail } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  
  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black font-heading text-slate-900 mb-1">Profile Settings</h2>
          <p className="text-slate-500 font-medium">Manage your personal information and preferences.</p>
        </div>
      </div>
      
      <div className="bg-white border text-left border-slate-100 rounded-3xl p-8 max-w-2xl">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Account Details</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <input
                type="text"
                disabled
                className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-not-allowed"
                value={user?.name || ''}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                disabled
                className="block w-full pl-10 px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-600 font-medium cursor-not-allowed"
                value={user?.email || ''}
              />
            </div>
          </div>
          
          <button className="px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition" disabled>
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
