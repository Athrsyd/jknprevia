'use client';

import React from 'react';
import Link from 'next/link';
import {
  GitBranch,
  Eye,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  FileCheck2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FBFBFD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071E3]/10 border border-[#0071E3]/20 text-[#0071E3] text-xs font-semibold uppercase tracking-wider mb-3">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Tentang JKN PREVIA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1D1D1F] font-heading">
            Dari Catatan Retrospektif ke{' '}
            <span className="text-[#0071E3]">Decision Intelligence Proaktif</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#6E6E73] leading-relaxed">
            Menjawab tantangan terbesar pengelola jaminan kesehatan nasional: bagaimana menguji kebijakan pembiayaan dan efisiensi pelayanan sebelum skenario tersebut benar-benar dieksekusi di lapangan.
          </p>
        </div>

        {/* Paradigm Shift: Traditional BI vs JKN PREVIA Decision Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Traditional Card */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-black/[0.06] shadow-xs relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#FF3B30]/10 text-[#FF3B30] flex items-center justify-center font-bold">
                <XCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1D1D1F] font-heading">
                  Dashboard Klaim Konvensional
                </h3>
                <span className="text-xs text-[#86868B]">Evaluasi Pasif & Terlambat</span>
              </div>
            </div>

            <p className="text-sm text-[#6E6E73] mb-6 leading-relaxed">
              Sebagian besar sistem analitik rumah sakit dan penjamin saat ini hanya berfungsi seperti kaca spion:
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-[#6E6E73]">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] mt-2 shrink-0" />
                <span><strong>Hanya menjawab masa lalu:</strong> <em>"Apa yang sudah terjadi?"</em> dan <em>"Berapa total klaim yang sudah dibayarkan?"</em>.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] mt-2 shrink-0" />
                <span><strong>Korelasi semu:</strong> Mengira rawat inap panjang selalu karena komplikasi, tanpa membedakan variasi praktik antar RS.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] mt-2 shrink-0" />
                <span><strong>Kotak hitam (Black Box):</strong> Angka agregat tinggi tanpa dekomposisi faktor pemicu (cost drivers).</span>
              </li>
            </ul>

            <div className="mt-8 pt-5 border-t border-black/[0.06] text-xs text-[#86868B] italic">
              "Hasilnya: penghematan biaya baru dicari setelah defisit atau inefisiensi terjadi."
            </div>
          </div>

          {/* JKN PREVIA Card */}
          <div className="bg-gradient-to-br from-white via-white to-[#0071E3]/5 rounded-3xl p-7 sm:p-9 border-2 border-[#0071E3]/25 shadow-md relative">
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-1 rounded-full bg-[#0071E3] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                Inovasi Baru
              </span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#0071E3]/15 text-[#0071E3] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1D1D1F] font-heading">
                  JKN PREVIA Decision Intelligence
                </h3>
                <span className="text-xs text-[#0071E3] font-medium">Simulasi Proaktif & Terukur</span>
              </div>
            </div>

            <p className="text-sm text-[#6E6E73] mb-6 leading-relaxed">
              Menghadirkan lapisan pemodelan kausal kontrafaktual (Counterfactual Causal Inference):
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-[#1D1D1F]">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] mt-2 shrink-0" />
                <span><strong>Eksplorasi Skenario 'What-If':</strong> Mensimulasikan dampak perubahan LOS atau formularium obat sebelum regulasi ditetapkan.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] mt-2 shrink-0" />
                <span><strong>Isolasi Sebab-Akibat:</strong> Menghilangkan perancu (confounding bias) sehingga efisiensi yang dihitung adalah dampak nyata intervensi.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] mt-2 shrink-0" />
                <span><strong>Keyakinan Probabilistik Terbuka:</strong> Dilengkapi model confidence meter (84%+) dan waterfall faktor pemicu biaya.</span>
              </li>
            </ul>

            <div className="mt-8 pt-5 border-t border-black/[0.06] text-xs text-[#0071E3] font-medium">
              "Hasilnya: kebijakan pembiayaan dirumuskan berbasis bukti kausal teruji, presisi, dan aman."
            </div>
          </div>
        </div>

        {/* 3 Core Pillars of JKN PREVIA */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] font-heading">
              Tiga Pilar Keunggulan Platform
            </h3>
            <p className="text-xs sm:text-sm text-[#86868B] mt-1">
              Fondasi arsitektur analitis yang membedakan JKN PREVIA dari dashboard pada umumnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.06] shadow-2xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center mb-5">
                <GitBranch className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#1D1D1F] font-heading mb-2">
                1. Causal Inference Engine
              </h4>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed mb-4">
                Bukan sekadar regresi statistik biasa. Mesin simulasi counterfactual mengestimasi kondisi kontrafaktual — apa yang akan terjadi pada biaya jika durasi rawat dioptimalkan, dengan mengontrol keparahan komorbid.
              </p>
              <div className="text-[11px] font-medium text-[#0071E3] bg-[#0071E3]/5 p-2.5 rounded-xl border border-[#0071E3]/10">
                5-Stage Pipeline: Data Ingest → Covariate Balance → Causal DAG → What-If Engine → Attribution
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.06] shadow-2xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#34C759]/10 text-[#34C759] flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#1D1D1F] font-heading mb-2">
                2. Transparansi & Explainability
              </h4>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed mb-4">
                Setiap estimasi dilengkapi grafik waterfall kontribusi biaya (Cost Drivers). Analis dapat melihat secara persis berapa persen penghematan dari akomodasi, farmasi, visite dokter, hingga pemeriksaan penunjang lab.
              </p>
              <div className="text-[11px] font-medium text-[#248A3D] bg-[#34C759]/5 p-2.5 rounded-xl border border-[#34C759]/10">
                Visualisasi Waterfall Interaktif & Dekomposisi Variansi Biaya Komponen Layanan
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.06] shadow-2xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#5856D6]/10 text-[#5856D6] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#1D1D1F] font-heading mb-2">
                3. Responsible AI & Guardrails
              </h4>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed mb-4">
                Platform mematuhi tata kelola etika ketat: estimasi bersifat probabilistik untuk efisiensi manajerial pengelola program. Sistem tidak memberikan diagnosis medis klinis dan tidak mengintervensi otoritas DPJP.
              </p>
              <div className="text-[11px] font-medium text-[#5856D6] bg-[#5856D6]/5 p-2.5 rounded-xl border border-[#5856D6]/10">
                100% Data Sintetis Anonim • Guardrail Banner Terintegrasi • Log Kepatuhan Audit
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
