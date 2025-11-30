
import React, { useState, useCallback, useRef } from 'react';
import { ChatMessage } from '../types';
import { analyzeMedicalImage, getChatbotResponse } from '../services/geminiService';
import { BrainCircuitIcon } from '../components/IconComponents';

const DoctorDashboard: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userMessage, setUserMessage] = useState<string>('');
  const [isChatting, setIsChatting] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setAnalysisResult('');
    try {
      const base64Data = image.split(',')[1];
      const result = await analyzeMedicalImage(base64Data, "Analyze this medical image for any anomalies like tumors or fractures. Provide a detailed report for a medical professional.");
      setAnalysisResult(result);
    } catch (error) {
      console.error(error);
      setAnalysisResult('An error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newUserMessage: ChatMessage = { role: 'user', content: userMessage };
    const updatedChatHistory = [...chatHistory, newUserMessage];
    setChatHistory(updatedChatHistory);
    setUserMessage('');
    setIsChatting(true);
    
    try {
        const response = await getChatbotResponse(updatedChatHistory, 'doctor');
        const modelMessage: ChatMessage = { role: 'model', content: response };
        setChatHistory(prev => [...prev, modelMessage]);
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
        const errorMessage: ChatMessage = { role: 'model', content: 'Sorry, I encountered an error. Please try again.' };
        setChatHistory(prev => [...prev, errorMessage]);
    } finally {
        setIsChatting(false);
        setTimeout(() => {
            chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
        }, 100);
    }
  };

  return (
    <div className="container mx-auto p-6 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-[#1A2A4F] font-cairo">لوحة تحكم الطبيب</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Medical Image Analysis */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center mb-6">
            <BrainCircuitIcon className="w-8 h-8 text-[#1A2A4F] mr-3" />
            <h2 className="text-2xl font-bold">تحليل الصور الطبية</h2>
          </div>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#1A2A4F] transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
            {image ? (
              <img src={image} alt="Medical scan" className="max-h-60 mx-auto rounded-md" />
            ) : (
              <p className="text-gray-500">انقر لتحميل صورة أشعة سينية أو رنين مغناطيسي</p>
            )}
          </div>
          {imageName && <p className="text-center mt-4 text-sm text-gray-600">{imageName}</p>}
          <button 
            onClick={handleAnalyze} 
            disabled={!image || isAnalyzing}
            className="w-full mt-6 bg-[#1A2A4F] text-white font-bold py-3 rounded-lg hover:bg-[#F7A5A5] disabled:bg-gray-400 transition-colors"
          >
            {isAnalyzing ? '...جاري التحليل' : 'تحليل الصورة'}
          </button>
          {analysisResult && (
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <h3 className="font-bold mb-2">تقرير التحليل:</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{analysisResult}</p>
            </div>
          )}
        </div>

        {/* Doctor Assist Chatbot */}
        <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col">
          <h2 className="text-2xl font-bold mb-4">مساعد الطبيب الذكي</h2>
          <div ref={chatContainerRef} className="flex-grow bg-slate-50 rounded-lg p-4 h-96 overflow-y-auto mb-4">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-[#1A2A4F] text-white' : 'bg-gray-200 text-[#1A2A4F]'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
             {isChatting && (
              <div className="flex justify-start">
                  <div className="p-3 rounded-lg bg-gray-200 text-[#1A2A4F]">
                      <span className="animate-pulse">...</span>
                  </div>
              </div>
            )}
          </div>
          <div className="flex">
            <input 
              type="text" 
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isChatting && handleSendMessage()}
              placeholder="اسأل عن نتائج التحاليل، الملخصات..." 
              className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#1A2A4F]"
            />
            <button 
              onClick={handleSendMessage} 
              disabled={isChatting}
              className="bg-[#1A2A4F] text-white px-6 py-3 rounded-r-lg hover:bg-[#F7A5A5] disabled:bg-gray-400"
            >
              إرسال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
