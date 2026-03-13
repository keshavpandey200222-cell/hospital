import React, { useState, useEffect } from 'react';
import {
  FileText, Download, Eye, Calendar, FlaskConical, AlertCircle,
  Search, CheckCircle2, Plus, Clock, MapPin, ChevronRight,
  Beaker, Microscope, Activity, ShieldCheck
} from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const LabTests = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('reports'); // 'reports' or 'book'
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null);

  const availableTests = [
    {
      id: 't1',
      name: 'Complete Blood Count (CBC)',
      description: 'Measures different components of your blood, including red and white blood cells.',
      price: 25.00,
      duration: '24 Hours',
      category: 'General',
      icon: Beaker
    },
    {
      id: 't2',
      name: 'Lipid Profile Panel',
      description: 'Checks cholesterol and triglyceride levels to assess heart health.',
      price: 45.00,
      duration: '48 Hours',
      category: 'Heart',
      icon: Activity
    },
    {
      id: 't3',
      name: 'Thyroid Function Test',
      description: 'Measures how well your thyroid gland is working.',
      price: 35.00,
      duration: '24 Hours',
      category: 'Hormonal',
      icon: Microscope
    },
    {
      id: 't4',
      name: 'Vitamin D (25-OH)',
      description: 'Assesses vitamin D levels for bone and immune health.',
      price: 50.00,
      duration: '72 Hours',
      category: 'Vitamin',
      icon: Plus
    }
  ];

  const mockReports = [
    {
      _id: 'r1',
      title: 'Complete Blood Count (CBC)',
      date: '2024-03-10',
      status: 'Ready',
      provider: 'City Care Diagnostics',
      category: 'Blood Test',
      highlights: 'Hemoglobin: 14.2 g/dL (Normal)',
      idVisible: 'REP-CBC-5291'
    },
    {
      _id: 'r2',
      title: 'Lipid Profile Panel',
      date: '2024-03-05',
      status: 'Ready',
      provider: 'Metro Heart Institute',
      category: 'Cardiology',
      highlights: 'Total Cholesterol: 185 mg/dL (Normal)',
      idVisible: 'REP-LIP-1024'
    }
  ];

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await api.get('/reports/my-reports');
        if (response.data.success) {
          setReports(response.data.data);
        } else {
          setReports(mockReports);
        }
      } catch (err) {
        setReports(mockReports);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleBookTest = async (testName, price) => {
    try {
      const response = await api.post('/test-bookings', {
        testName,
        price,
        collectionType: 'home'
      });

      if (response.data.success) {
        setBookingStatus(`Success! Booking for ${testName} confirmed. ID: ${response.data.data._id}`);
      }
    } catch (err) {
      setBookingStatus('Failed to book test. Please check your connection and try again.');
    }
    setTimeout(() => setBookingStatus(null), 5000);
  };

  const filteredReports = reports.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-black font-heading text-slate-900 mb-1">Lab Services</h2>
          <p className="text-slate-500 font-medium">Book diagnostic tests and access your medical reports.</p>
        </div>

        {/* Modern Tab Switcher */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 w-fit">
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'reports'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
              }`}
          >
            My Reports
          </button>
          <button
            onClick={() => setActiveTab('book')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'book'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
              }`}
          >
            Book Blood Test
          </button>
        </div>
      </div>

      {bookingStatus && (
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 font-bold flex items-center gap-3 animate-fade-in-up">
          <CheckCircle2 size={20} /> {bookingStatus}
        </div>
      )}

      {activeTab === 'reports' ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800">Available Reports</h3>
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search reports..."
                className="pl-11 pr-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-medium text-sm w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center">
              <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No reports found</h3>
              <p className="text-slate-500">Your test results will appear here once ready.</p>
            </div>
          ) : (
            <div className="grid gap-5">
              {filteredReports.map((report, i) => (
                <div
                  key={report._id}
                  className="group bg-white rounded-3xl border border-slate-100 p-6 hover:shadow-xl hover:border-primary-100 transition-all duration-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in-up"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 border border-primary-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 mb-1">{report.title}</h4>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-500">
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {report.date}</span>
                        <span className="flex items-center gap-1.5"><MapPin size={14} /> {report.provider}</span>
                      </div>
                      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold uppercase tracking-wider">
                        <CheckCircle2 size={12} /> {report.status}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 md:flex-none p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-primary-50 hover:text-primary-600 transition-all border border-slate-100">
                      <Eye size={20} />
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold text-sm hover:shadow-lg hover:shadow-primary-600/20 transition-all active:scale-95">
                      <Download size={18} /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="animate-fade-in-up">
          <div className="grid md:grid-cols-2 gap-6">
            {availableTests.map((test) => {
              const Icon = test.icon;
              return (
                <div key={test.id} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-all border border-slate-100">
                      <Icon size={28} />
                    </div>
                    <span className="text-2xl font-black font-heading text-slate-900">${test.price}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{test.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                    {test.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {test.duration} Result</span>
                      <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                      <span>Home Collection</span>
                    </div>
                    <button
                      onClick={() => handleBookTest(test.name, test.price)}
                      className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-primary-600/20 transition-all active:scale-95"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Secure Booking Info */}
          <div className="mt-12 p-8 bg-slate-900 rounded-[32px] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]"></div>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary-400 border border-white/10 shrink-0">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Safe & Trusted Lab Testing</h4>
                  <p className="text-slate-400 text-sm font-medium">All samples are collected by certified professionals from NABL accredited labs.</p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
                <div className="flex -space-x-3 mb-1">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full rounded-full" />
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold text-emerald-400">Join 15,000+ happy patients</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default LabTests;
