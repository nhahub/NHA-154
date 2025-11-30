
export type Page = 'home' | 'login' | 'doctor-dashboard' | 'patient-dashboard';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
