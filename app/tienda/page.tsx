import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllProducts, getCollections } from '@/lib/queries';
import { toCategories } from '@/lib/products';
import CollectionTemplate from '@/components/templates/CollectionTemplate/CollectionTemplate';

export const metadata: Metadata = {
  title: 'Tienda · Mulan',
  description: 'Doce piezas, hechas a mano en CDMX. Cuando se acaben, se acaban.',
};

export default async function TiendaPage() {
  const [products, collections] = await Promise.all([getAllProducts(), getCollections()]);
  return (
    <Suspense>
      <CollectionTemplate products={products} categories={toCategories(collections)} />
    </Suspense>
  );
}
