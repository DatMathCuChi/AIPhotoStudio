import React from 'react';
import { EditSettings } from '@/src/types';
import ComparisonSlider from './ComparisonSlider';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface CanvasAreaProps {
  originalImage: string;
  processedImage: string | null;
  settings: EditSettings;
  isProcessing: boolean;
}

export default function CanvasArea({ originalImage, processedImage, settings, isProcessing }: CanvasAreaProps) {
  // Apply settings via CSS filters for preview
  const filterStyle = {
    filter: `
      brightness(${settings.brightness}%) 
      contrast(${settings.contrast}%) 
      saturate(${settings.saturation}%) 
      blur(${settings.sharpness / 50}px)
      ${getFilterCSS(settings.filter)}
    `,
    transform: `
      rotate(${settings.rotation}deg) 
      scaleX(${settings.flipX ? -1 : 1}) 
      scaleY(${settings.flipY ? -1 : 1})
    `,
  };

  function getFilterCSS(filter: string) {
    switch (filter) {
      case 'vintage': return 'sepia(0.5) hue-rotate(-30deg) saturate(0.8)';
      case 'cinematic': return 'contrast(1.2) saturate(1.1) brightness(0.9) sepia(0.2)';
      case 'mono': return 'grayscale(1)';
      case 'beauty': return 'brightness(1.1) saturate(1.2) contrast(0.9)';
      case 'warm': return 'sepia(0.3) saturate(1.2) hue-rotate(10deg)';
      case 'cool': return 'hue-rotate(180deg) saturate(1.2) brightness(1.1)';
      default: return '';
    }
  }

  return (
    <div className="flex-1 bg-black/10 flex flex-col relative overflow-hidden p-8">
      {/* Canvas Header/Tools */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-full z-30 flex items-center gap-6 shadow-2xl">
        <div className="flex items-center gap-3 pr-6 border-r border-white/10">
          <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all"><ZoomIn className="w-4 h-4" /></button>
          <span className="text-[10px] font-mono text-white/60">100%</span>
          <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all"><ZoomOut className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center gap-3 pr-6 border-r border-white/10">
          <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all"><Maximize2 className="w-4 h-4" /></button>
        </div>
        <div className="text-[10px] font-medium text-white/40 tracking-wider uppercase">
          {processedImage ? 'Chế độ so sánh' : 'Chế độ chỉnh sửa'}
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 flex items-center justify-center relative">
        {isProcessing && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-1 w-48 bg-white/10 rounded-full overflow-hidden">
               <div className="h-full bg-orange-500 animate-[loading_2s_infinite]" style={{ width: '30%' }} />
            </div>
            <p className="text-orange-500 text-xs font-bold tracking-widest uppercase animate-pulse">Đang xử lý tác phẩm...</p>
          </div>
        )}

        {processedImage ? (
          <div className="w-full h-full max-w-4xl max-h-full">
            <ComparisonSlider original={originalImage} modified={processedImage} />
          </div>
        ) : (
          <div className="w-full h-full max-w-4xl max-h-full flex items-center justify-center p-4">
            <div 
              style={filterStyle} 
              className="relative w-full h-full transition-all duration-300 ease-out shadow-2xl rounded-xl overflow-hidden"
            >
              <img 
                src={originalImage} 
                alt="Main" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
