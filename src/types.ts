export interface EditSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  sharpness: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  filter: string;
}

export const DEFAULT_SETTINGS: EditSettings = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  sharpness: 0,
  rotation: 0,
  flipX: false,
  flipY: false,
  filter: 'none',
};

export interface HistoryItem {
  id: string;
  image: string; // base64
  settings: EditSettings;
  timestamp: number;
  type: 'basic' | 'ai';
  prompt?: string;
}

export type ToolType = 'home' | 'upload' | 'basic' | 'ai' | 'templates' | 'history' | 'export' | 'account';
