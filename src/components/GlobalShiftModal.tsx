import React from 'react';

export interface ShiftItem {
  id: string;
  name: string;
  type: string;
  content: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  availableItems?: ShiftItem[];
  userId?: string;
  onShift?: (item: any) => void;
  onShiftToNormalStudio?: (item: any) => void;
  onShiftToReverseStudio?: (item: any) => void;
  onNavigate?: (view: any) => void;
  initialTab?: string;
  isReduced?: boolean;
}

export function GlobalShiftModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl">
        <h2>Global Shift Modal Stub</h2>
        <button onClick={onClose} className="px-4 py-2 bg-indigo-600 text-white rounded mt-4">Close</button>
      </div>
    </div>
  );
}
