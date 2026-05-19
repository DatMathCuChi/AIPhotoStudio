import React, { useState, useEffect, useRef } from 'react';
import { EditSettings } from '@/src/types';

interface ComparisonSliderProps {
  original: string;
  modified: string;
}

export default function ComparisonSlider({ original, modified }: ComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden rounded-xl bg-black/20"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={original} 
          alt="Original" 
          className="w-full h-full object-contain pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] text-white font-bold uppercase tracking-widest z-10">
          Trước
        </div>
      </div>

      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
      >
        <img 
          src={modified} 
          alt="Modified" 
          className="w-full h-full object-contain pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 px-2 py-1 bg-orange-500 backdrop-blur-md rounded text-[10px] text-white font-bold uppercase tracking-widest z-10">
          Sau
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 group"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-gray-400" />
            <div className="w-0.5 h-3 bg-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
