import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, User, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Doctors', path: '/hospitals' },
    { name: 'Pharmacy', path: '/pharmacy' },
    { name: 'Dashboard', path: '/dashboard/appointments' },
  ];

  const isDarkPage = location.pathname === '/' || location.pathname === '/pharmacy';
  const isTransparent = !scrolled && isDarkPage;

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border-b border-slate-100/80 py-2'
          : 'bg-transparent py-4'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <Link
              to="/"
              className={`flex items-center gap-3 group ${isTransparent ? 'text-white' : 'text-slate-900'}`}
            >
              <div className={`relative p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${isTransparent
                  ? 'bg-white/15 text-white backdrop-blur-sm border border-white/20 shadow-lg shadow-white/5'
                  : 'bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/25'
                }`}>
                <Activity size={22} strokeWidth={2.5} />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl tracking-tight leading-none">HealthSync</span>
                <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${isTransparent ? 'text-white/50' : 'text-slate-400'}`}>
                  Healthcare Platform
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center">
              <div className={`flex items-center gap-1 p-1.5 rounded-full ${isTransparent ? 'bg-white/10 backdrop-blur-md border border-white/10' : 'bg-slate-100/80'
                }`}>
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                          ? isTransparent
                            ? 'bg-white/20 text-white shadow-sm'
                            : 'bg-white text-slate-900 shadow-sm'
                          : isTransparent
                            ? 'text-white/70 hover:text-white hover:bg-white/10'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className={`font-semibold text-sm px-4 py-2 rounded-full transition-all duration-300 ${isTransparent
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="relative bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 hover:-translate-y-0.5 flex items-center gap-2 group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <User size={15} />
                <span className="relative">Sign Up</span>
                <ChevronRight size={14} className="relative group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden relative p-2.5 rounded-xl transition-all duration-300 ${isTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-slate-700 hover:bg-slate-100'
                }`}
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute left-0 block w-6 h-0.5 rounded-full transform transition-all duration-300 ${isTransparent ? 'bg-white' : 'bg-slate-700'
                  } ${isOpen ? 'top-[11px] rotate-45' : 'top-[5px]'}`} />
                <span className={`absolute left-0 block w-6 h-0.5 rounded-full transform transition-all duration-300 ${isTransparent ? 'bg-white' : 'bg-slate-700'
                  } ${isOpen ? 'opacity-0' : 'top-[11px]'}`} />
                <span className={`absolute left-0 block w-6 h-0.5 rounded-full transform transition-all duration-300 ${isTransparent ? 'bg-white' : 'bg-slate-700'
                  } ${isOpen ? 'top-[11px] -rotate-45' : 'top-[17px]'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${isOpen ? 'visible' : 'invisible'
        }`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/25">
                  <Activity size={20} strokeWidth={2.5} />
                </div>
                <span className="font-heading font-extrabold text-lg text-slate-900">HealthSync</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <X size={22} />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-5 py-4 rounded-2xl font-semibold transition-all duration-300 ${location.pathname === link.path
                      ? 'bg-primary-50 text-primary-600 border border-primary-100 shadow-sm'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.name}
                  <ChevronRight size={16} className={location.pathname === link.path ? 'text-primary-400' : 'text-slate-300'} />
                </Link>
              ))}
            </nav>

            {/* Menu Footer */}
            <div className="p-6 border-t border-slate-100 space-y-3">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-3.5 rounded-2xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 shadow-lg shadow-primary-500/25 transition-all"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
