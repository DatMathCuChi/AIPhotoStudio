import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, FileWarning, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UploadAreaProps {
  onUpload: (file: File) => void;
}

export default function UploadArea({ onUpload }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full max-w-2xl aspect-[16/9] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-6 cursor-pointer transition-all duration-300 ${
          isDragging 
            ? 'border-orange-500 bg-orange-500/5 scale-[1.02]' 
            : 'border-white/10 hover:border-white/20 bg-white/[0.02]'
        }`}
      >
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-colors ${
          isDragging ? 'bg-orange-500 text-white' : 'bg-white/5 text-white/40'
        }`}>
          <Upload className="w-10 h-10" />
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Nhấp hoặc kéo thả ảnh vào đây
          </h3>
          <p className="text-white/40 text-sm">
            Hỗ trợ JPG, PNG, WebP (Tối đa 10MB)
          </p>
        </div>

        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          onChange={handleChange}
          className="hidden" 
        />
      </motion.div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <ImageIcon className="w-6 h-6 text-orange-500 mb-4" />
          <h4 className="text-white font-medium mb-2">Độ phân giải cao</h4>
          <p className="text-white/40 text-xs">Giữ nguyên chất lượng gốc của ảnh sau khi tải lên.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <FileWarning className="w-6 h-6 text-orange-500 mb-4" />
          <h4 className="text-white font-medium mb-2">Sao lưu tự động</h4>
          <p className="text-white/40 text-xs">Quá trình chỉnh sửa được lưu tự động vào trình duyệt.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <Sparkles className="w-6 h-6 text-orange-500 mb-4" />
          <h4 className="text-white font-medium mb-2">Tối ưu cho AI</h4>
          <p className="text-white/40 text-xs">Định dạng ảnh được tối ưu để AI xử lý tốt nhất.</p>
        </div>
      </div>
    </div>
  );
}
