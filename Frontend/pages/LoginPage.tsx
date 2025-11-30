
import React from 'react';
import { Page } from '../types';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center bg-[#FFF2EF] p-6">
      <div className="container mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold text-[#1A2A4F] mb-4 font-cairo">مرحباً بك في بوابتك الصحية</h1>
        <p className="text-gray-600 mb-12 text-lg">الرجاء تحديد دورك للمتابعة.</p>
        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Doctor Card */}
          <div 
            onClick={() => onNavigate('doctor-dashboard')}
            className="group bg-white rounded-2xl shadow-xl p-8 cursor-pointer border-2 border-transparent hover:border-[#1A2A4F] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 flex flex-col items-center"
          >
            <div className="relative mb-6">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" alt="Doctor" className="w-44 h-44 rounded-full object-cover border-8 border-gray-100 group-hover:border-[#FFDBB6] transition-colors duration-300" />
            </div>
            <h2 className="text-3xl font-bold text-[#1A2A4F] mb-2 font-cairo">أنا طبيب</h2>
            <p className="text-gray-500 mb-8 flex-grow">الوصول إلى أدوات التشخيص المدعومة بالذكاء الاصطناعي وميزات إدارة المرضى.</p>
            <button className="bg-[#1A2A4F] text-white font-semibold py-3 px-10 rounded-full group-hover:bg-[#F7A5A5] transition-colors duration-300 text-lg">
              بوابة الطبيب
            </button>
          </div>

          {/* Patient Card */}
          <div 
            onClick={() => onNavigate('patient-dashboard')}
            className="group bg-white rounded-2xl shadow-xl p-8 cursor-pointer border-2 border-[#F7A5A5] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 flex flex-col items-center"
          >
             <div className="relative mb-6">
                <div className="w-44 h-44 rounded-full border-8 border-[#FFDBB6] bg-white flex items-center justify-center group-hover:border-[#F7A5A5] transition-colors duration-300">
                    <span className="font-cairo text-3xl font-bold text-[#1A2A4F]">مريض</span>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-[#1A2A4F] mb-2 font-cairo">أنا مريض</h2>
            <p className="text-gray-500 mb-8 flex-grow">فهم تقاريرك الصحية والحصول على إجابات لأسئلتك بكل سهولة.</p>
            <button className="bg-[#1A2A4F] text-white font-semibold py-3 px-10 rounded-full group-hover:bg-[#F7A5A5] transition-colors duration-300 text-lg">
              بوابة المريض
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;