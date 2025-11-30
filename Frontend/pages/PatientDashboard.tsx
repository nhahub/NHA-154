import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types'; 
import { analyzeMedicalImage } from '../services/geminiService';
import { MessageSquareHeartIcon } from '../components/IconComponents';
//This URL is the endpoint of the Shifaa API hosted on ngrok so This url change every time the ngrok restarts from colap code
const SHIFAA_API_URL = "https://b0317b5e413b.ngrok-free.app/ask"; 

const PatientDashboard: React.FC = () => {
  const [report, setReport] = useState<string | null>(null);
  const [reportName, setReportName] = useState<string>('');
  const [isAnalyzingReport, setIsAnalyzingReport] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [isChatting, setIsChatting] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [chatHistory, isChatting]);

  const handleReportUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setReportName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setReport(reader.result as string);
        explainReport(reader.result as string, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const explainReport = async (fileDataUrl: string, fileType: string) => {
    setIsAnalyzingReport(true);
    const base64Data = fileDataUrl.split(',')[1];
    
    const initialPrompt = "لقد قمت برفع تقرير طبي. هل يمكنك شرحه لي بلغة بسيطة ومفهومة؟";
    
    if (fileType.startsWith('image/')) {
        const updatedChatHistory = [...chatHistory, {role: 'user', content: initialPrompt}];
        setChatHistory(updatedChatHistory);
        setIsChatting(true);
        try {
            const result = await analyzeMedicalImage(base64Data, "This is a patient's medical scan. Please explain the findings in simple, easy-to-understand Arabic. Be reassuring.");
            const modelMessage: ChatMessage = { role: 'model', content: result };
            setChatHistory(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage: ChatMessage = { role: 'model', content: 'واجهت مشكلة في قراءة صورة التقرير. هل يمكنك محاولة رفع صورة أوضح؟' };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsAnalyzingReport(false);
            setIsChatting(false);
        }
    } else {
        const textMessage: ChatMessage = { role: 'model', content: "لقد استلمت تقريرك. سأقوم بتحليله حالاً... (هذه الميزة تحت التطوير للملفات غير الصور)" };
        setChatHistory(prev => [...prev, textMessage]);
        setIsAnalyzingReport(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newUserMessage: ChatMessage = { role: 'user', content: userMessage };
    const currentChatHistory = [...chatHistory, newUserMessage];
    
    setChatHistory(currentChatHistory);
    setUserMessage(''); 
    setIsChatting(true);

    try {
       
        const recentMessages = chatHistory.slice(-4); 
        
        let contextString = "";
        recentMessages.forEach(msg => {
            const roleName = msg.role === 'user' ? 'المريض' : 'شِفاء';
            contextString += `${roleName}: ${msg.content}\n`;
        });

        const fullPrompt = `${contextString}\nالمريض: ${newUserMessage.content}`;

        const response = await fetch(SHIFAA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: fullPrompt, 
                max_length: 512,
                temperature: 0.2,
                top_p: 0.95
            })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        
        const modelMessage: ChatMessage = { role: 'model', content: data.answer };
        setChatHistory(prev => [...prev, modelMessage]);

    } catch (error) {
        console.error("Error fetching chatbot response:", error);
        const errorMessage: ChatMessage = { role: 'model', content: 'عذراً، حدث خطأ في الاتصال بالخادم الطبي. يرجى التأكد من تشغيل Colab.' };
        setChatHistory(prev => [...prev, errorMessage]);
    } finally {
        setIsChatting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 md:p-8" dir="rtl">
      <h1 className="text-4xl font-bold mb-8 text-[#1A2A4F] font-cairo text-right">لوحة تحكم المريض</h1>
      
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col h-[calc(100vh-220px)]">
        
        {/* Header */}
        <div className="flex items-center mb-4 border-b pb-4">
          <MessageSquareHeartIcon className="w-8 h-8 text-[#F7A5A5] ml-3" />
          <div>
            <h2 className="text-2xl font-bold text-[#1A2A4F]">مساعدك الطبي "شِفاء"</h2>
            <p className="text-sm text-gray-500">متاح للإجابة على استفساراتك وتحليل التقارير</p>
          </div>
        </div>
        
        {/* Chat Area */}
        <div ref={chatContainerRef} className="flex-grow bg-slate-50 rounded-lg p-4 overflow-y-auto mb-4 custom-scrollbar">
          {chatHistory.length === 0 && (
             <div className="h-full flex flex-col justify-center items-center text-center text-gray-500 opacity-70">
                <MessageSquareHeartIcon className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-xl font-bold mb-2">مرحباً بك!</p>
                <p>أنا هنا لمساعدتك. يمكنك سؤالي عن الأعراض، الأدوية، أو رفع تقرير طبي.</p>
             </div>
          )}
          
          {chatHistory.map((msg, index) => (
            <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
              <div 
                className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl shadow-sm text-right whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-[#1A2A4F] text-white rounded-br-none' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className={`text-xs font-bold mb-1 ${msg.role === 'user' ? 'text-blue-200' : 'text-[#F7A5A5]'}`}>
                    {msg.role === 'user' ? 'أنت' : 'د. شِفاء'}
                </p>
                {msg.content}
              </div>
            </div>
          ))}
          
          {(isChatting || isAnalyzingReport) && (
            <div className="flex justify-end">
                <div className="p-4 rounded-2xl bg-white border border-gray-200 rounded-bl-none shadow-sm">
                    <div className="flex space-x-1 space-x-reverse">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200">
          <input 
            type="text" 
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isChatting && handleSendMessage()}
            placeholder="اكتب رسالتك هنا..." 
            className="flex-grow p-3 bg-transparent focus:outline-none text-right placeholder-gray-400"
            disabled={isChatting || isAnalyzingReport}
          />
          
          <div className="h-8 w-px bg-gray-300 mx-1"></div>

          <input type="file" onChange={handleReportUpload} className="hidden" ref={fileInputRef} accept="image/*,.pdf" />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-[#1A2A4F] hover:bg-gray-200 rounded-full transition-all"
            title="رفع تقرير طبي"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          
          <button 
            onClick={handleSendMessage} 
            disabled={isChatting || isAnalyzingReport || !userMessage.trim()}
            className={`p-3 rounded-full transition-all duration-300 ${
                !userMessage.trim() || isChatting 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-[#F7A5A5] text-white hover:bg-[#1A2A4F] shadow-md transform hover:scale-105'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform -rotate-90" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        
        {reportName && (
            <div className="mt-2 text-xs text-green-600 bg-green-50 p-2 rounded-md inline-flex items-center w-fit">
                <span>تم إرفاق الملف: {reportName}</span>
                <span className="mr-2 cursor-pointer text-red-500" onClick={() => setReportName('')}>✖</span>
            </div>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;