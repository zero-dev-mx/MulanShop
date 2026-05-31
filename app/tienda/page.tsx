import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllProducts } from '@/lib/queries';
import CollectionTemplate from '@/components/templates/CollectionTemplate/CollectionTemplate';

export const metadata: Metadata = {
  title: 'Tienda · Mulán',
  description: 'Doce piezas, hechas a mano en CDMX. Cuando se acaben, se acaban.',
};

export default async function TiendaPage() {
  const products = await getAllProducts();
  return (
    <Suspense>
      <CollectionTemplate products={products} />
    </Suspense>
  );
}
