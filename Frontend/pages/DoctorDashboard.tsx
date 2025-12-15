import React, { useState, useRef, useEffect } from 'react';

// Simple Markdown Renderer Component
const MarkdownRenderer = ({ content }) => {
  const renderMarkdown = (text) => {
    // Replace **bold** with <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#1A2A4F]">$1</strong>');
    
    // Replace *italic* with <em>
    text = text.replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>');
    
    // Replace `code` with <code>
    text = text.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-[#F7A5A5]">$1</code>');
    
    // Replace headings
    text = text.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-[#1A2A4F] mb-1 mt-2">$1</h3>');
    text = text.replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-[#1A2A4F] mb-2 mt-3">$1</h2>');
    text = text.replace(/^# (.*$)/gim, '<h1 class="text-xl font-bold text-[#1A2A4F] mb-2 mt-3">$1</h1>');
    
    // Replace bullet lists
    text = text.replace(/^\- (.*$)/gim, '<li class="mb-1 mr-4">• $1</li>');
    text = text.replace(/(<li.*<\/li>)/s, '<ul class="list-none mb-2 space-y-1">$1</ul>');
    
    // Replace numbered lists
    text = text.replace(/^\d+\. (.*$)/gim, '<li class="mb-1 mr-4">$1</li>');
    
    // Replace line breaks
    text = text.replace(/\n\n/g, '</p><p class="mb-2 leading-relaxed">');
    text = text.replace(/\n/g, '<br/>');
    
    return text;
  };

  return (
    <div 
      className="markdown-content prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: `<p class="mb-2 leading-relaxed">${renderMarkdown(content)}</p>` }}
    />
  );
};

const BrainCircuitIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <path d="M12 7v2m0 6v2m5-5h-2m-6 0H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const RAG_API_URL = "https://3fe64782a576.ngrok-free.app/ask";
const CV_API_URL = "https://waspier-rowen-semialcoholic.ngrok-free.dev/predict";

const DoctorDashboard = () => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [gradcamImage, setGradcamImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const [ragApiStatus, setRagApiStatus] = useState('checking');
  const [cvApiStatus, setCvApiStatus] = useState('checking');
  
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Check both APIs health on component mount
  useEffect(() => {
    const checkHealth = async () => {
      // Check RAG API
      try {
        const response = await fetch(`${RAG_API_URL.replace('/ask', '/health')}`, {
          method: 'GET',
        });
        if (response.ok) {
          setRagApiStatus('online');
        } else {
          setRagApiStatus('offline');
        }
      } catch (error) {
        setRagApiStatus('offline');
        console.error('RAG API is offline:', error);
      }

      // Check CV API
      try {
        const response = await fetch(`${CV_API_URL.replace('/predict', '/health')}`, {
          method: 'GET',
        });
        if (response.ok) {
          setCvApiStatus('online');
        } else {
          setCvApiStatus('offline');
        }
      } catch (error) {
        setCvApiStatus('offline');
        console.error('CV API is offline:', error);
      }
    };
    checkHealth();
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory, isChatting]);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setAnalysisResult('');
        setGradcamImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setAnalysisResult('');
    setGradcamImage(null);
    
    try {
      // Convert base64 to blob
      const base64Data = image.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      
      // Create FormData and send to API
      const formData = new FormData();
      formData.append('file', blob, imageName || 'brain_mri.jpg');
      
      const response = await fetch(CV_API_URL, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Format the analysis result: only top prediction and confidence
        let result = `**🔬 Image Diagnosis:**\n\n`;
        result += `**Prediction:** ${data.predicted_class}\n`;
       
        
        setAnalysisResult(result);
        
        // Set Grad-CAM image
        if (data.gradcam_image) {
          setGradcamImage(`data:image/jpeg;base64,${data.gradcam_image}`);
        }
      } else {
        setAnalysisResult('❌ حدث خطأ في التحليل. الرجاء المحاولة مرة أخرى.');
      }
      
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisResult('❌ خطأ في الاتصال بالسيرفر. تأكد من أن Colab شغال والرابط صحيح.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newUserMessage = { role: 'user', content: userMessage };
    const currentChatHistory = [...chatHistory, newUserMessage];
    
    setChatHistory(currentChatHistory);
    setUserMessage('');
    setIsChatting(true);
    
    try {
      const response = await fetch(RAG_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userMessage,
          top_k: 5,
          verbose: false
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      let formattedAnswer = data.answer;
      
      if (data.sources_used > 0) {
        formattedAnswer += `\n\n📚 Sources used: ${data.sources_used}`;
        formattedAnswer += `\n⏱️ Processing time: ${data.processing_time}s`;
      }
      
      const modelMessage = { 
        role: 'model', 
        content: formattedAnswer
      };
      setChatHistory(prev => [...prev, modelMessage]);

    } catch (error) {
      console.error("Error fetching RAG response:", error);
      const errorMessage = { 
        role: 'model', 
        content: 'Sorry, there was an error connecting to the medical database. Please make sure Colab is running.' 
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 md:p-8">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-4xl font-bold text-[#1A2A4F]">Doctor Dashboard</h1>
        
        {/* API Status Indicators */}
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <div className={`w-3 h-3 rounded-full ${
              cvApiStatus === 'online' ? 'bg-green-500 animate-pulse' : 
              cvApiStatus === 'offline' ? 'bg-red-500' : 
              'bg-yellow-500 animate-pulse'
            }`}></div>
            <span className="text-sm font-medium text-gray-700">
              {cvApiStatus === 'online' ? 'CV Model' : 
               cvApiStatus === 'offline' ? 'CV Offline' : 
               'Checking CV...'}
            </span>
          </div>
          
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
            <div className={`w-3 h-3 rounded-full ${
              ragApiStatus === 'online' ? 'bg-green-500 animate-pulse' : 
              ragApiStatus === 'offline' ? 'bg-red-500' : 
              'bg-yellow-500 animate-pulse'
            }`}></div>
            <span className="text-sm font-medium text-gray-700">
              {ragApiStatus === 'online' ? 'RAG System' : 
               ragApiStatus === 'offline' ? 'RAG Offline' : 
               'Checking RAG...'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Medical Image Analysis */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex items-center mb-6">
            <BrainCircuitIcon className="w-8 h-8 text-[#1A2A4F] mr-3" />
            <h2 className="text-2xl font-bold">Medical Image Analysis</h2>
          </div>
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#1A2A4F] transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" ref={fileInputRef} />
            {image ? (
              <img src={image} alt="Medical scan" className="max-h-60 mx-auto rounded-md" />
            ) : (
              <div className="py-8">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-500">Click to upload Brain MRI image</p>
              </div>
            )}
          </div>
          {imageName && <p className="text-center mt-4 text-sm text-gray-600 font-medium">📄 {imageName}</p>}
          
          <button 
            onClick={handleAnalyze} 
            disabled={!image || isAnalyzing || cvApiStatus === 'offline'}
            className="w-full mt-6 bg-[#1A2A4F] text-white font-bold py-3 rounded-lg hover:bg-[#F7A5A5] disabled:bg-gray-400 transition-colors"
          >
            {isAnalyzing ? '⏳ Analyzing...' : '🔍 Analyze Image'}
          </button>
          
          {cvApiStatus === 'offline' && (
            <div className="mt-3 text-xs text-red-600 bg-red-50 p-2 rounded-md text-center">
              ⚠️ CV Model is offline. Make sure Colab is running
            </div>
          )}
          
          {analysisResult && (
            <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h3 className="font-bold mb-3 text-lg text-[#1A2A4F]">📋 Analysis Report:</h3>
              <div className="text-gray-800">
                <MarkdownRenderer content={analysisResult} />
              </div>
            </div>
          )}
          
          {gradcamImage && (
            <div className="mt-6">
              <h3 className="font-bold mb-3 text-lg text-[#1A2A4F]">🎨 Grad-CAM Visualization:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-sm font-medium mb-2 text-gray-600">Original Image</p>
                  <img src={image} alt="Original" className="w-full rounded-lg border-2 border-gray-200" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium mb-2 text-gray-600">Grad-CAM Heatmap</p>
                  <img src={gradcamImage} alt="Grad-CAM" className="w-full rounded-lg border-2 border-purple-300" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Doctor Assist Chatbot with RAG */}
        <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col h-[calc(100vh-220px)]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4 border-b pb-4">
            <div className="flex items-center">
              <BrainCircuitIcon className="w-8 h-8 text-[#F7A5A5] mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-[#1A2A4F]">AI Medical Assistant</h2>
                <p className="text-sm text-gray-500">Advanced Medical Database - RAG System</p>
              </div>
            </div>
            {ragApiStatus === 'online' && (
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                ✓ RAG Powered
              </span>
            )}
          </div>
          
          {/* Chat Area */}
          <div ref={chatContainerRef} className="flex-grow bg-slate-50 rounded-lg p-4 overflow-y-auto mb-4">
            {chatHistory.length === 0 && (
              <div className="h-full flex flex-col justify-center items-center text-center text-gray-500 opacity-70">
                <BrainCircuitIcon className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-xl font-bold mb-2">Hello Doctor!</p>
                <p>I'm here to help you find accurate medical information</p>
                <p className="text-sm mt-2">Ask me about medications, diseases, treatment protocols...</p>
              </div>
            )}
            
            {chatHistory.map((msg, index) => (
              <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl shadow-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#1A2A4F] text-white rounded-br-none text-left' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none text-left'
                  }`}
                >
                  <p className={`text-xs font-bold mb-2 ${msg.role === 'user' ? 'text-blue-200' : 'text-[#F7A5A5]'}`}>
                    {msg.role === 'user' ? 'You' : 'Medical Assistant'}
                  </p>
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <MarkdownRenderer content={msg.content} />
                  )}
                </div>
              </div>
            ))}
            
            {isChatting && (
              <div className="flex justify-start">
                <div className="p-4 rounded-2xl bg-white border border-gray-200 rounded-bl-none shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-200">
            <input 
              type="text" 
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isChatting && handleSendMessage()}
              placeholder="Ask about medical information..." 
              className="flex-grow p-3 bg-transparent focus:outline-none text-left placeholder-gray-400"
              disabled={isChatting || ragApiStatus === 'offline'}
            />
            
            <button 
              onClick={handleSendMessage} 
              disabled={isChatting || !userMessage.trim() || ragApiStatus === 'offline'}
              className={`p-3 rounded-full transition-all duration-300 ${
                !userMessage.trim() || isChatting || ragApiStatus === 'offline'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#F7A5A5] text-white hover:bg-[#1A2A4F] shadow-md transform hover:scale-105'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform -rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>

          {ragApiStatus === 'offline' && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded-md text-center">
              ⚠️ RAG Database is offline. Make sure Colab is running
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;