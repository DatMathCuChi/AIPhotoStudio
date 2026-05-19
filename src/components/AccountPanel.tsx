import React from 'react';
import { User, Crown, CreditCard, Shield, Settings, LogOut, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function AccountPanel() {
  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-black/60">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-3xl font-bold shadow-2xl">
              JD
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">John Doe</h2>
              <p className="text-white/40 text-sm">Thành viên miễn phí từ tháng 5/2024</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-white/60">
                <Shield className="w-3 h-3" />
                ĐÃ XÁC MINH
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <p className="text-white/40 text-xs mb-1">Tổng chỉnh sửa</p>
              <p className="text-xl font-bold">1,284</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <p className="text-white/40 text-xs mb-1">Lượt dùng AI</p>
              <p className="text-xl font-bold">42 <span className="text-[10px] text-white/20 font-normal">/ 50</span></p>
            </div>
          </div>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-white/40 group-hover:text-white" />
                <span className="text-sm">Thanh toán & Phương thức</span>
              </div>
              <span className="text-[10px] text-white/20">Visa **** 4242</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-white/40 group-hover:text-white" />
                <span className="text-sm">Cài đặt ứng dụng</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group text-red-400">
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Đăng xuất</span>
              </div>
            </button>
          </div>
        </div>

        <div className="relative p-8 rounded-[40px] bg-gradient-to-br from-orange-600/20 to-transparent border border-orange-500/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl -mr-16 -mt-16" />
          
          <Crown className="w-12 h-12 text-orange-500 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-2">AI Studio Pro</h3>
          <p className="text-white/60 text-sm mb-8 leading-relaxed">
            Sở hữu khả năng xử lý AI không giới hạn, xuất ảnh 4K và toàn quyền truy cập thư viện mẫu thiết kế Cloud.
          </p>

          <ul className="space-y-4 mb-8">
            {[
              "Chỉnh sửa AI ma thuật không giới hạn",
              "Xuất chất lượng 4K Ultra-HD",
              "Mẫu thiết kế Designer độc quyền",
              "Ưu tiên truy cập máy chủ",
              "Chèn Watermark & Thương hiệu riêng",
            ].map(feat => (
              <li key={feat} className="flex items-center gap-3 text-sm text-white/80">
                <Zap className="w-3 h-3 text-orange-500 fill-orange-500" />
                {feat}
              </li>
            ))}
          </ul>

          <button className="w-full py-4 rounded-2xl bg-orange-500 text-white font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-orange-500/40">
            Nâng cấp ngay — 475.000đ/tháng
          </button>
          <p className="text-center mt-4 text-[10px] text-white/20 tracking-wide uppercase">
            Hủy bất kỳ lúc nào • Dùng thử miễn phí 7 ngày
          </p>
        </div>
      </div>
    </div>
  );
}
