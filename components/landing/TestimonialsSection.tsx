'use client';

import React, { useState } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const testimonials = [
    {
      name: 'Dr. Hendra Prasetyo, Sp.JP, MARS',
      role: 'Ketua Komite Mutu & Kendali Biaya (KMKB)',
      org: 'RSUP Rujukan Nasional',
      avatarText: 'HP',
      quote:
        'JKN PREVIA memberikan terobosan besar bagi manajemen rumah sakit kami. Kami dapat mengevaluasi variasi lama hari rawat inap (LOS) pada kasus kardiovaskular secara obyektif, dengan keyakinan bahwa penataan efisiensi tidak akan mengorbankan mutu dan keselamatan pasien.',
      tag: 'Validasi Klinis & Mutu RS',
    },
    {
      name: 'Siti Rahmawati, SE, AK, CA',
      role: 'Kepala Divisi Verifikasi & Pengendalian Biaya',
      org: 'BPJS Kesehatan Kantor Wilayah',
      avatarText: 'SR',
      quote:
        'Sebelum ada platform ini, tim analis kami kesulitan membedakan mana kelebihan biaya yang wajar karena komplikasi dan mana yang merupakan inefisiensi operasional. Dengan pemodelan kausal PREVIA, rekomendasi audit sampling kami menjadi 3 kali lebih presisi.',
      tag: 'Efisiensi Verifikasi Klaim',
    },
    {
      name: 'Prof. Dr. Ir. Budi Santoso, M.Sc, Ph.D',
      role: 'Guru Besar Aktuaria & Kebijakan Kesehatan Publik',
      org: 'Fakultas Kesehatan Masyarakat',
      avatarText: 'BS',
      quote:
        'Pemisahan antara korelasi dan kausalitas adalah standar emas dalam health economics. JKN PREVIA berhasil membumikan algoritma causal DAG dan dekomposisi counterfactual ke dalam antarmuka yang sangat elegan dan mudah dipahami oleh penentu kebijakan publik.',
      tag: 'Kajian Kebijakan Makro',
    },
    {
      name: 'Ir. Dimas Wicaksono, M.Kom',
      role: 'Direktur Transformasi Digital Fasilitas Kesehatan',
      org: 'Konsorsium Rumah Sakit Daerah',
      avatarText: 'DW',
      quote:
        'Keberadaan banner guardrail etis dan komitmen sistem yang murni beroperasi di domain manajerial (tanpa mengintervensi diagnosis DPJP) membuat integrasi data platform ini sangat aman, patuh regulasi, dan diterima dengan baik oleh para dokter spesialis.',
      tag: 'Kepatuhan & Tata Kelola IT',
    },
  ];

  const faqs = [
    {
      q: 'Bagaimana JKN PREVIA membedakan korelasi dan kausalitas dalam data klaim?',
      a: 'Dashboard biasa hanya melihat korelasi (misal: pasien hipertensi dirawat lebih lama). JKN PREVIA menerapkan 5-stage causal inference pipeline: menyeimbangkan kovariat (komorbiditas, umur, kelas RS) dengan propensity scoring, lalu mensimulasikan dampak spesifik dari intervensi (seperti pemangkasan LOS 2 hari) seolah-olah faktor perancu lainnya konstan.',
    },
    {
      q: 'Apakah platform ini memberikan diagnosis medis kepada pasien?',
      a: 'Sama sekali TIDAK. Sesuai dengan AI Ethical Guardrails, JKN PREVIA murni dirancang sebagai alat bantu analitis manajerial untuk pengelola jaminan kesehatan dan komite mutu RS. Sistem tidak memberikan diagnosis medis klinis dan tidak pernah menggantikan independensi Dokter Penanggung Jawab Pelayanan (DPJP).',
    },
    {
      q: 'Bagaimana keamanan data pasien dijamin dalam platform ini?',
      a: 'Platform ini beroperasi 100% menggunakan data klaim sintetis yang telah dianonimkan (pseudonymized). Tidak ada data riil identitas kependudukan (NIK, Nama Asli, No. Kartu BPJS) yang disimpan atau diproses, sehingga bebas dari risiko pelanggaran privasi data pribadi (UU PDP).',
    },
    {
      q: 'Apa yang dimaksud dengan nilai Model Confidence (Keyakinan)?',
      a: 'Setiap hasil simulasi counterfactual disertai skor keyakinan (misal: 84% Keyakinan Tinggi). Skor ini merefleksikan kepadatan sampel kasus serupa pada riwayat klaim historis, tingkat variansi biaya antar faskes, serta stabilitas kovariat pendukung.',
    },
  ];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-[#FBFBFD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5856D6]/10 border border-[#5856D6]/20 text-[#5856D6] text-xs font-semibold uppercase tracking-wider mb-3">
            <Quote className="w-3.5 h-3.5" />
            <span>Testimoni & Pengakuan Institusi</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1D1D1F] font-heading">
            Divalidasi oleh <span className="text-[#0071E3]">Praktisi & Regulator Kesehatan</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#6E6E73] leading-relaxed">
            Dengarkan tanggapan para ahli, pimpinan komite medis, dan analis pengelola pembiayaan mengenai dampak nyata platform JKN PREVIA.
          </p>
        </div>

        {/* 4 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 mb-20">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-black/[0.06] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
            >
              <div>
                {/* Rating & Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-[#FF9500]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FF9500]" />
                    ))}
                  </div>

                  <span className="text-[11px] font-semibold text-[#0071E3] bg-[#0071E3]/10 px-2.5 py-0.5 rounded-full border border-[#0071E3]/20">
                    {t.tag}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-[#1D1D1F] leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Profile Card */}
              <div className="pt-5 border-t border-black/[0.05] flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1D1D1F] to-[#3A3A3C] text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  {t.avatarText}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1D1D1F] font-heading">
                    {t.name}
                  </div>
                  <div className="text-xs text-[#6E6E73]">
                    {t.role} • <span className="text-[#0071E3] font-medium">{t.org}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        <div id="faq" className="max-w-3xl mx-auto pt-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#86868B] uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4 text-[#0071E3]" />
              <span>Pertanyaan yang Sering Diajukan</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1D1D1F] font-heading">
              Pertanyaan Umum Seputar JKN PREVIA
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#1D1D1F] hover:bg-black/[0.01] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#86868B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0071E3]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#6E6E73] leading-relaxed border-t border-black/[0.04]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
