import React, { useState, useEffect } from 'react';
import { FolderGit2, ArrowLeft, HardDrive, RefreshCw, Trash2, Download, CheckCircle2 } from 'lucide-react';
import { safeStorage } from '../../utils/safeStorage';

interface SavedWorkspaceSectionProps {
  onBack?: () => void;
}

export function SavedWorkspaceSection({ onBack }: SavedWorkspaceSectionProps) {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = () => {
    try {
      setLoading(true);
      // Fetch or read cached workspaces
      const local = safeStorage.getItem('studio_saved_workspaces');
      if (local) {
        setWorkspaces(JSON.parse(local));
      } else {
        setWorkspaces([
          {
            id: 'ws-main',
            name: 'AI Master Studio Workspace',
            updatedAt: new Date().toLocaleDateString(),
            fileCount: 42,
            type: 'Live Primary'
          }
        ]);
      }
    } catch (e) {
      console.error('Error loading workspaces:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-100 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-all mr-2"
              title="వెనుకకు"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">భద్రపరచబడిన వర్క్‌స్పేస్‌లు (Saved Workspaces)</h3>
            <p className="text-xs text-slate-400">
              గతంలో సేవ్ చేసిన ప్రాజెక్ట్‌లు, డ్రాఫ్ట్‌లు మరియు ఆర్కైవ్‌ల జాబితాను సమీక్షించండి.
            </p>
          </div>
        </div>
        <button
          onClick={loadWorkspaces}
          className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-all flex items-center gap-1.5 text-xs font-semibold"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>రిఫ్రెష్</span>
        </button>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Workspaces List */}
      <div className="grid grid-cols-1 gap-3">
        {workspaces.map((ws) => (
          <div
            key={ws.id}
            className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-4 hover:border-slate-600 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{ws.name}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span>ఫైల్స్: {ws.fileCount || 0}</span>
                  <span>•</span>
                  <span>చివరి అప్‌డేట్: {ws.updatedAt}</span>
                  <span className="text-[10px] bg-slate-700 px-1.5 py-0.5 rounded text-slate-300 uppercase">
                    {ws.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                క్రియాశీలకంగా ఉంది (Active)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
