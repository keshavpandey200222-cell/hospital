import React, { useState, useEffect } from 'react';
import { Calendar, User, Activity, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Layout from '../components/common/Layout';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Basic protection - if patient somehow gets here, redirect them
    if (user && user.role !== 'doctor') {
      navigate('/dashboard');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await api.get('/doctor/appointments');
        if (response.data.success) {
          setAppointments(response.data.data);
        }
      } catch (err) {
        setError('Failed to load appointments.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAppointments();
    }
  }, [user, navigate]);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await api.put(`/doctor/appointments/${id}/status`, { status: newStatus });
      if (response.data.success) {
        // Update local state
        setAppointments(appointments.map(apt => 
          apt._id === id ? { ...apt, status: newStatus } : apt
        ));
      }
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Error updating appointment status.");
    }
  };

  const upcomingCount = appointments.filter(a => a.status === 'Upcoming').length;

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen pb-12">
        <div className="bg-blue-900 pt-10 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-heading text-white tracking-tight">Doctor Portal</h1>
              <p className="text-blue-200 mt-2 text-lg">Welcome back, {user?.name}. You have {upcomingCount} upcoming appointments.</p>
            </div>
            <button 
              onClick={logout}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-xl text-sm font-bold transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10 min-h-[600px] animate-fade-in-up">
            
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
              <h2 className="text-2xl font-bold font-heading text-slate-800 flex items-center gap-3">
                <Calendar className="text-blue-600" /> Patient Appointments
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 font-bold border border-red-100">
                <AlertCircle size={20} /> {error}
              </div>
            ) : appointments.length === 0 ? (
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center">
                <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No appointments scheduled</h3>
                <p className="text-slate-500">You currently have no patient appointments assigned to you.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {appointments.map((apt) => (
                  <div key={apt._id} className="bg-white border text-left border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg transition-shadow">
                    
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                        <User size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-lg font-bold text-slate-900">{apt.patientName || "Unknown Patient"}</h4>
                          <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                            apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                            apt.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {apt.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
                          <span className="flex items-center gap-1.5"><Calendar size={16} className="text-slate-400"/> {apt.date}</span>
                          <span className="flex items-center gap-1.5"><Clock size={16} className="text-slate-400"/> {apt.time}</span>
                          <span className="flex items-center gap-1.5"><Activity size={16} className="text-slate-400"/> {apt.department}</span>
                        </div>
                        <div className="mt-2 text-xs font-semibold text-slate-400">
                          ID: {apt.idVisible} | Assigned to: Dr. {apt.doctor}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:border-l md:border-slate-100 md:pl-6">
                      {apt.status === 'Upcoming' && (
                        <>
                          <button 
                            onClick={() => updateStatus(apt._id, 'Completed')}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-xl font-bold text-sm border border-emerald-100 transition-colors"
                          >
                            <CheckCircle2 size={16} /> Mark Done
                          </button>
                          <button 
                            onClick={() => updateStatus(apt._id, 'Cancelled')}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 hover:bg-red-500 hover:text-white rounded-xl font-bold text-sm border border-slate-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {apt.status === 'Completed' && (
                        <span className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-xl">
                          <CheckCircle2 size={18} /> Visit Completed
                        </span>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
