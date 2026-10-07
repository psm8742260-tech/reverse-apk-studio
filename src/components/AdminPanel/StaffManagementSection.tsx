import React, { useState } from 'react';
import { Users, ArrowLeft, Shield, UserPlus, CheckCircle2, Crown, Key } from 'lucide-react';

interface StaffManagementSectionProps {
  userEmail?: string;
  onBack?: () => void;
}

export function StaffManagementSection({ userEmail, onBack }: StaffManagementSectionProps) {
  const [staffList, setStaffList] = useState([
    { id: '1', name: 'అడ్మిన్ గారు (Admin)', email: userEmail || 'admin@aimaster.studio', role: 'Super Admin', status: 'Active' },
    { id: '2', name: 'బ్రహ్మాస్త్రం ఏఐ ఇంజిన్', email: 'brahmastram@internal.agent', role: 'System Engine', status: 'Active' },
    { id: '3', name: 'రివర్స్ APK ఆడిటర్', email: 'audit@aimaster.studio', role: 'Security Auditor', status: 'Active' }
  ]);

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
          <div className="p-3 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">సిబ్బంది & రోల్స్ నిర్వహణ (Staff Management)</h3>
            <p className="text-xs text-slate-400">
              అడ్మిన్ సిబ్బంది, ఏజెంట్ అనుమతులు మరియు వినియోగదారు అధికారాలను సమీక్షించండి.
            </p>
          </div>
        </div>
        <div className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
          <Crown className="w-3.5 h-3.5" />
          <span>RBAC ENFORCED</span>
        </div>
      </div>

      {/* Staff Table / List */}
      <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-purple-400" />
            అధీకృత వినియోగదారులు ({staffList.length})
          </h4>
        </div>

        <div className="divide-y divide-slate-700/40">
          {staffList.map((member) => (
            <div key={member.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-bold text-sm">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{member.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400 flex items-center gap-1 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {member.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
