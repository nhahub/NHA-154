
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      case 'doctor-dashboard':
        return <DoctorDashboard />;
      case 'patient-dashboard':
        return <PatientDashboard />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="bg-[#FFF2EF] min-h-screen flex flex-col text-[#1A2A4F]">
      <Header onNavigate={navigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
