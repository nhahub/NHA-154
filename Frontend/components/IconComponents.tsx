
import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C13.81 22 15.5 21.5 17 20.69V19C15.68 19.83 13.91 20.36 12 20.36C7.94 20.36 4.36 16.78 4.36 12C4.36 7.22 7.94 3.64 12 3.64C16.06 3.64 19.64 7.22 19.64 12V13.5H21.5V12C21.5 6.75 17.25 2.5 12 2.5Z" />
        <path d="M11 7H13V11H17V13H13V17H11V13H7V11H11V7Z" />
    </svg>
);


export const BrainCircuitIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5a3 3 0 1 0-5.993.129" /><path d="M12 5a3 3 0 1 0 5.993.129" />
    <path d="M15 13a3 3 0 1 0-5.993.129" /><path d="M15 13a3 3 0 1 0 5.993.129" />
    <path d="M9 13a3 3 0 1 0-5.993.129" /><path d="M9 13a3 3 0 1 0 5.993.129" />
    <path d="M6 8.87V10" /><path d="M6.01 13.12v.01" />
    <path d="M9.01 16.12v.01" /><path d="M14.99 16.12v.01" />
    <path d="M17.99 13.12v.01" /><path d="M18 10v-1.13" />
    <path d="m15.82 7.18-.82.82" /><path d="m9 16-1.82 1.82" />
    <path d="m12 16-1.82 1.82" /><path d="M12 8l-1.82-1.82" />
    <path d="m14.18 7.18.82.82" /><path d="m15 16 1.82 1.82" />
  </svg>
);

export const StethoscopeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4.8 2.3A.3.3 0 1 0 5 2a3.3 3.3 0 0 1 3.3 3.3c0 1.4-1.7 2.6-2.6 3.2C5 9 5 10 5 11v1.3"/>
        <path d="M9 12.3V11c0-1 0-2-1-2.7.7-.6 1.8-1.8 1.8-3.2A3.3 3.3 0 0 0 6.5 2a.3.3 0 1 0 .2.6"/>
        <path d="M8 12.3V21a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8.7"/>
        <path d="M16 3a2 2 0 1 1 4 0a2 2 0 1 1-4 0z"/>
    </svg>
);

export const MessageSquareHeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <path d="M14.8 8.8a2.5 2.5 0 1 0-4.4 2.4l2.2 2.2 2.2-2.2a2.5 2.5 0 0 0-.8-4.8z"/>
    </svg>
);
