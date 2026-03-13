import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Filter, Heart, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import Layout from '../components/common/Layout';
import api from '../api/axios';

const HospitalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const mockHospitals = [
    {
      _id: '1',
      name: 'City Care General Hospital',
      address: '123 Health Ave, Central District',
      city: 'New York',
      rating: 4.8,
      reviews: 1250,
      specializations: ['Cardiology', 'Neurology', 'Pediatrics'],
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
    },
    {
      _id: '2',
      name: 'St. Mary Specialized Clinic',
      address: '456 Wellness Blvd, North Side',
      city: 'Chicago',
      rating: 4.6,
      reviews: 840,
      specializations: ['Orthopedics', 'Dermatology'],
      imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800'
    },
    {
      _id: '3',
      name: 'Metro Heart Institute',
      address: '789 Life St, South Plaza',
      city: 'San Francisco',
      rating: 4.9,
      reviews: 2100,
      specializations: ['Cardiology', 'Surgery'],
      imageUrl: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800'
    }
  ];

  useEffect(() => {
    const fetchHospitals = async () => {
      setLoading(true);
      try {
        const response = await api.get('/hospitals');
        if (response.data.success) {
          setHospitals(response.data.data);
        } else {
          setHospitals(mockHospitals);
        }
      } catch (err) {
        setError("Failed to load hospitals from the server. Using offline mode.");
        setHospitals(mockHospitals);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleBook = async (hospital) => {
    try {
      const response = await api.post('/appointments', {
        doctor: `Dr. Any available (${hospital.name})`,
        department: hospital.specializations?.[0] || 'General',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        time: '10:00 AM'
      });
      if (response.data.success) {
        setBookingSuccess(`Successfully booked appointment at ${hospital.name}!`);
        setTimeout(() => setBookingSuccess(null), 5000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to book appointment. Are you logged in?');
      setTimeout(() => setError(null), 5000);
    }
  };

  const filteredHospitals = hospitals.filter(h =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    h.city.toLowerCase().includes(cityFilter.toLowerCase())
  );

  return (
    <Layout>
      {/* Dynamic Header Section */}
      <div className="relative bg-slate-900 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-900 to-slate-900 opacity-50"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[100px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white font-heading mb-6 tracking-tight">
              Find Exceptional <span className="text-primary-400">Healthcare</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Book appointments with top doctors at verified hospitals across the country.
            </p>
          </div>

          {/* Glass Search Bar */}
          <div className="glass max-w-4xl mx-auto rounded-3xl p-3 flex flex-col md:flex-row gap-2 transition-all hover:shadow-2xl">
            <div className="flex-1 flex items-center px-5 bg-white/50 backdrop-blur-md rounded-2xl border border-white/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-500/50 transition-all">
              <MapPin className="text-slate-500" size={22} />
              <input
                type="text"
                placeholder="City Location"
                className="w-full bg-transparent border-none focus:ring-0 py-4 px-3 text-slate-800 placeholder:text-slate-500 outline-none font-medium"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              />
            </div>
            <div className="flex-[2] flex items-center px-5 bg-white/50 backdrop-blur-md rounded-2xl border border-white/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-500/50 transition-all">
              <Search className="text-slate-500" size={22} />
              <input
                type="text"
                placeholder="Search hospitals, specialties, or doctors..."
                className="w-full bg-transparent border-none focus:ring-0 py-4 px-3 text-slate-800 placeholder:text-slate-500 outline-none font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
              Search Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row gap-10">
        
        {/* Booking Notification Area */}
        {bookingSuccess && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in-up font-bold">
            <CheckCircle size={22} />
            {bookingSuccess}
          </div>
        )}

        {/* Modern Filters Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 sticky top-28">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <h3 className="font-bold font-heading text-lg flex items-center gap-2 text-slate-800">
                <Filter size={20} className="text-primary-600" /> Filters
              </h3>
              <button className="text-sm font-medium text-slate-400 hover:text-primary-600 transition-colors">Reset</button>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-4 tracking-wide font-heading">SPECIALTY</h4>
                <div className="space-y-3.5">
                  {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology'].map((spec) => (
                    <label key={spec} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 border-2 border-slate-300 rounded group-hover:border-primary-500 transition-colors">
                        <input type="checkbox" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer peer" />
                        <svg className="w-3 h-3 text-primary-600 hidden peer-checked:block pointer-events-none" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-slate-600 group-hover:text-slate-900 font-medium transition-colors">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-4 tracking-wide font-heading">PATIENT RATING</h4>
                <div className="space-y-3.5">
                  {[4, 3, 2].map((rating) => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 border-2 border-slate-300 rounded group-hover:border-primary-500 transition-colors">
                        <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer peer" />
                        <svg className="w-3 h-3 text-primary-600 hidden peer-checked:block pointer-events-none" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="flex items-center gap-1 text-slate-600">
                        {rating} <Star size={14} className="fill-amber-400 text-amber-400" /> & Above
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Results Grid */}
        <div className="flex-1">
          <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-xl lg:text-2xl font-bold font-heading text-slate-800">
              Showing <span className="text-primary-600">{filteredHospitals.length}</span> Hospitals
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500">Sort by:</span>
              <select className="bg-white border text-sm font-medium border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all cursor-pointer">
                <option>Most Relevant</option>
                <option>Highest Rated</option>
                <option>Nearest Location</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-amber-50 text-amber-600 p-4 rounded-2xl border border-amber-100 font-medium mb-6 flex items-center gap-3">
                  <AlertCircle size={20} /> {error}
                </div>
              )}

              {filteredHospitals.length === 0 ? (
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center">
                  <div className="w-20 h-20 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">No hospitals found</h3>
                  <p className="text-slate-500">Try adjusting your search criteria.</p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                  {filteredHospitals.map((hospital, i) => (
                    <div
                      key={hospital._id || hospital.id}
                      className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:border-primary-100 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col animate-fade-in-up"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <div className="h-56 relative overflow-hidden">
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                        <img
                          src={hospital.imageUrl || `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800`}
                          alt={hospital.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                          <div className="bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full flex items-center gap-1.5 font-bold text-sm shadow-sm text-slate-800">
                            <Star size={14} className="text-amber-400 fill-amber-400" />
                            {hospital.rating || "4.5"}
                          </div>
                        </div>

                        <button className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white text-slate-600 hover:text-red-500 hover:shadow-md transition-all">
                          <Heart size={20} />
                        </button>
                      </div>

                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-xl font-bold font-heading text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                            {hospital.name}
                          </h3>
                        </div>

                        <p className="flex items-center gap-1.5 text-slate-500 text-sm font-medium mb-5">
                          <MapPin size={16} className="text-primary-500" /> {hospital.address}, {hospital.city}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {hospital.specializations && hospital.specializations.slice(0, 3).map(spec => (
                            <span key={spec} className="bg-slate-50 text-slate-700 border border-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide">
                              {spec}
                            </span>
                          ))}
                        </div>

                        <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-500">Reviews</span>
                            <span className="font-bold text-slate-900">{hospital.reviews?.toLocaleString() || '1.2k'} verified</span>
                          </div>
                          <button 
                            onClick={() => handleBook(hospital)}
                            className="bg-primary-50 group-hover:bg-primary-600 text-primary-600 group-hover:text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all">
                            Book Now <ArrowRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </Layout>
  );
};

export default HospitalSearch;
