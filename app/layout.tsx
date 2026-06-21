import type { Metadata } from 'next';
import { Libre_Baskerville, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { TweaksProvider } from '@/context/TweaksContext';
import Header from '@/components/organisms/Header/Header';
import Footer from '@/components/organisms/Footer/Footer';
import CartDrawer from '@/components/organisms/CartDrawer/CartDrawer';
import TweaksPanel from '@/components/organisms/TweaksPanel/TweaksPanel';

const libreBaskerville = Libre_Baskerville({
  variable: '--font-baskerville',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mulan · Ropa hecha en México',
  description: 'Una marca pequeña, hecha en México. Pensada para vestir lento. Lote 04 — Primavera 26.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-MX"
      className={`${libreBaskerville.variable} ${jetbrainsMono.variable} antialiased`}
    >
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
