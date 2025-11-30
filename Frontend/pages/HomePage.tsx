
import React from 'react';
import { Page } from '../types';
import { BrainCircuitIcon, StethoscopeIcon, MessageSquareHeartIcon } from '../components/IconComponents';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative bg-[#1A2A4F] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-black opacity-40"></div>
         <img src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2136&auto=format&fit=crop" alt="Healthcare AI" className="absolute inset-0 w-full h-full object-cover opacity-30"/>
        <div className="container mx-auto px-6 text-center relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slideInUp font-cairo">
            رعاية صحية ذكية في متناول يدك
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto animate-slideInUp animation-delay-300">
            "طبيبك" يستخدم قوة الذكاء الاصطناعي ليقدم لك فهمًا أعمق لصحتك، ويربطك بالرعاية التي تحتاجها بكل سهولة.
          </p>
          <button 
            onClick={() => onNavigate('login')}
            className="bg-[#F7A5A5] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-[#F7A5A5] transition-all transform hover:scale-105 animate-slideInUp animation-delay-600"
          >
            ابدأ رحلتك الصحية
          </button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-[#FFF2EF]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A2A4F] font-cairo">لماذا الرعاية الصحية الاستباقية هي الأهم؟</h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              في عالم سريع الخطى، لم تعد الرعاية الصحية تقتصر على علاج الأمراض فقط، بل تتعلق بالحفاظ على العافية والوقاية منها. "طبيبك" هو شريكك في التحول من الرعاية التفاعلية إلى الاستباقية.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-[#FFDBB6] rounded-lg transform -rotate-3"></div>
              <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" alt="Doctor explaining to patient" className="rounded-lg shadow-2xl relative z-10" />
            </div>
            <div className="pr-4">
              <h3 className="text-2xl font-bold mb-4 text-[#1A2A4F]">تمكينك بالمعرفة</h3>
              <p className="text-gray-700 mb-6">
                نحن نؤمن بأن فهمك لصحتك هو الخطوة الأولى نحو حياة أفضل. منصتنا مصممة لترجمة البيانات الطبية المعقدة إلى رؤى واضحة وقابلة للتنفيذ.
              </p>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center">
                  <span className="bg-[#F7A5A5] text-white rounded-full p-2 mr-4">&#10003;</span>
                  <span>احصل على شرح مبسط لتقاريرك الطبية وتحاليلك.</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-[#F7A5A5] text-white rounded-full p-2 mr-4">&#10003;</span>
                  <span>تواصل مع مساعدنا الذكي لطرح الأسئلة الصحية في أي وقت.</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-[#F7A5A5] text-white rounded-full p-2 mr-4">&#10003;</span>
                  <span>أدوات متقدمة للأطباء لتحليل البيانات الطبية بكفاءة.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A2A4F] font-cairo">منصة متكاملة لصحتك</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              نقدم مجموعة من الأدوات الذكية المصممة لدعم كل من الأطباء والمرضى في رحلتهم الصحية.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1: Medical Image Analysis */}
            <div className="flip-card h-[400px]">
              <div className="flip-card-inner rounded-xl shadow-lg">
                <div className="flip-card-front bg-white p-8 text-center border-t-4 border-[#FFDBB6] flex flex-col justify-center">
                  <div className="bg-[#FFDBB6] text-[#1A2A4F] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <BrainCircuitIcon className="w-10 h-10"/>
                  </div>
                  <h3 className="text-xl font-bold mb-2">تحليل الصور الطبية</h3>
                  <p className="text-gray-600">
                    استخدام نماذج رؤية حاسوبية متطورة للمساعدة في الكشف عن الأمراض من الصور الطبية مثل الأشعة السينية، مع تقديم تشخيصات وتصورات دقيقة.
                  </p>
                </div>
                <div className="flip-card-back bg-[#1A2A4F] text-white p-8 flex flex-col justify-center items-center text-center">
                  <img src="https://images.unsplash.com/photo-1579154233481-b59355720a4e?q=80&w=1974&auto=format&fit=crop" alt="Medical Scan" className="absolute top-0 left-0 w-full h-full object-cover opacity-20"/>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold font-cairo">تقنية متقدمة</h3>
                    <p className="text-lg mt-2 text-[#FFDBB6]">تشخيص أدق لمستقبل أكثر صحة.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Smart Doctor Assistant */}
            <div className="flip-card h-[400px]">
              <div className="flip-card-inner rounded-xl shadow-lg">
                <div className="flip-card-front bg-white p-8 text-center border-t-4 border-[#F7A5A5] flex flex-col justify-center">
                  <div className="bg-[#F7A5A5] text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <StethoscopeIcon className="w-10 h-10"/>
                  </div>
                  <h3 className="text-xl font-bold mb-2">مساعد الطبيب الذكي</h3>
                  <p className="text-gray-600">
                    مساعد ذكاء اصطناعي للأطباء لتحليل نتائج الفحوصات، وإنشاء التقارير الطبية، وشرح النتائج المعقدة بطريقة واضحة ومهنية.
                  </p>
                </div>
                <div className="flip-card-back bg-[#1A2A4F] text-white p-8 flex flex-col justify-center items-center text-center">
                  <img src="https://images.unsplash.com/photo-1618498082410-b4aa22193b38?q=80&w=2070&auto=format&fit=crop" alt="Doctor with Tablet" className="absolute top-0 left-0 w-full h-full object-cover opacity-20"/>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold font-cairo">رؤى ذكية</h3>
                    <p className="text-lg mt-2 text-[#FFDBB6]">قرارات أسرع لرعاية أفضل.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Friendly Patient Assistant */}
             <div className="flip-card h-[400px]">
              <div className="flip-card-inner rounded-xl shadow-lg">
                <div className="flip-card-front bg-white p-8 text-center border-t-4 border-[#FFDBB6] flex flex-col justify-center">
                  <div className="bg-[#FFDBB6] text-[#1A2A4F] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <MessageSquareHeartIcon className="w-10 h-10"/>
                  </div>
                  <h3 className="text-xl font-bold mb-2">مساعد المريض الودود</h3>
                  <p className="text-gray-600">
                    مساعد افتراضي للمرضى لفهم تقاريرهم الطبية بلغة بسيطة، مع إمكانية التفاعل الصوتي بلغات متعددة لتسهيل الوصول للمعلومة.
                  </p>
                </div>
                <div className="flip-card-back bg-[#1A2A4F] text-white p-8 flex flex-col justify-center items-center text-center">
                  <img src="https://images.unsplash.com/photo-1531185038189-41815d864f32?q=80&w=2070&auto=format&fit=crop" alt="Happy Patients" className="absolute top-0 left-0 w-full h-full object-cover opacity-20"/>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold font-cairo">صحتك بلغتك</h3>
                    <p className="text-lg mt-2 text-[#FFDBB6]">تواصل بسيط، فهم أعمق.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;