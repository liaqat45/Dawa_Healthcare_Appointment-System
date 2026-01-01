
import React, { useState } from 'react';
import { ServiceType, Appointment } from '../types';
import { sendWhatsAppNotification } from '../services/whatsappService';

interface BookingFormProps {
  existingAppointments: Appointment[];
  onSuccess: (appointment: Appointment) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ existingAppointments, onSuccess }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    phoneNumber: '',
    serviceType: ServiceType.MASSAGE_THERAPY,
    appointmentDate: '',
    appointmentTime: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validation: Check for double booking
    const isDoubleBooked = existingAppointments.some(
      app => app.appointmentDate === formData.appointmentDate && 
             app.appointmentTime === formData.appointmentTime
    );

    if (isDoubleBooked) {
      setError("This time slot is already taken. Please choose another time.");
      setLoading(false);
      return;
    }

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'Pending' as any,
      createdAt: new Date().toISOString()
    };

    try {
      // Trigger WhatsApp Notifications
      await Promise.all([
        sendWhatsAppNotification(newAppointment, 'CLIENT_CONFIRMATION'),
        sendWhatsAppNotification(newAppointment, 'ADMIN_ALERT')
      ]);

      onSuccess(newAppointment);
      setFormData({
        clientName: '',
        phoneNumber: '',
        serviceType: ServiceType.MASSAGE_THERAPY,
        appointmentDate: '',
        appointmentTime: ''
      });
    } catch (err) {
      setError("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 max-w-xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Book Your Session</h2>
        <p className="text-slate-500 mt-1">Fill in the details below to schedule your appointment.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input
              required
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              value={formData.clientName}
              onChange={e => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Phone Number</label>
            <input
              required
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              value={formData.phoneNumber}
              onChange={e => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Service Category</label>
          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
            value={formData.serviceType}
            onChange={e => setFormData(prev => ({ ...prev, serviceType: e.target.value as ServiceType }))}
          >
            {Object.values(ServiceType).map(service => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Preferred Date</label>
            <input
              required
              type="date"
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              value={formData.appointmentDate}
              onChange={e => setFormData(prev => ({ ...prev, appointmentDate: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Preferred Time</label>
            <input
              required
              type="time"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              value={formData.appointmentTime}
              onChange={e => setFormData(prev => ({ ...prev, appointmentTime: e.target.value }))}
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-sm font-medium border border-rose-100">
            {error}
          </div>
        )}

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Confirm Booking'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
