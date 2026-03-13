import React from 'react';
import {
  ArrowRight, Activity, Calendar, Award, Search, Shield, Heart,
  Stethoscope, Pill, ClipboardList, FlaskConical, Siren, BarChart3,
  Star, Quote, ChevronRight, Zap, Users, Building2, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';

const Home = () => {
  return (
    <Layout>
      {/* ═══════════════════════ HERO SECTION ═══════════════════════ */}
      <section className="relative overflow-hidden bg-slate-900 min-h-[90vh] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-slate-900 to-slate-900" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/8 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left - Content */}
            <div className="space-y-8 animate-fade-in-up z-10">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.07] border border-white/[0.08] backdrop-blur-md text-primary-200 font-semibold text-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                Trusted by 50,000+ Patients
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-heading text-white leading-[1.05] tracking-tight">
                Healthcare,<br />
                <span className="gradient-text">Reimagined.</span>
              </h1>

              <p className="text-lg lg:text-xl text-slate-300/90 leading-relaxed max-w-xl">
                Your end-to-end digital health platform. Book top doctors, order authentic medicines, and manage reports — seamlessly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/hospitals"
                  className="group relative bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white px-8 py-4 rounded-2xl font-bold transition-all text-center hover:shadow-2xl hover:shadow-primary-600/25 flex items-center justify-center gap-2.5 hover:-translate-y-1 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <span className="relative">Find Doctors</span>
                  <ArrowRight size={20} className="relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/pharmacy"
                  className="bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.12] px-8 py-4 rounded-2xl font-bold transition-all text-center flex items-center justify-center gap-2.5 hover:-translate-y-1 backdrop-blur-sm"
                >
                  Order Medicines
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-amber-500'].map((color, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full ${color} border-2 border-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                      {['S', 'M', 'A', 'R'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-400 text-sm font-medium">4.9/5 from 12,000+ reviews</p>
                </div>
              </div>
            </div>

            {/* Right - Floating Cards */}
            <div className="relative hidden lg:block">
              {/* Decorative blob */}
              <div className="absolute -inset-10 blob bg-gradient-to-br from-primary-400/20 to-emerald-400/20 blur-2xl" />

              <div className="relative space-y-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                {/* Card Container */}
                <div className="bg-white/[0.95] backdrop-blur-xl border border-white/80 p-8 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] transform rotate-1 hover:rotate-0 transition-transform duration-700">
                  <div className="space-y-5">

                    {/* Mock Card 1 - Appointment */}
                    <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-white p-4 rounded-2xl border border-blue-100/60 shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shrink-0">
                        <Calendar size={22} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-800 text-sm">Confirmed Appointment</h3>
                        <p className="text-xs text-slate-500 truncate">Dr. jhatka • Tomorrow, 10:00 AM</p>
                      </div>
                      <div className="ml-auto px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg shrink-0">
                        Active
                      </div>
                    </div>

                    {/* Mock Card 2 - Lab Result */}
                    <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-50 to-white p-4 rounded-2xl border border-emerald-100/60 shadow-sm hover:shadow-md transition-shadow ml-6">
                      <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl shrink-0">
                        <Activity size={22} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-800 text-sm">Blood Test Results</h3>
                        <p className="text-xs text-emerald-600 font-semibold">Ready to download ↓</p>
                      </div>
                    </div>

                    {/* Mock Card 3 - Rating */}
                    <div className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-white p-4 rounded-2xl border border-purple-100/60 shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-3 bg-purple-100 text-purple-600 rounded-xl shrink-0">
                        <Award size={22} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-800 text-sm">Top Rated Facility</h3>
                        <p className="text-xs text-slate-500">City Care Hospital • ★ 4.9</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating stats badge */}
                <div className="absolute -left-8 bottom-12 bg-white rounded-2xl shadow-2xl p-4 border border-slate-100 animate-bounce-gentle">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">This Month</p>
                      <p className="font-bold text-slate-900 text-sm">+2,847 Bookings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════ FEATURES SECTION ═══════════════════════ */}
      <section className="section-padding bg-slate-50 relative">
        <div className="section-container">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-600 font-semibold text-sm mb-6">
              <Zap size={14} /> Our Services
            </div>
            <h2 className="text-3xl lg:text-5xl font-black font-heading text-slate-900 mb-5 tracking-tight">
              Everything You Need for{' '}
              <span className="gradient-text">Better Health</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Comprehensive healthcare services designed to make your medical journey smooth, efficient, and stress-free.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: Stethoscope, title: 'Find Doctors', desc: 'Search and book appointments with verified specialists near you.', color: 'blue', link: '/hospitals' },
              { icon: Pill, title: 'Online Pharmacy', desc: 'Order genuine medicines with doorstep delivery and easy refills.', color: 'teal', link: '/pharmacy' },
              { icon: Calendar, title: 'Appointments', desc: 'Schedule, reschedule, and manage all your medical visits digitally.', color: 'purple', link: '/dashboard/appointments' },
              { icon: FlaskConical, title: 'Lab Reports', desc: 'Access your test results anytime, anywhere — securely and instantly.', color: 'amber', link: '/dashboard/lab-tests' },
              { icon: Siren, title: 'Emergency Care', desc: '24/7 emergency assistance with quick hospital bed availability check.', color: 'red' },
              { icon: BarChart3, title: 'Health Analytics', desc: 'Track vitals, history, and health trends with smart dashboards.', color: 'emerald' },
            ].map((feature, i) => {
              const colorMap = {
                blue: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-blue-600/25',
                teal: 'bg-teal-50 text-teal-600 border-teal-100 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600 group-hover:shadow-teal-600/25',
                purple: 'bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 group-hover:shadow-purple-600/25',
                amber: 'bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 group-hover:shadow-amber-600/25',
                red: 'bg-red-50 text-red-600 border-red-100 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 group-hover:shadow-red-600/25',
                emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 group-hover:shadow-emerald-600/25',
              };
              const Icon = feature.icon;
              const Wrapper = feature.link ? Link : 'div';
              const wrapperProps = feature.link ? { to: feature.link } : {};

              return (
                <Wrapper
                  key={feature.title}
                  {...wrapperProps}
                  className="group bg-white rounded-3xl border border-slate-100 p-8 card-hover cursor-pointer animate-fade-in-up relative overflow-hidden"
                  style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-110 ${colorMap[feature.color]}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      {feature.desc}
                    </p>
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                      Learn more <ChevronRight size={14} />
                    </div>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-50 rounded-full blur-[100px] opacity-50" />

        <div className="section-container relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-semibold text-sm mb-6">
              <ClipboardList size={14} /> Simple Process
            </div>
            <h2 className="text-3xl lg:text-5xl font-black font-heading text-slate-900 mb-5 tracking-tight">
              How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Works</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Get started in three easy steps. We've made healthcare access simpler than ever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary-200 via-emerald-200 to-primary-200" />

            {[
              { step: '01', title: 'Search & Discover', desc: 'Browse through our network of verified doctors, hospitals, and specialists in your city.', icon: Search, color: 'primary' },
              { step: '02', title: 'Book Instantly', desc: 'Select a convenient time slot and confirm your appointment with just one click.', icon: Calendar, color: 'emerald' },
              { step: '03', title: 'Get Care', desc: 'Visit the doctor, get prescriptions, and order medicines — all managed through HealthSync.', icon: Heart, color: 'purple' },
            ].map((item, i) => {
              const Icon = item.icon;
              const gradients = {
                primary: 'from-primary-500 to-primary-700',
                emerald: 'from-emerald-500 to-teal-600',
                purple: 'from-purple-500 to-violet-600',
              };
              return (
                <div key={item.step} className="relative text-center group animate-fade-in-up" style={{ animationDelay: `${i * 150}ms`, opacity: 0 }}>
                  {/* Step number circle */}
                  <div className="relative mx-auto mb-8">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${gradients[item.color]} shadow-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <Icon size={32} className="text-white" strokeWidth={2} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center">
                      <span className="font-heading font-black text-sm text-slate-900">{item.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm max-w-xs mx-auto">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ STATS SECTION ═══════════════════════ */}
      <section className="relative py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        {/* Glowing orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />

        <div className="relative section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: '50K+', label: 'Happy Patients', icon: Users, color: 'text-primary-400' },
              { value: '200+', label: 'Expert Doctors', icon: Stethoscope, color: 'text-emerald-400' },
              { value: '50+', label: 'Partner Hospitals', icon: Building2, color: 'text-amber-400' },
              { value: '98%', label: 'Satisfaction Rate', icon: TrendingUp, color: 'text-purple-400' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center group animate-fade-in-up" style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}>
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="text-4xl lg:text-5xl font-black font-heading text-white mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <p className="text-slate-400 font-medium text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section className="section-padding bg-slate-50 relative">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-600 font-semibold text-sm mb-6">
              <Star size={14} className="fill-amber-500" /> Patient Reviews
            </div>
            <h2 className="text-3xl lg:text-5xl font-black font-heading text-slate-900 mb-5 tracking-tight">
              What Our Patients <span className="gradient-text">Say</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Real stories from real patients. See why thousands trust HealthSync for their healthcare needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Priya Sharma',
                role: 'Delhi, India',
                review: 'HealthSync transformed how I manage my family\'s healthcare. Booking appointments is so easy, and the pharmacy delivery is always on time!',
                rating: 5,
                avatar: 'PS',
                color: 'bg-gradient-to-br from-rose-400 to-pink-600',
              },
              {
                name: 'Rahul Verma',
                role: 'Mumbai, India',
                review: 'The lab report feature is incredibly useful. I can access all my test results digitally and share them with my doctor instantly. Highly recommended!',
                rating: 5,
                avatar: 'RV',
                color: 'bg-gradient-to-br from-blue-400 to-indigo-600',
              },
              {
                name: 'Anita Desai',
                role: 'Bangalore, India',
                review: 'As a working professional, I hardly had time for hospital visits. HealthSync\'s online booking saved me so much time. The doctors are excellent!',
                rating: 5,
                avatar: 'AD',
                color: 'bg-gradient-to-br from-emerald-400 to-teal-600',
              },
            ].map((testimonial, i) => (
              <div
                key={testimonial.name}
                className="group bg-white rounded-3xl border border-slate-100 p-8 card-hover relative animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 text-slate-100 group-hover:text-primary-100 transition-colors">
                  <Quote size={40} />
                </div>

                <div className="relative">
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} size={18} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-600 leading-relaxed mb-8 text-sm">
                    "{testimonial.review}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                    <div className={`w-12 h-12 rounded-2xl ${testimonial.color} text-white flex items-center justify-center font-bold text-sm shadow-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                      <p className="text-slate-500 text-xs font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CTA SECTION ═══════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative section-container text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white/80 font-semibold text-sm mb-8 backdrop-blur-sm">
              <Shield size={14} /> Start Your Healthcare Journey
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-6xl font-black font-heading text-white mb-6 tracking-tight leading-tight">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-lg lg:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              Join 50,000+ patients who trust HealthSync for seamless, modern healthcare. Sign up free today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="group bg-white text-primary-700 px-10 py-4.5 rounded-2xl font-bold text-lg transition-all hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Get Started Free
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/hospitals"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 backdrop-blur-sm flex items-center justify-center gap-2"
              >
                Browse Doctors
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
