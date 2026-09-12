import { SimulationResultContract, ClaimEpisode } from '../types';

export interface GenerateExplanationParams {
  episode: ClaimEpisode;
  result: SimulationResultContract;
}

export async function generateAiOperationalExplanation(
  params: GenerateExplanationParams
): Promise<{
  summary: string;
  primary_factors: string[];
  operational_recommendation: string;
  disclaimer: string;
}> {
  const { episode, result } = params;
  const apiKey = process.env.GEMINI_API_KEY;

  const defaultDisclaimer =
    'Hasil ini merupakan estimasi model analitis berbasis pola historis klaim, bukan rekomendasi klinis mutlak bagi dokter penanggung jawab pelayanan (DPJP) dan tidak menjamin kepastian efisiensi real-time.';

  // If already provided by the deterministic engine and no API key, return it
  if (!apiKey && result.ai_explanation) {
    return result.ai_explanation;
  }

  if (apiKey) {
    try {
      const prompt = `Anda adalah asisten decision-intelligence untuk pengelola jaminan kesehatan BPJS JKN.
Tugas Anda: Berikan penjelasan operasional ringkas mengapa estimasi biaya klaim berubah berdasarkan hasil simulasi counterfactual berikut:

Episode: ${episode.episode_code} (${episode.diagnosis_group} - ${episode.diagnosis_description})
Provider: ${episode.provider_name}
Baseline LOS: ${result.baseline_los} hari, Biaya Baseline: Rp ${result.baseline_cost.toLocaleString('id-ID')}
Estimated LOS: ${result.estimated_los} hari, Biaya Estimasi: Rp ${result.estimated_cost.toLocaleString('id-ID')}
Selisih Biaya: Rp ${result.estimated_difference.toLocaleString('id-ID')} (${result.estimated_difference_pct}%)
Tingkat Keyakinan Model (Confidence): ${Math.round(result.confidence * 100)}%
Kontribusi Faktor: ${result.drivers.map((d) => `${d.name} (${d.contribution_pct}%)`).join(', ')}

ATURAN KETAT (GUARDRAILS):
1. JANGAN memberikan instruksi diagnosa atau pengobatan medis klinis.
2. JANGAN membuat atau mengarang angka baru yang tidak ada dalam data di atas.
3. GUNAKAN bahasa Indonesia analitis yang bernada kehati-hatian ("model memperkirakan", "estimasi probabilistik", "pola historis").
4. HINDARI kata-kata kepastian seperti "dijamin hemat", "pasti terjadi", "terapi terbaik".

Keluarkan HANYA JSON valid dengan format:
{
  "summary": "paragraf ringkas 2-3 kalimat penjelasan operasional biaya",
  "primary_factors": ["faktor 1", "faktor 2", "faktor 3"],
  "operational_recommendation": "saran manajerial/administrasi klaim non-klinis",
  "disclaimer": "${defaultDisclaimer}"
}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json', temperature: 0.2 },
          }),
        }
      );

      if (res.ok) {
        const json = await res.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return {
            summary: parsed.summary,
            primary_factors: parsed.primary_factors,
            operational_recommendation: parsed.operational_recommendation,
            disclaimer: defaultDisclaimer,
          };
        }
      }
    } catch (e) {
      console.warn('Gemini explanation fallback triggered:', e);
    }
  }

  // Robust fallback
  return (
    result.ai_explanation || {
      summary: `Model simulasi counterfactual mengestimasi perubahan biaya klaim sebesar ${result.estimated_difference >= 0 ? '+' : ''}Rp ${Math.abs(result.estimated_difference).toLocaleString('id-ID')} (${result.estimated_difference_pct}%) ketika durasi rawat inap disimulasikan menjadi ${result.estimated_los} hari.`,
      primary_factors: result.drivers.slice(0, 3).map((d) => `${d.name} (kontribusi ${d.contribution_pct}%)`),
      operational_recommendation:
        'Tingkatkan koordinasi manajemen utilitas rawat inap dan sinkronisasi pelepasan rawat dini dengan faskes primer lanjutan.',
      disclaimer: defaultDisclaimer,
    }
  );
}
