import type { Metadata } from 'next';
import { getAllProducts, getCollections, getProductsByCollection } from '@/lib/queries';
import { toCategories } from '@/lib/products';
import HomeTemplate from '@/components/templates/HomeTemplate/HomeTemplate';

export const metadata: Metadata = {
  title: 'Mulan · Lote 04 — Primavera 26',
  description: 'Doce piezas, cortadas a mano en Ciudad de México. Hechas para llevarse durante años.',
};

export default async function HomePage() {
  const [products, collections, saleProducts] = await Promise.all([
    getAllProducts(),
    getCollections(),
    getProductsByCollection('sale'),
  ]);
  return (
    <HomeTemplate
      featuredProducts={products.slice(0, 4)}
      categories={toCategories(collections, products)}
      saleProducts={saleProducts}
    />
  );
}
