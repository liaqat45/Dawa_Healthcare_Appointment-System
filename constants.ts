
import { ServiceType, AppointmentStatus, Appointment } from './types';

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    phoneNumber: '+1234567890',
    serviceType: ServiceType.MASSAGE_THERAPY,
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    appointmentTime: '10:00',
    status: AppointmentStatus.CONFIRMED,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    clientName: 'Michael Chen',
    phoneNumber: '+1987654321',
    serviceType: ServiceType.PHYSIOTHERAPY,
    appointmentDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    appointmentTime: '14:30',
    status: AppointmentStatus.PENDING,
    createdAt: new Date().toISOString()
  }
];

export const SERVICE_ICONS: Record<ServiceType, string> = {
  [ServiceType.MASSAGE_THERAPY]: '💆',
  [ServiceType.PHYSIOTHERAPY]: '💪',
  [ServiceType.WELLNESS_CONSULTATION]: '🌿',
  [ServiceType.TRAINING_SESSION]: '🏋️',
  [ServiceType.CHIROPRACTIC]: '🦴'
};
