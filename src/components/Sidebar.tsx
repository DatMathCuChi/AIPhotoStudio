import React from 'react';
import { Home, Upload, Image as ImageIcon, Sparkles, Layout, History, Download, User, Crown } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ToolType } from '@/src/types';

interface SidebarProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
}

const MENU_ITEMS = [
  { id: 'home', label: 'Trang chủ', icon: Home },
  { id: 'upload', label: 'Tải ảnh lên', icon: Upload },
  { id: 'basic', label: 'Chỉnh sửa cơ bản', icon: ImageIcon },
  { id: 'ai', label: 'Chỉnh sửa AI', icon: Sparkles, badge: 'AI' },
  { id: 'templates', label: 'Mẫu thiết kế', icon: Layout },
  { id: 'history', label: 'Lịch sử', icon: History },
  { id: 'export', label: 'Xuất file', icon: Download },
];

export default function Sidebar({ activeTool, setActiveTool }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col h-full overflow-hidden transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-bold text-lg tracking-tight text-white">AI Studio</h1>
        </div>

        <nav className="space-y-1">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTool(item.id as ToolType)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group relative",
                activeTool === item.id 
                  ? "bg-white/10 text-white" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4",
                activeTool === item.id ? "text-orange-500" : "text-inherit"
              )} />
              {item.label}
              {item.badge && (
                <span className="ml-auto px-1.5 py-0.5 rounded text-[10px] bg-orange-500/20 text-orange-500 font-bold uppercase tracking-wider">
                  {item.badge}
                </span>
              )}
              {activeTool === item.id && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/5">
        <button 
          onClick={() => setActiveTool('account')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
            activeTool === 'account' ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"
          )}
        >
          <User className="w-4 h-4" />
          Tài khoản
        </button>
        <button className="w-full mt-2 flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-transform">
          <Crown className="w-4 h-4 fill-white/20" />
          Nâng cấp Pro
        </button>
      </div>
    </aside>
  );
}
