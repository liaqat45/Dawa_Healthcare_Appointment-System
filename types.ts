
export enum ServiceType {
  MASSAGE_THERAPY = 'Massage Therapy',
  PHYSIOTHERAPY = 'Physiotherapy',
  WELLNESS_CONSULTATION = 'Wellness Consultation',
  TRAINING_SESSION = 'Training Session',
  CHIROPRACTIC = 'Chiropractic Care'
}

export enum AppointmentStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface Appointment {
  id: string;
  clientName: string;
  phoneNumber: string;
  serviceType: ServiceType;
  appointmentDate: string; // ISO string
  appointmentTime: string; // HH:mm
  status: AppointmentStatus;
  createdAt: string;
}

export interface WhatsAppLog {
  id: string;
  recipient: string;
  message: string;
  timestamp: string;
  type: 'CLIENT_CONFIRMATION' | 'ADMIN_ALERT';
}
