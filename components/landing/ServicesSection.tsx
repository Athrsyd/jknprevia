'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  FileSpreadsheet,
  BarChart3,
  Bot,
  ArrowRight,
  SlidersHorizontal,
  CheckCircle2,
  Activity,
  Layers,
  TrendingDown,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 'simulation',
      icon: Sparkles,
      iconBg: 'bg-[#0071E3]/10 text-[#0071E3]',
      badge: 'Signature Feature',
      badgeVariant: 'simulation' as const,
      title: 'Counterfactual Simulation Engine',
      subtitle: 'Simulasi What-If Intervensi Pelayanan',
      description:
        'Uji hipotesis penataan durasi rawat inap (LOS), optimalisasi tindakan diagnostik, dan penyesuaian formularium obat secara deterministik tanpa risiko operasional nyata pada pasien.',
      highlights: [
        'Komparasi langsung Baseline vs Simulated Cost',
        'Model Confidence Meter probabilistik (75% - 95%)',
        'Visualisasi 5 tahapan pipeline causal graph',
        'Analisis sensitivitas efisiensi per hari rawat',
      ],
      linkText: 'Coba Simulasi Skenario',
      linkHref: '/episodes/1024/simulate',
    },
    {
      id: 'episodes',
      icon: FileSpreadsheet,
      iconBg: 'bg-[#30B0C7]/10 text-[#30B0C7]',
      badge: 'Auditing 360°',
      badgeVariant: 'neutral' as const,
      title: 'Claim Episode Explorer & Risk Scoring',
      subtitle: 'Pelacakan Episode Klaim & Indeks Risiko',
      description:
        'Penelusuran komprehensif riwayat episode pelayanan rawat inap dari admisi hingga discharge, dilengkapi algoritma deteksi potensi anomali biaya dan skor risiko klinis 0-100.',
      highlights: [
        'Klasifikasi risiko 4 tingkat (Low, Moderate, High, Critical)',
        'Timeline kronologis pelayanan pasien & rincian tindakan',
        'Penyaringan berdasarkan kelas faskes, provinsi, & ICD-10',
        'Deteksi dini potensi readmisi 30 hari pasca rawat',
      ],
      linkText: 'Jelajahi Episode Klaim',
      linkHref: '/episodes',
    },
    {
      id: 'analytics',
      icon: BarChart3,
      iconBg: 'bg-[#34C759]/10 text-[#34C759]',
      badge: 'Dampak Makro',
      badgeVariant: 'success' as const,
      title: 'Cost Driver & Waterfall Decomposition',
      subtitle: 'Analisis Faktor Biaya & Dampak Regional',
      description:
        'Bongkar struktur biaya klaim hingga ke akar penyebabnya. Ketahui secara pasti kontribusi pos farmasi, akomodasi kamar, visite dokter, dan pemeriksaan lab terhadap kelebihan biaya.',
      highlights: [
        'Waterfall chart dekomposisi variansi biaya',
        'Agregasi dampak efisiensi tingkat provinsi & tipe faskes',
        'Benchmarking kepatuhan tarif INA-CBGs',
        'Proyeksi penghematan kas program JKN tahunan',
      ],
      linkText: 'Buka Analisis Dampak',
      linkHref: '/analytics',
    },
    {
      id: 'ai-insights',
      icon: Bot,
      iconBg: 'bg-[#5856D6]/10 text-[#5856D6]',
      badge: 'Gemini AI Powered',
      badgeVariant: 'warning' as const,
      title: 'AI Policy & Operational Recommendations',
      subtitle: 'Sintesis Narasi Kebijakan & Prioritas Audit',
      description:
        'Dukungan analitis berbasis Google Gemini AI yang menerjemahkan angka-angka simulasi rumit menjadi narasi manajerial operasional yang langsung dapat ditindaklanjuti.',
      highlights: [
        'Rekomendasi audit sampling terarah berbasis anomali',
        'Usulan penyesuaian SOP discharge planning rumah sakit',
        'Guardrail etis non-klinis bersertifikasi manajerial',
        'Riwayat skenario tersimpan & jejak audit compliance',
      ],
      linkText: 'Tinjau Jejak Audit & Skenario',
      linkHref: '/audit',
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34C759]/10 border border-[#34C759]/20 text-[#248A3D] text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Layanan & Fitur Unggulan</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1D1D1F] font-heading">
            Solusi Terpadu untuk <span className="text-[#0071E3]">Pengendalian Mutu & Biaya</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#6E6E73] leading-relaxed">
            Satu platform terintegrasi yang menghubungkan verifikasi klaim, pemodelan kausal, dan perumusan kebijakan kesehatan berkelanjutan.
          </p>
        </div>

        {/* 4 Rich Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="bg-[#FBFBFD] rounded-3xl p-7 sm:p-9 border border-black/[0.06] shadow-xs hover:shadow-xl hover:border-[#0071E3]/25 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl ${svc.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <Badge variant={svc.badgeVariant} size="sm">
                      {svc.badge}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-[#1D1D1F] font-heading mb-1 group-hover:text-[#0071E3] transition-colors">
                    {svc.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#86868B] block mb-3">
                    {svc.subtitle}
                  </span>

                  <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed mb-6">
                    {svc.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-4 border-t border-black/[0.05] mb-8">
                    {svc.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#1D1D1F]">
                        <CheckCircle2 className="w-4 h-4 text-[#34C759] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer CTA Button */}
                <Link href={svc.linkHref}>
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full justify-center bg-white group-hover:bg-[#0071E3] group-hover:text-white group-hover:border-[#0071E3] transition-all font-semibold text-xs sm:text-sm"
                    icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  >
                    {svc.linkText}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Quick CTA Banner Inside Services */}
        <div className="mt-16 bg-gradient-to-r from-[#0071E3]/10 via-[#30B0C7]/10 to-[#34C759]/10 rounded-3xl p-8 sm:p-10 border border-black/[0.06] text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-bold text-[#1D1D1F] font-heading">
              Ingin Mengetes Skenario Kasus Faskes Anda?
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6E73] mt-1">
              Jalankan simulasi counterfactual 1-klik dengan data sampel ICD-10 sekarang.
            </p>
          </div>

          <Link href="/episodes/1024/simulate" className="shrink-0">
            <Button
              variant="primary"
              size="md"
              className="text-xs sm:text-sm font-semibold shadow-md"
              icon={<Sparkles className="w-4 h-4" />}
            >
              Uji Simulasi Cepat
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
