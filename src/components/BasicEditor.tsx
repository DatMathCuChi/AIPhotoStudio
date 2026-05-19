import React from 'react';
import { Sun, Contrast, Droplets, SprayCan, RotateCcw, RotateCw, FlipHorizontal, FlipVertical, Crop, Maximize } from 'lucide-react';
import { EditSettings } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface BasicEditorProps {
  settings: EditSettings;
  setSettings: React.Dispatch<React.SetStateAction<EditSettings>>;
  onReset: () => void;
}

const FILTERS = [
  { id: 'none', label: 'Gốc' },
  { id: 'vintage', label: 'Cổ điển' },
  { id: 'cinematic', label: 'Điện ảnh' },
  { id: 'mono', label: 'Trắng đen' },
  { id: 'beauty', label: 'Làm đẹp' },
  { id: 'warm', label: 'Ấm áp' },
  { id: 'cool', label: 'Dịu mát' },
];

export default function BasicEditor({ settings, setSettings, onReset }: BasicEditorProps) {
  const updateSetting = (key: keyof EditSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const controls = [
    { key: 'brightness' as const, label: 'Độ sáng', icon: Sun, min: 0, max: 200 },
    { key: 'contrast' as const, label: 'Tương phản', icon: Contrast, min: 0, max: 200 },
    { key: 'saturation' as const, label: 'Bão hòa', icon: Droplets, min: 0, max: 200 },
    { key: 'sharpness' as const, label: 'Độ nét', icon: SprayCan, min: 0, max: 100 },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-6">
        <h4 className="text-sm font-semibold text-white/90 mb-4">Điều chỉnh</h4>
        {controls.map((control) => (
          <div key={control.key} className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2 text-white/50">
                <control.icon className="w-3.5 h-3.5" />
                <span>{control.label}</span>
              </div>
              <span className="text-white/80 font-mono">{settings[control.key]}%</span>
            </div>
            <input 
              type="range" 
              min={control.min} 
              max={control.max} 
              value={settings[control.key] as number}
              onChange={(e) => updateSetting(control.key, parseInt(e.target.value))}
              className="w-full accent-orange-500 bg-white/10 rounded-lg h-1 appearance-none cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-white/90 mb-3">Xoay & Lật</h4>
        <div className="grid grid-cols-4 gap-2">
          <button 
            onClick={() => updateSetting('rotation', (settings.rotation - 90) % 360)}
            className="flex flex-col items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-[10px]">Trái 90°</span>
          </button>
          <button 
            onClick={() => updateSetting('rotation', (settings.rotation + 90) % 360)}
            className="flex flex-col items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all active:scale-95"
          >
            <RotateCw className="w-4 h-4" />
            <span className="text-[10px]">Phải 90°</span>
          </button>
          <button 
            onClick={() => updateSetting('flipX', !settings.flipX)}
            className={cn(
              "flex flex-col items-center gap-2 p-2 rounded-lg transition-all active:scale-95",
              settings.flipX ? "bg-orange-500/20 text-orange-500" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            <FlipHorizontal className="w-4 h-4" />
            <span className="text-[10px]">Lật ngang</span>
          </button>
          <button 
            onClick={() => updateSetting('flipY', !settings.flipY)}
            className={cn(
              "flex flex-col items-center gap-2 p-2 rounded-lg transition-all active:scale-95",
              settings.flipY ? "bg-orange-500/20 text-orange-500" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            <FlipVertical className="w-4 h-4" />
            <span className="text-[10px]">Lật dọc</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-white/90 mb-3">Bộ lọc màu</h4>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => updateSetting('filter', filter.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs transition-all",
                settings.filter === filter.id
                  ? "bg-orange-500 text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={onReset}
        className="mt-4 w-full py-2 rounded-lg border border-white/10 text-white/40 text-xs font-medium hover:bg-white/5 hover:text-white transition-all"
      >
        Đặt lại tất cả
      </button>
    </div>
  );
}
