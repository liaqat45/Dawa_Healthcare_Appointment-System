
import { Appointment, WhatsAppLog } from '../types';

export const sendWhatsAppNotification = async (
  appointment: Appointment,
  type: 'CLIENT_CONFIRMATION' | 'ADMIN_ALERT'
): Promise<WhatsAppLog> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  let message = '';
  let recipient = '';

  if (type === 'CLIENT_CONFIRMATION') {
    recipient = appointment.phoneNumber;
    message = `Hello ${appointment.clientName}, your appointment for ${appointment.serviceType} at Dawa Healthcare is booked for ${appointment.appointmentDate} at ${appointment.appointmentTime}. We look forward to seeing you!`;
  } else {
    recipient = '+1-800-ADMIN-DAWA'; // System Admin
    message = `ADMIN ALERT: New booking received from ${appointment.clientName} for ${appointment.serviceType} on ${appointment.appointmentDate} at ${appointment.appointmentTime}.`;
  }

  const log: WhatsAppLog = {
    id: Math.random().toString(36).substr(2, 9),
    recipient,
    message,
    timestamp: new Date().toISOString(),
    type
  };

  console.log(`[WhatsApp API Simulated] ${type}:`, message);
  return log;
};
