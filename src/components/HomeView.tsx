import React from 'react';
import UploadArea from './UploadArea';
import { Sparkles, Zap, Shield, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  onUpload: (file: File) => void;
}

export default function HomeView({ onUpload }: HomeViewProps) {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar bg-gradient-to-b from-orange-500/5 to-transparent">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-8 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" />
            Công cụ AI Thế Hệ Mới
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Studio Chuyên Nghiệp.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Sức mạnh từ AI.</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto mb-12">
            Biến những bức ảnh của bạn thành những kiệt tác với các công cụ AI tiên tiến.
            Tự động xóa nền, xóa vật thể và hiệu chỉnh ánh sáng điện ảnh chỉ trong vài giây.
          </p>
        </motion.div>
      </section>

      {/* Upload Area */}
      <section className="px-8 pb-24">
        <UploadArea onUpload={onUpload} />
      </section>

      {/* Stats/Social Proof */}
      <section className="pb-24 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Lượt chỉnh AI', count: '10.2M+', icon: Zap },
            { label: 'Người dùng', count: '500K+', icon: Globe },
            { label: 'Bảo mật SSL', count: 'Tuyệt đối', icon: Shield },
            { label: 'Chất lượng xuất', count: 'Chuẩn 4K', icon: Sparkles },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
              className="text-center space-y-2"
            >
              <div className="flex justify-center">
                <stat.icon className="w-5 h-5 text-orange-500/40" />
              </div>
              <p className="text-2xl font-bold text-white">{stat.count}</p>
              <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
