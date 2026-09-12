'use client';

import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { GuardrailBanner } from '@/components/layout/GuardrailBanner';
import { AuditLog } from '@/lib/types';
import { formatDateTime } from '@/lib/utils';

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadAuditLogs() {
      try {
        const res = await fetch('/api/v1/audit-logs');
        const json = await res.json();
        if (json.data) {
          setLogs(json.data);
        }
      } catch (err) {
        console.error('Failed to load audit logs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAuditLogs();
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.user_name.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.resource_id.toLowerCase().includes(search.toLowerCase()) ||
      l.ip_address.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] font-heading">
            Jejak Audit Keamanan & Kepatuhan
          </h1>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#0071E3]/10 text-[#0071E3] font-heading">
            {logs.length} Log
          </span>
        </div>
        <p className="text-xs sm:text-sm font-normal text-[#86868B] mt-1">
          Pencatatan kepatuhan hukum, integritas proses counterfactual, dan pelacakan audit data klaim BPJS Kesehatan.
        </p>
      </div>

      <GuardrailBanner compact />

      {/* Apple Spotlight Search Bar (Safe Padding, No Overlap) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-black/[0.06] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="relative flex items-center w-full">
          <div className="absolute left-4 pointer-events-none text-[#86868B] flex items-center">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Cari aksi (LOGIN, RUN_SIMULATION, VIEW_EPISODE), resource ID, atau nama analis..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '2.75rem' }}
            className="w-full pr-4 py-2.5 bg-[#F5F5F7] rounded-full text-xs sm:text-sm text-[#1D1D1F] placeholder:text-[#86868B] placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:bg-white font-normal border border-transparent focus:border-black/[0.08] transition-all"
          />
        </div>
      </div>

      {/* Audit Inset Grouped Table */}
      <div className="bg-white rounded-3xl border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead>
              <tr className="border-b border-black/[0.06] text-[#86868B] font-heading font-semibold">
                <th className="py-3 px-4">Waktu (WIB)</th>
                <th className="py-3 px-4">Pengguna & Peran</th>
                <th className="py-3 px-4">Aksi Audit</th>
                <th className="py-3 px-4">Resource Target</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Alamat IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#86868B]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-[#0071E3] border-t-transparent rounded-full animate-spin" />
                      <span className="font-normal">Memuat catatan audit...</span>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#86868B] font-normal">
                    Tidak ada catatan audit yang cocok.
                  </td>
                </tr>
              ) : (
                filtered.map((log) => {
                  const isSim = log.action === 'RUN_SIMULATION';
                  const isAuth = log.action === 'LOGIN';

                  return (
                    <tr key={log.id} className="hover:bg-black/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-mono text-xs font-normal text-[#86868B]">
                        {formatDateTime(log.timestamp)}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#1D1D1F] font-heading">
                          {log.user_name}
                        </div>
                        <div className="text-[11px] font-normal text-[#86868B] capitalize">
                          {log.user_role.replace('_', ' ')}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-heading ${
                            isSim
                              ? 'bg-[#0071E3]/10 text-[#0071E3]'
                              : isAuth
                              ? 'bg-[#34C759]/15 text-[#248A3D]'
                              : 'bg-black/[0.05] text-[#1D1D1F]'
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-[#1D1D1F]">
                        <span className="font-normal text-[#86868B]">{log.resource_type}:</span>{' '}
                        <strong className="text-[#0071E3] font-bold font-heading">{log.resource_id}</strong>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold font-heading bg-[#34C759]/15 text-[#248A3D]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
                          {log.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs font-normal text-[#86868B]">
                        {log.ip_address}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
