import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/queries';
import HomeTemplate from '@/components/templates/HomeTemplate/HomeTemplate';

export const metadata: Metadata = {
  title: 'Mulán · Lote 04 — Primavera 26',
  description: 'Doce piezas, cortadas a mano en Ciudad de México. Hechas para llevarse durante años.',
};

export default async function HomePage() {
  const products = await getAllProducts();
  return <HomeTemplate featuredProducts={products.slice(0, 4)} />;
}
