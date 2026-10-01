import React, { useState } from 'react';
import { SecurityLog } from '../../types';
import { ShieldCheck, Key, Fingerprint, Lock, ShieldAlert, CheckCircle, Clock, ArrowLeft } from 'lucide-react';

interface Props {
  securityLogs: SecurityLog[];
  onBack?: () => void;
}

export const PasswordSecuritySection: React.FC<Props> = ({
  securityLogs,
  onBack
}) => {
  return (
    <div 
      onDoubleClick={(e) => {
        e.stopPropagation();
        onBack?.();
      }}
      className="space-y-6"
    >
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
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Password & Security Gateway</h3>
            <p className="text-xs text-slate-400">
              Manage admin authentication credentials, biometric access, and view security audit logs.
            </p>
          </div>
        </div>
        <div className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          PROTECTED
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Gmail RBAC Status */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-5 h-5 text-sky-400" />
            <h4 className="text-sm font-semibold text-slate-200">Admin Authentication Status</h4>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
                <ShieldCheck className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-black text-white uppercase tracking-tight">Passwordless RBAC Active</p>
                <p className="text-xs text-slate-400 font-bold">Role-Based Access Control via Google OAuth</p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">Authorized Admin Email</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-mono font-bold text-emerald-400">psm8742260@gmail.com</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              అడ్మిన్ ప్యానెల్ ఇప్పుడు కేవలం మీ జిమెయిల్ ఐడికి మాత్రమే పరిమితం చేయబడింది. ఎటువంటి పిన్ లేదా పాస్‌వర్డ్ అవసరం లేదు.
            </p>
          </div>
        </div>
      </div>

      {/* Security Audit Log Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-400" />
            <h4 className="text-sm font-semibold text-slate-200">Security Audit & Trigger Logs</h4>
          </div>
          <span className="text-xs text-slate-400">{securityLogs.length} events logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono">
              <tr>
                <th className="p-2.5">Time</th>
                <th className="p-2.5">Event</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5">Agent / Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 font-mono">
              {securityLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-slate-500">
                    No security events recorded yet.
                  </td>
                </tr>
              ) : (
                securityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40">
                    <td className="p-2.5 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                    <td className="p-2.5 font-medium text-slate-200">{log.event}</td>
                    <td className="p-2.5 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
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
                    <td className="p-2.5 text-slate-400">{log.agent || 'System Gateway'}</td>
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
