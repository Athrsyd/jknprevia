import type { Metadata } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JKN PREVIA — Counterfactual Simulation & Decision Intelligence',
  description:
    'Platform decision intelligence untuk pengelola BPJS/JKN: menganalisis episode klaim dan mensimulasikan dampak perubahan skenario pelayanan kesehatan (Simulate. Predict. Prevent).',
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`h-full ${montserrat.variable} ${poppins.variable}`}>
      <body
        className={`min-h-full bg-[#F5F5F7] text-[#1D1D1F] ${poppins.className} font-sans antialiased selection:bg-[#0071E3]/20`}
      >
        {children}
      </body>
    </html>
  );
}
