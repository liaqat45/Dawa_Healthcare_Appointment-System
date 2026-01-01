
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import { Appointment, AppointmentStatus } from './types';
import { INITIAL_APPOINTMENTS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Booking' | 'Admin'>('Booking');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  // Load appointments from local storage or initial data
  useEffect(() => {
    const saved = localStorage.getItem('dawa_appointments');
    if (saved) {
      setAppointments(JSON.parse(saved));
    } else {
      setAppointments(INITIAL_APPOINTMENTS);
    }
  }, []);

  // Save appointments to local storage
  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem('dawa_appointments', JSON.stringify(appointments));
    }
  }, [appointments]);

  const handleBookingSuccess = (newApp: Appointment) => {
    setAppointments(prev => [newApp, ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, ...updates } : app));
  };

  const deleteAppointment = (id: string) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(prev => prev.filter(app => app.id !== id));
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo password: 'admin'
    if (adminPassword === 'admin') {
      setIsAdminAuthenticated(true);
    } else {
      alert("Invalid password! Hint: use 'admin'");
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'Booking' ? (
        <div className="relative">
          {showSuccess && (
            <div className="fixed top-24 right-4 md:right-8 z-[60] animate-bounce">
              <div className="bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold">Booking Confirmed!</div>
                  <div className="text-sm opacity-90 text-emerald-50">WhatsApp notification sent.</div>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto space-y-12 py-12">
            <div className="text-center space-y-4">
              <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-200">
                Premium Healthcare
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-800 tracking-tight">
                Modern Care for <br />
                <span className="text-emerald-600">Modern Living</span>
              </h1>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                Book your specialized physiotherapy, massage, or wellness session in seconds. 
                Our certified professionals are ready to help you recover and recharge.
              </p>
            </div>

            <BookingForm 
              existingAppointments={appointments} 
              onSuccess={handleBookingSuccess} 
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Secure Data", desc: "Your personal details are encrypted and safe.", icon: "🔒" },
                { title: "Real-time Sync", desc: "No double bookings, guaranteed slot availability.", icon: "⏱️" },
                { title: "Instant Alerts", desc: "Confirmations sent directly via WhatsApp.", icon: "📱" }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto py-8">
          {!isAdminAuthenticated ? (
            <div className="max-w-md mx-auto mt-20">
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">Admin Login</h2>
                  <p className="text-slate-500 text-sm mt-1">Access requires authentication.</p>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Password</label>
                    <input 
                      type="password" 
                      placeholder="Enter admin password"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      value={adminPassword}
                      onChange={e => setAdminPassword(e.target.value)}
                    />
                    <p className="text-[10px] text-slate-400 italic">Demo hint: password is 'admin'</p>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-slate-800 text-white font-bold py-3.5 rounded-xl hover:bg-slate-900 transition-all shadow-lg"
                  >
                    Login to Dashboard
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <AdminDashboard 
              appointments={appointments} 
              updateAppointment={updateAppointment}
              deleteAppointment={deleteAppointment}
            />
          )}
        </div>
      )}
    </Layout>
  );
};

export default App;
