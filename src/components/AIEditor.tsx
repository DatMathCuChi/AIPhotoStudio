import React, { useState } from 'react';
import { Sparkles, Send, Eraser, Image as ImageIcon, Zap, Wand2, Frame, Palette } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'motion/react';

interface AIEditorProps {
  onGenerate: (prompt: string, mode: string) => void;
  isProcessing: boolean;
}

const AI_TOOLS = [
  { id: 'cleanup', label: 'Xóa vật thể', icon: Eraser, prompt: 'Xóa các vật thể gây xao nhãng khỏi ảnh' },
  { id: 'bg-replace', label: 'Thay nền AI', icon: ImageIcon, prompt: 'Thay nền bằng khung cảnh thành phố điện ảnh mờ ảo vào ban đêm' },
  { id: 'upscale', label: 'Nâng chất lượng', icon: Zap, prompt: 'Tăng độ phân giải và làm sắc nét các chi tiết' },
  { id: 'style', label: 'Đổi phong cách', icon: Palette, prompt: 'Chuyển sang phong cách anime Studio Ghibli' },
  { id: 'restore', label: 'Phục chế ảnh cũ', icon: Wand2, prompt: 'Khôi phục màu sắc và sửa vết xước từ bức ảnh cũ này' },
  { id: 'expand', label: 'Mở rộng khung', icon: Frame, prompt: 'Mở rộng các cạnh để tạo khung hình điện ảnh 16:9' },
];

const PRESETS = [
  "Chân dung Studio chuyên nghiệp",
  "Nền quán cà phê Nhật Bản",
  "Sản phẩm nền trắng sạch sẽ",
  "Phong cách phim Cinematic",
  "Poster quảng cáo cao cấp",
];

export default function AIEditor({ onGenerate, isProcessing }: AIEditorProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedTool, setSelectedTool] = useState('');

  const handleToolClick = (tool: typeof AI_TOOLS[0]) => {
    setSelectedTool(tool.id);
    setPrompt(tool.prompt);
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-white/90">Công cụ AI nhanh</h4>
        <div className="grid grid-cols-2 gap-3">
          {AI_TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center",
                selectedTool === tool.id 
                  ? "bg-orange-500/10 border-orange-500 text-orange-500" 
                  : "bg-white/[0.02] border-white/5 text-white/40 hover:border-white/20 hover:text-white/60"
              )}
            >
              <tool.icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium leading-tight">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <h4 className="text-sm font-semibold text-white/90">Lệnh Prompt đặc biệt</h4>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Mô tả những gì bạn muốn thay đổi..."
            className="w-full h-32 p-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none placeholder:text-white/20 transition-all font-mono"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <div className="px-2 py-0.5 rounded text-[10px] bg-orange-500 text-white font-bold">THỬ NGHIỆM</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => setPrompt(preset)}
              className="px-2 py-1 bg-white/5 border border-white/5 hover:border-white/20 rounded text-[10px] text-white/40 hover:text-white/70 transition-all whitespace-nowrap"
            >
              {preset}
            </button>
          ))}
        </div>

        <button
          onClick={() => onGenerate(prompt, selectedTool)}
          disabled={!prompt.trim() || isProcessing}
          className={cn(
            "w-full py-4 rounded-2xl bg-orange-500 text-white font-bold shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 group transition-all",
            (isProcessing || !prompt.trim()) ? "opacity-50 cursor-not-allowed grayscale" : "hover:scale-[1.02] active:scale-[0.98]"
          )}
        >
          {isProcessing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              Đang tạo phép màu...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Tạo ảnh AI
            </>
          )}
        </button>
      </div>

      <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 text-[11px] text-orange-500/70 leading-relaxed italic">
        "Mẹo: Hãy thật cụ thể! Thay vì 'nền đẹp', hãy thử 'ngõ nhỏ neon cyberpunk dưới mưa với ánh đèn phản chiếu'."
      </div>
    </div>
  );
}
