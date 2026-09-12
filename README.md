# JKN PREVIA — Counterfactual Simulation & Decision Intelligence Platform

> **Simulate. Predict. Prevent.**  
> Counterfactual Simulation untuk Prediksi dan Pencegahan Risiko Pelayanan Kesehatan dalam Program JKN (BPJS Kesehatan).

---

## 🌟 Tentang JKN PREVIA

Dashboard klaim tradisional umumnya hanya menjawab:
- *Apa yang sudah terjadi?*
- *Berapa total biaya yang dikeluarkan?*

**JKN PREVIA** menambahkan lapisan kecerdasan baru (*Decision Intelligence*):
- *"Apa yang mungkin terjadi pada biaya dan risiko sebuah episode klaim jika durasi rawat inap (LOS) dioptimalkan?"*
- *"Faktor pelayanan apa yang paling berkontribusi pada penghematan?"*
- *"Seberapa yakin model analitis terhadap hasil simulasi tersebut?"*

---

## 🚀 Panduan Memulai Cepat (Quick Start)

### 1. Masuk ke Direktori Proyek
```bash
cd jknprevia
```

### 2. Jalankan Dev Server
```bash
npm run dev
```
Buka peramban di [http://localhost:3000](http://localhost:3000).

---

## ⏱️ Alur Demo Singkat (< 30 Detik untuk Juri)

Sesuai panduan `docs/DEMO_SCRIPT.md`:

1. **Buka Dashboard**: Tinjau KPI eksekutif, tren biaya, dan potensi efisiensi counterfactual.
2. **Pilih Episode Berisiko**: Klik tombol **"Buka Demo Episode #84291"** (Kasus Kardiovaskular di RSUP Dr. Sardjito, LOS 7 hari, Biaya Rp 8,42 juta, Skor Risiko 82).
3. **What-If Builder**: Geser durasi rawat inap (LOS) dari **7 hari menjadi 5 hari**. Perhatikan label *Simulation Preview*.
4. **Eksekusi Simulasi**: Klik **"Eksekusi Simulasi Counterfactual"**, amati 5 tahapan pipeline causal modeling yang berjalan otomatis.
5. **Hasil Simulasi (First Viewport WOW)**:
   - **Current Baseline**: Rp 8,42 juta (LOS 7 hari)
   - **What-If Simulated**: Rp 6,91 juta (LOS 5 hari)
   - **Selisih Estimasi**: -Rp 1,51 juta (-17,9%)
   - **Model Confidence**: 84% (Keyakinan Tinggi)
6. **Cost Drivers & Waterfall**: Lihat dekomposisi faktor (LOS 42%, Farmasi 31%, Visite 18%, Lab 9%).
7. **AI Operational Insight & Guardrail**: Baca narasi operasional yang patuh batasan etika AI (non-klinis).

---

## 🏛️ Arsitektur Fullstack Next.js

```text
jknprevia/
├── app/
│   ├── api/v1/                     # Backend REST API Routes
│   │   ├── auth/login & me         # Otentikasi & info profil
│   │   ├── dashboard/summary       # KPI & tren agregat
│   │   ├── claim-episodes/         # Pencarian, filter, detail episode
│   │   ├── simulations/            # Eksekusi engine & riwayat simulasi
│   │   ├── analytics/              # Analisis dampak provinsi & provider
│   │   └── audit-logs/             # Jejak audit & compliance
│   ├── (auth)/login                # Login dengan 1-click role demo switcher
│   └── (dashboard)/                # Enterprise App Shell
│       ├── page.tsx                # Dashboard eksekutif
│       ├── episodes/               # Claim Episode Explorer
│       ├── episodes/[id]/          # Detail episode & timeline
│       ├── episodes/[id]/simulate/ # What-If Simulation Builder
│       ├── simulations/[id]/       # Halaman Hasil Komparasi (Signature WOW)
│       ├── analytics/              # Analisis Dampak Agregat
│       ├── history/                # Riwayat Simulasi Tersimpan
│       └── audit/                  # Log Kepatuhan & Audit
├── components/
│   ├── layout/                     # Sidebar, Header, GuardrailBanner
│   └── simulation/                 # ComparisonCard, ScenarioCard, MetricCard,
│                                   # ConfidenceMeter, FactorContribution,
│                                   # CostWaterfall, EpisodeTimeline, AIInsight
└── lib/
    ├── db/fixtures & store         # In-memory canonical database BPJS sintetis
    ├── simulation/engine           # Deterministic counterfactual simulation engine
    └── ai/gemini                   # Gemini AI layer dengan operational fallback
```

---

## 🛡️ Product & AI Guardrails

Platform ini mematuhi standar etika analitis:
- Seluruh estimasi bersifat probabilistik untuk analisis operasional pengelola jaminan kesehatan.
- Sistem **tidak memberikan diagnosis medis klinis** dan **tidak menggantikan DPJP**.
- Bebas dari data pribadi riil (100% anonymized/synthetic Indonesian healthcare claim records).
