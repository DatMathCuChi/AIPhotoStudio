import React from 'react';
import { Layout, Search, Filter } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const TEMPLATES = [
  { id: '1', title: 'Chân dung Studio', category: 'Chân dung', preview: 'https://picsum.photos/seed/p1/200/300' },
  { id: '2', title: 'Thương mại nền trắng', category: 'Sản phẩm', preview: 'https://picsum.photos/seed/p2/200/300' },
  { id: '3', title: 'Tầm nhìn Cyberpunk', category: 'Sáng tạo', preview: 'https://picsum.photos/seed/p3/200/300' },
  { id: '4', title: 'Phong cách phim cũ', category: 'Retro', preview: 'https://picsum.photos/seed/p4/200/300' },
  { id: '5', title: 'Sản phẩm sáng tạo', category: 'Quảng cáo', preview: 'https://picsum.photos/seed/p5/200/300' },
  { id: '6', title: 'Phong cảnh Anime', category: 'Sáng tạo', preview: 'https://picsum.photos/seed/p6/200/300' },
];

export default function TemplateGallery() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-white/90">Mẫu thiết kế</h4>
        <div className="flex gap-2">
          <button className="p-1.5 rounded bg-white/5 text-white/40 hover:text-white"><Filter className="w-3.5 h-3.5" /></button>
          <button className="p-1.5 rounded bg-white/5 text-white/40 hover:text-white"><Search className="w-3.5 h-3.5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((template) => (
          <div 
            key={template.id}
            className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-orange-500/50 transition-all"
          >
            <img 
              src={template.preview} 
              alt={template.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black to-transparent">
              <p className="text-[10px] font-bold text-white truncate">{template.title}</p>
              <p className="text-[8px] text-white/50 uppercase tracking-tighter">{template.category}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-2 border border-white/5 rounded-lg text-white/40 text-[10px] hover:bg-white/5 hover:text-white transition-all">
        Xem tất cả mẫu từ Cloud
      </button>
    </div>
  );
}
