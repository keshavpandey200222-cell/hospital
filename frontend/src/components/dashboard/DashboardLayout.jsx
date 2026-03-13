import React from 'react';
import { Calendar, Package, FileText, User, Settings, LogOut, Activity } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Layout from '../common/Layout';

const DashboardLayout = ({ children }) => {
  const sidebarLinks = [
    { name: 'My Appointments', icon: Calendar, path: '/dashboard/appointments' },
    { name: 'My Orders', icon: Package, path: '/dashboard/orders' },
    { name: 'Lab & Reports', icon: FileText, path: '/dashboard/lab-tests' },
    { name: 'Profile Settings', icon: User, path: '/dashboard/profile' },
  ];

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen pb-12">
        <div className="bg-primary-900 pt-10 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold font-heading text-white tracking-tight">Patient Portal</h1>
            <p className="text-primary-200 mt-2 text-lg">Manage your healthcare journey in one place.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Elegant Sidebar */}
            <div className="w-full lg:w-72 flex-shrink-0 animate-fade-in-up">
              <div className="glass rounded-3xl p-6 sticky top-28 bg-white/90 backdrop-blur-xl border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center gap-5 mb-10 pb-6 border-b border-slate-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg shadow-primary-500/30 ring-4 ring-primary-50">
                    JD
                  </div>
                  <div>
                    <h3 className="font-bold font-heading text-lg text-slate-900 leading-tight mb-0.5">John Doe</h3>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-lg w-fit">
                      <Activity size={14} className="text-emerald-500" /> Active
                    </div>
                  </div>
                </div>

                <nav className="space-y-1.5 mb-8">
                  {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                          `group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-300 ${isActive
                            ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20 translate-x-1'
                            : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                          }`
                        }
                      >
                        <Icon size={20} className="transition-transform group-hover:scale-110" />
                        {link.name}
                      </NavLink>
                    );
                  })}
                </nav>

                <div className="pt-6 border-t border-slate-100">
                  <button className="flex items-center gap-3.5 px-4 py-3.5 text-red-500 font-semibold hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all duration-300 w-full group">
                    <LogOut size={20} className="transition-transform group-hover:-translate-x-1" />
                    Secure Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 min-h-[600px] animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              {children}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardLayout;
