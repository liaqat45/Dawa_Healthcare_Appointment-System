
import React, { useState } from 'react';
import { Appointment, AppointmentStatus, ServiceType } from '../types';
import { SERVICE_ICONS } from '../constants';

interface AdminDashboardProps {
  appointments: Appointment[];
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ appointments, updateAppointment, deleteAppointment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | 'All'>('All');
  const [view, setView] = useState<'List' | 'Calendar'>('List');

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = app.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.phoneNumber.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.CONFIRMED: return 'bg-emerald-100 text-emerald-700';
      case AppointmentStatus.PENDING: return 'bg-amber-100 text-amber-700';
      case AppointmentStatus.COMPLETED: return 'bg-blue-100 text-blue-700';
      case AppointmentStatus.CANCELLED: return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Management Console</h2>
          <p className="text-slate-500 text-sm">Monitor and manage all client appointments.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
          <button 
            onClick={() => setView('List')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'List' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-600'}`}
          >
            List View
          </button>
          <button 
            onClick={() => setView('Calendar')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'Calendar' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-600'}`}
          >
            Calendar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-semibold text-slate-800">Quick Filters</h3>
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Search</label>
              <input 
                type="text" 
                placeholder="Name or phone..."
                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Status</label>
              <select 
                className="w-full px-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}
              >
                <option value="All">All Statuses</option>
                {Object.values(AppointmentStatus).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-emerald-600 p-6 rounded-2xl shadow-lg text-white">
            <div className="text-emerald-100 text-sm font-medium">Total Bookings</div>
            <div className="text-3xl font-bold mt-1">{appointments.length}</div>
            <div className="mt-4 pt-4 border-t border-emerald-500/30 flex justify-between text-xs">
              <span>Today: {appointments.filter(a => a.appointmentDate === new Date().toISOString().split('T')[0]).length}</span>
              <span>Pending: {appointments.filter(a => a.status === AppointmentStatus.PENDING).length}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {view === 'List' ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Client & Service</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Schedule</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.length > 0 ? filteredAppointments.map(app => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-lg shadow-inner">
                              {SERVICE_ICONS[app.serviceType]}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800">{app.clientName}</div>
                              <div className="text-xs text-slate-500 font-medium">{app.serviceType}</div>
                              <div className="text-xs text-slate-400">{app.phoneNumber}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm font-medium text-slate-700">{app.appointmentDate}</div>
                          <div className="text-xs text-slate-500">{app.appointmentTime}</div>
                        </td>
                        <td className="px-6 py-5">
                          <select 
                            className={`text-xs font-bold px-3 py-1.5 rounded-full border-0 outline-none cursor-pointer shadow-sm ${getStatusColor(app.status)}`}
                            value={app.status}
                            onChange={(e) => updateAppointment(app.id, { status: e.target.value as AppointmentStatus })}
                          >
                            {Object.values(AppointmentStatus).map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button 
                            onClick={() => deleteAppointment(app.id)}
                            className="text-rose-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">
                          No appointments found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800">Calendar Visualization</h3>
              <p className="text-slate-500 max-w-xs mt-2">Integrating full calendar views requires library sync. Here's your summary for this week:</p>
              <div className="mt-6 flex gap-4">
                {[...Array(7)].map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() + i);
                  const count = appointments.filter(a => a.appointmentDate === d.toISOString().split('T')[0]).length;
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div className={`w-8 rounded-full mb-2 ${count > 0 ? 'bg-emerald-500' : 'bg-slate-200'}`} style={{ height: `${count * 20 + 10}px` }}></div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
