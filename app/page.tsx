import type { Metadata } from 'next';
import HomeTemplate from '@/components/templates/HomeTemplate/HomeTemplate';

export const metadata: Metadata = {
  title: 'Mulán · Lote 04 — Primavera 26',
  description: 'Doce piezas, cortadas a mano en Ciudad de México. Hechas para llevarse durante años.',
};

export default function HomePage() {
  return <HomeTemplate />;
}
