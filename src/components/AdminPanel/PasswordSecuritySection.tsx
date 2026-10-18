import React, { useState } from 'react';
import { SecurityLog } from '../../types';
import { ShieldCheck, Key, Fingerprint, Lock, ShieldAlert, CheckCircle, Clock, ArrowLeft } from 'lucide-react';

interface Props {
  securityLogs: SecurityLog[];
  userEmail?: string;
  onBack?: () => void;
}

export const PasswordSecuritySection: React.FC<Props> = ({
  securityLogs,
  userEmail,
  onBack
}) => {
  return (
    <div 
      onDoubleClick={(e) => {
        e.stopPropagation();
        onBack?.();
      }}
      className="space-y-3 sm:space-y-3.5 max-w-4xl mx-auto"
    >
      {/* 🛡️ బోర్డు 1: Password & Security Gateway (కాంపాక్ట్ ప్రీమియం హెడర్ బ్యానర్) */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 sm:p-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-all mr-1 active:scale-95 shrink-0"
              title="వెనుకకు"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-tight">Password & Security Gateway</h3>
            <p className="text-[10px] sm:text-xs text-slate-400 leading-snug">
              Manage admin authentication credentials, biometric access, and security audit logs.
            </p>
          </div>
        </div>
        <div className="px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
          PROTECTED
        </div>
      </div>

      {/* 🔑 బోర్డు 2: Admin Authentication Status (కాంపాక్ట్ RBAC & అడ్మిన్ ఈమెయిల్ బోర్డు) */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 sm:p-3.5 shadow-sm">
        <div className="flex items-center gap-2 mb-2.5">
          <Key className="w-4 h-4 text-sky-400 shrink-0" />
          <h4 className="text-xs sm:text-sm font-semibold text-slate-200">Admin Authentication Status</h4>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-3 sm:p-3.5 rounded-xl space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30 shrink-0">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black text-white uppercase tracking-tight">Passwordless RBAC Active</p>
              <p className="text-[10px] sm:text-xs text-slate-400 font-bold">Role-Based Access Control via Google OAuth</p>
            </div>
          </div>

          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Authorized Admin Email</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-400">{userEmail || 'psm8742260@gmail.com'}</span>
            </div>
          </div>

          <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed font-medium">
            అడ్మిన్ ప్యానెల్ ఇప్పుడు కేవలం మీ జిమెయిల్ ఐడికి మాత్రమే పరిమితం చేయబడింది. ఎటువంటి పిన్ లేదా పాస్‌వర్డ్ అవసరం లేదు.
          </p>
        </div>
      </div>

      {/* 🕒 బోర్డు 3: Security Audit & Trigger Logs (మొబైల్ రెస్పాన్సివ్ కాంపాక్ట్ టేబుల్ బోర్డు) */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3 sm:p-3.5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <h4 className="text-xs sm:text-sm font-semibold text-slate-200">Security Audit & Trigger Logs</h4>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">{securityLogs.length} events logged</span>
        </div>

        <div className="overflow-x-auto max-h-52 overflow-y-auto rounded-lg border border-slate-800 scrollbar-thin">
          <table className="w-full text-left text-[10px] sm:text-[11px] text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 uppercase font-mono sticky top-0 backdrop-blur-xs">
              <tr>
                <th className="py-1.5 px-2.5">Time</th>
                <th className="py-1.5 px-2.5">Event</th>
                <th className="py-1.5 px-2.5">Status</th>
                <th className="py-1.5 px-2.5">Agent / Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {securityLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-slate-500">
                    No security events recorded yet.
                  </td>
                </tr>
              ) : (
                securityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-1.5 px-2.5 text-slate-400 whitespace-nowrap text-[10px]">{log.timestamp}</td>
                    <td className="py-1.5 px-2.5 font-medium text-slate-200">{log.event}</td>
                    <td className="py-1.5 px-2.5 whitespace-nowrap">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          log.status === 'SUCCESS'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : log.status === 'DENIED'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-1.5 px-2.5 text-slate-400 whitespace-nowrap text-[10px]">{log.agent || 'System Gateway'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
