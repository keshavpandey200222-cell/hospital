import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Plus, TrendingUp, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';
import Layout from '../components/common/Layout';
import api from '../api/axios';

const PharmacyStore = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCartToast, setShowCartToast] = useState(null);

  const handleAddToCart = (med) => {
    setCart([...cart, med]);
    setShowCartToast(`Added ${med.name} to cart!`);
    setTimeout(() => setShowCartToast(null), 3000);
  };

  const mockMedicines = [
    {
      _id: '1',
      name: 'Amoxicillin 500mg',
      description: 'Broad-spectrum antibiotic used to treat various bacterial infections.',
      price: 12.50,
      tags: ['Antibiotic', 'Bestseller'],
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80'
    },
    {
      _id: '2',
      name: 'Ibuprofen 200mg',
      description: 'Pain reliever and fever reducer used for headaches, muscle aches, and more.',
      price: 8.99,
      tags: ['Pain Relief'],
      imageUrl: 'https://images.unsplash.com/photo-1550572017-ed20015ade0e?auto=format&fit=crop&w=300&q=80'
    },
    {
      _id: '3',
      name: 'Vitamin D3 Supplement',
      description: 'High-potency vitamin D for bone health and immune support.',
      price: 15.25,
      tags: ['Wellness', 'New'],
      imageUrl: 'https://images.unsplash.com/photo-1471864190281-ad599f5732a0?auto=format&fit=crop&w=300&q=80'
    },
    {
      _id: '4',
      name: 'Loratadine 10mg',
      description: 'Non-drowsy antihistamine for allergy relief from sneezing and watery eyes.',
      price: 10.50,
      tags: ['Allergy'],
      imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=300&q=80'
    }
  ];

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const response = await api.get('/medicines');
        if (response.data.success) {
          setMedicines(response.data.data);
        } else {
          setMedicines(mockMedicines);
        }
      } catch (err) {
        setError("Failed to load medicines from the server. Using offline mode.");
        setMedicines(mockMedicines);
        console.error("Pharmacy API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const filteredMeds = medicines.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (med.description && med.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout>
      <div className="relative bg-teal-900 border-b border-teal-800 overflow-hidden text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900 via-teal-900/80 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-800/50 border border-teal-700 backdrop-blur-md text-teal-100 font-medium text-sm mb-6">
                <ShieldCheck size={16} className="text-emerald-400" /> 100% Genuine Medicines
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold font-heading mb-6 tracking-tight">
                Your Digital <br />
                <span className="text-teal-400">Pharmacy</span>
              </h1>
              <p className="text-xl text-teal-100 max-w-lg mb-10 leading-relaxed">
                Order medicines, track history, and get super-fast delivery right to your door step.
              </p>

              <div className="glass max-w-xl rounded-2xl p-2 flex items-center bg-white/10 border-white/20">
                <div className="flex-1 flex items-center px-4">
                  <Search className="text-teal-200" size={20} />
                  <input
                    type="text"
                    placeholder="Search medicines, health products..."
                    className="w-full bg-transparent border-none focus:ring-0 py-3 px-4 text-white placeholder:text-teal-200/70 outline-none font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-xl font-bold transition-all hover:shadow-lg">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-bold font-heading text-slate-800 flex items-center gap-3">
            <TrendingUp size={28} className="text-teal-600" /> Pharmacy Products
          </h2>
          <button className="relative bg-white border border-slate-200 text-slate-700 hover:border-teal-500 hover:text-teal-600 p-3.5 rounded-2xl transition-all shadow-sm hover:shadow-md">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
              {cart.length}
            </span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <>
            {/* Added to Cart Notification */}
            {showCartToast && (
              <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-teal-600 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in-up font-bold">
                <CheckCircle size={22} />
                {showCartToast}
              </div>
            )}

            {error && (
              <div className="bg-amber-50 text-amber-600 p-4 rounded-2xl border border-amber-100 font-medium mb-10 flex items-center gap-3 animate-fade-in-up">
                <AlertCircle size={24} /> {error}
              </div>
            )}

            {filteredMeds.length === 0 ? (
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-12 text-center">
                <div className="w-20 h-20 bg-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No medicines found</h3>
                <p className="text-slate-500">We couldn't find any products matching your search.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredMeds.map((med, index) => (
                  <div
                    key={med._id || med.id}
                    className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:border-teal-100 hover:-translate-y-2 transition-all duration-300 group flex flex-col relative animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {med.tags && med.tags.length > 0 && (
                      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                        {med.tags.map(tag => (
                          <span key={tag} className="bg-white/90 backdrop-blur-sm text-teal-700 border border-teal-100 px-3 py-1 rounded-full text-xs font-bold shadow-sm inline-block w-max">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="h-56 bg-slate-50 p-8 flex items-center justify-center relative overflow-hidden group-hover:bg-teal-50/50 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-100/50"></div>
                      <img src={med.imageUrl || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80'} alt={med.name} className="object-contain h-full relative z-10 mix-blend-multiply group-hover:scale-110 transition-transform duration-500 drop-shadow-lg" />
                    </div>

                    <div className="p-6 flex-grow flex flex-col bg-white">
                      <h3 className="text-lg font-bold font-heading text-slate-900 mb-2 leading-tight group-hover:text-teal-600 transition-colors">{med.name}</h3>
                      <p className="text-sm font-medium text-slate-500 line-clamp-2 mb-6 leading-relaxed">{med.description || "High quality medical supply."}</p>

                      <div className="mt-auto flex items-end justify-between">
                        <div>
                          <span className="text-xs text-slate-400 font-medium block mb-0.5">Price</span>
                          <div className="font-black font-heading text-2xl text-slate-900">${med.price?.toFixed(2)}</div>
                        </div>
                        <button 
                          onClick={() => handleAddToCart(med)}
                          className="bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white p-3.5 rounded-2xl transition-all hover:shadow-lg hover:shadow-teal-600/20 active:scale-95">
                          <Plus size={22} strokeWidth={2.5} />
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
    </Layout>
  );
};

export default PharmacyStore;
