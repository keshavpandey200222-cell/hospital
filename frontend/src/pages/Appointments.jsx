import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Video, Phone, MoreVertical, AlertCircle, Plus } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await api.get('/appointments/my-appointments');
        if (response.data.success) {
          setAppointments(response.data.data);
        }
      } catch (err) {
        setError("Failed to load appointments from server.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-1">My Appointments</h2>
          <p className="text-slate-500 font-medium text-sm">View and manage your upcoming medical visits.</p>
        </div>
        <Link to="/hospitals" className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-primary-600/20 transition-all hover:-translate-y-0.5 whitespace-nowrap flex items-center justify-center gap-2">
          <Plus size={18} strokeWidth={3} /> Book New Appointment
        </Link>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-5 rounded-2xl border border-red-100 font-medium flex items-center gap-3">
            <AlertCircle size={20} /> {error}
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center">
            <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No appointments yet</h3>
            <p className="text-slate-500 mb-6">You don't have any past or upcoming appointments scheduled.</p>
            <Link to="/hospitals" className="inline-flex text-primary-600 bg-primary-50 hover:bg-primary-100 px-6 py-3 rounded-xl font-bold transition-colors">
              Find a Doctor
            </Link>
          </div>
        ) : (
          appointments.map((apt) => {
            const appointmentDate = new Date(apt.date);
            const isUpcoming = apt.status === 'scheduled';

            return (
              <div key={apt._id} className="group border border-slate-100 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-primary-100 transition-all duration-300 bg-white shadow-sm animate-fade-in-up">

                <div className="flex items-start gap-5">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-colors ${isUpcoming ? 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-100'
                    }`}>
                    <CalendarIcon size={28} strokeWidth={2} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-1.5">
                      <h3 className="font-bold text-lg font-heading text-slate-900 leading-tight block">
                        {apt.hospital?.name || "Dr. Speciality Clinic"}
                      </h3>
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${apt.status === 'scheduled' ? 'bg-amber-100 text-amber-700' :
                        apt.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                        • {apt.status}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <p className="text-sm font-semibold text-primary-600">
                        {apt.notes || "General Consultation"}
                      </p>
                      <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                        <MapPin size={16} className="text-slate-400" />
                        {apt.hospital?.address || "At Facility"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-3 border-t border-slate-100 md:border-t-0 md:border-l pt-5 md:pt-0 md:pl-8">
                  <div className="bg-slate-50 rounded-xl p-3 w-full md:w-auto flex items-center gap-5 border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                      <CalendarIcon size={16} className="text-primary-500" />
                      {appointmentDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="w-px h-4 bg-slate-300"></div>
                    <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                      <Clock size={16} className="text-primary-500" />
                      {apt.timeSlot || appointmentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {isUpcoming && (
                    <div className="flex gap-2 w-full md:w-auto mt-2">
                      <button className="flex-1 md:flex-none text-red-600 hover:text-white bg-red-50 hover:bg-red-500 border border-red-100 px-4 py-2.5 rounded-xl text-sm font-bold transition-all text-center shadow-sm hover:shadow-red-500/20">
                        Cancel
                      </button>
                    </div>
                  )}
                  {apt.status === 'completed' && (
                    <button className="w-full md:w-auto text-primary-600 hover:text-white bg-primary-50 hover:bg-primary-600 px-5 py-2.5 rounded-xl text-sm font-bold transition-all text-center shadow-sm border border-primary-100 hover:border-transparent">
                      View Notes
                    </button>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
