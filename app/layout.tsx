import type { Metadata } from 'next';
import { Noto_Serif_Display, Noto_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { TweaksProvider } from '@/context/TweaksContext';
import Header from '@/components/organisms/Header/Header';
import Footer from '@/components/organisms/Footer/Footer';
import CartDrawer from '@/components/organisms/CartDrawer/CartDrawer';
import TweaksPanel from '@/components/organisms/TweaksPanel/TweaksPanel';

const notoSerifDisplay = Noto_Serif_Display({
  variable: '--font-noto-display',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const notoSerif = Noto_Serif({
  variable: '--font-noto-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-noto-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mulán · Ropa hecha en México',
  description: 'Una marca pequeña, hecha en México. Pensada para vestir lento. Lote 04 — Primavera 26.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-MX"
      className={`${notoSerifDisplay.variable} ${notoSerif.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <TweaksProvider>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
            <CartDrawer />
            <TweaksPanel />
          </TweaksProvider>
        </CartProvider>
      </body>
    </html>
  );
}
