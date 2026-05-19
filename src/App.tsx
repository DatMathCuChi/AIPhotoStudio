import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import UploadArea from './components/UploadArea';
import CanvasArea from './components/CanvasArea';
import BasicEditor from './components/BasicEditor';
import AIEditor from './components/AIEditor';
import { ToolType, EditSettings, DEFAULT_SETTINGS, HistoryItem } from './types';
import { Sparkles, Download, Undo2, Redo2, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import TemplateGallery from './components/TemplateGallery';
import AccountPanel from './components/AccountPanel';

import HomeView from './components/HomeView';

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolType>('home');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [settings, setSettings] = useState<EditSettings>(DEFAULT_SETTINGS);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAiDemo, setIsAiDemo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check health on load
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setIsAiDemo(!data.aiEnabled);
      })
      .catch(() => setIsAiDemo(true));
  }, []);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      setProcessedImage(null);
      setSettings(DEFAULT_SETTINGS);
      setActiveTool('basic');
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAIEdit = async (prompt: string, mode: string) => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const response = await fetch('/api/ai/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, image: originalImage, mode }),
      });
      
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      setProcessedImage(data.image);
      setActiveTool('ai');
      
      // Save to history
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        image: data.image,
        settings: { ...settings },
        timestamp: Date.now(),
        type: 'ai',
        prompt
      };
      setHistory(prev => [newItem, ...prev]);
    } catch (err: any) {
      setError(err.message || 'AI processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetImage = () => {
    setSettings(DEFAULT_SETTINGS);
    setProcessedImage(null);
  };

  const renderActivePanel = () => {
    switch (activeTool) {
      case 'basic':
        return <BasicEditor settings={settings} setSettings={setSettings} onReset={resetImage} />;
      case 'ai':
        return <AIEditor onGenerate={handleAIEdit} isProcessing={isProcessing} />;
      case 'templates':
        return <TemplateGallery />;
      case 'export':
        return (
          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-white/90">Xuất ảnh</h4>
            <div className="p-4 rounded-xl bg-white/5 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-white/40 uppercase font-bold">Định dạng</label>
                <div className="flex gap-2">
                  {['PNG', 'JPG', 'WebP'].map(f => (
                    <button key={f} className="flex-1 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-white hover:bg-white/10">{f}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-white/40 uppercase font-bold">Chất lượng</label>
                <input type="range" className="w-full h-1 accent-orange-500 bg-white/10 rounded-lg appearance-none" />
              </div>
            </div>
            <button className="w-full py-3 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-orange-500/10">
              <Download className="w-4 h-4" />
              Tải xuống bản gốc
            </button>
          </div>
        );
      case 'history':
        return (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white/90">Lịch sử chỉnh sửa</h4>
            {history.length === 0 ? (
              <div className="text-center py-12 text-white/20 text-xs italic">Chưa có lịch sử</div>
            ) : (
              <div className="space-y-3">
                {history.map(item => (
                  <div key={item.id} onClick={() => setProcessedImage(item.image)} className="p-2 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 cursor-pointer transition-all flex gap-3">
                    <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-white font-medium truncate">{item.prompt || 'Chỉnh sửa thủ công'}</p>
                      <p className="text-[8px] text-white/30 uppercase mt-1">{new Date(item.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-40">
             <Info className="w-8 h-8 mb-4" />
             <p className="text-xs">Chọn công cụ để bắt đầu chỉnh sửa</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans selection:bg-orange-500 selection:text-white overflow-hidden">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/20 backdrop-blur-md z-50">
          <div className="flex items-center gap-4">
            {originalImage && (
              <div className="flex items-center gap-1">
                <button className="p-2 text-white/40 hover:text-white disabled:opacity-20"><Undo2 className="w-4 h-4" /></button>
                <button className="p-2 text-white/40 hover:text-white disabled:opacity-20"><Redo2 className="w-4 h-4" /></button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAiDemo && (
              <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] text-orange-500 font-bold uppercase tracking-wider">Chế độ AI Demo</span>
              </div>
            )}
            
            {originalImage && (
              <button 
                onClick={() => setActiveTool('export')}
                className="px-4 py-1.5 bg-white text-black font-bold text-xs rounded-lg hover:bg-orange-500 hover:text-white transition-all shadow-lg shadow-white/5"
              >
                Xuất file
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Working Area */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!originalImage || activeTool === 'home' ? (
                <motion.div 
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 overflow-hidden flex flex-col"
                >
                  <HomeView onUpload={handleUpload} />
                </motion.div>
              ) : activeTool === 'upload' ? (
                <motion.div 
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 overflow-y-auto"
                >
                  <UploadArea onUpload={handleUpload} />
                </motion.div>
              ) : (
                <motion.div 
                  key="canvas"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  {activeTool === 'account' ? (
                    <AccountPanel />
                  ) : (
                    <CanvasArea 
                      originalImage={originalImage} 
                      processedImage={processedImage} 
                      settings={settings}
                      isProcessing={isProcessing}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {error && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 p-4 bg-red-500 text-white rounded-2xl flex items-center gap-3 shadow-2xl z-[60]">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{error}</span>
                <button onClick={() => setError(null)} className="ml-4 text-white/50 hover:text-white">✕</button>
              </div>
            )}
          </div>

          {/* Right Panel */}
          {originalImage && activeTool !== 'home' && activeTool !== 'upload' && activeTool !== 'account' && (
            <aside className="w-[320px] border-l border-white/5 bg-black/40 backdrop-blur-xl p-6 overflow-y-auto custom-scrollbar">
              {renderActivePanel()}
            </aside>
          )}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
