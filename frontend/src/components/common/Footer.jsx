import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Mail, MapPin, Phone, ArrowUpRight, Heart, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import api from '../../api/axios';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const response = await api.post('/newsletter/subscribe', { email });
      if (response.data.success) {
        setStatus('success');
        setMessage(response.data.message || 'Thanks for subscribing!');
        setEmail('');

        // Reset after 3 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Subscription failed. Please try again.');

      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  const footerLinks = {
    quickLinks: [
      { name: 'Find Doctors', path: '/hospitals' },
      { name: 'Online Pharmacy', path: '/pharmacy' },
      { name: 'My Appointments', path: '/dashboard/appointments' },
      { name: 'Health Dashboard', path: '/dashboard' },
    ],
    services: [
      { name: 'General Medicine', path: '/hospitals' },
      { name: 'Cardiology', path: '/hospitals' },
      { name: 'Neurology', path: '/hospitals' },
      { name: 'Pediatrics', path: '/hospitals' },
      { name: 'Lab Reports', path: '/dashboard/lab-tests' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Cookie Policy', path: '#' },
    ],
  };

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-emerald-500 to-primary-600" />

      {/* Decorative blobs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary-600/5 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-emerald-600/5 rounded-full blur-[100px]" />

      {/* Newsletter Section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold font-heading mb-2">
                Stay Updated with <span className="gradient-text">HealthSync</span>
              </h3>
              <p className="text-slate-400 font-medium max-w-md">
                Get health tips, new features, and exclusive offers delivered to your inbox.
              </p>
            </div>

            <div className="w-full max-w-md flex flex-col gap-2">
              <form onSubmit={handleSubscribe} className="flex gap-3 relative">
                <div className="flex-1 relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all font-medium disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white px-7 py-3.5 rounded-xl font-bold transition-all hover:shadow-xl hover:shadow-primary-500/20 whitespace-nowrap disabled:opacity-70 flex items-center justify-center min-w-[120px]"
                >
                  {status === 'loading' ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : status === 'success' ? (
                    <CheckCircle2 size={18} className="text-white" />
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>

              {/* Status Message Area */}
              <div className="h-6">
                {status === 'success' && (
                  <p className="text-emerald-400 text-sm font-medium flex items-center gap-1.5 animate-fade-in-up">
                    <CheckCircle2 size={14} /> {message}
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-rose-400 text-sm font-medium flex items-center gap-1.5 animate-fade-in-up">
                    <AlertCircle size={14} /> {message}
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-6">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/20 group-hover:scale-110 transition-transform">
                <Activity size={22} strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl text-white block leading-none">HealthSync</span>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-500">Healthcare Platform</span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6 text-sm">
              Your trusted digital health companion. Book doctors, order medicines, and manage your health journey — all in one place.
            </p>
            <div className="flex items-center gap-3">
              {/* Social Links */}
              {['twitter', 'linkedin', 'github', 'instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-600 hover:border-primary-500 transition-all duration-300 hover:-translate-y-0.5"
                  aria-label={social}
                >
                  <SocialIcon name={social} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-primary-500 to-transparent" />
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 rounded-full transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-primary-500 to-transparent" />
              Services
            </h4>
            <ul className="space-y-3.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white text-sm font-medium transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 rounded-full transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-primary-500 to-transparent" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={18} className="text-primary-400 flex-shrink-0 mt-0.5" />
                <span>123 Healthcare Avenue, Medical District, NY 10001</span>
              </li>
              <li>
                <a href="tel:+1800123456" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                  <Phone size={18} className="text-primary-400 flex-shrink-0" />
                  +1 (800) 123-4567
                </a>
              </li>
              <li>
                <a href="mailto:support@healthsync.com" className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors">
                  <Mail size={18} className="text-primary-400 flex-shrink-0" />
                  support@healthsync.com
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <Link
                to="/hospitals"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary-400 hover:text-primary-300 transition-colors group"
              >
                Book an Appointment
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm font-medium flex items-center gap-1.5">
              © {currentYear} HealthSync. Crafted with <Heart size={14} className="text-red-400 fill-red-400" /> for better healthcare.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Simple SVG social icons
const SocialIcon = ({ name }) => {
  const icons = {
    twitter: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    linkedin: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    github: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    instagram: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  };
  return icons[name] || null;
};

export default Footer;
