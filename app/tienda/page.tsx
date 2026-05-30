import type { Metadata } from 'next';
import { Suspense } from 'react';
import CollectionTemplate from '@/components/templates/CollectionTemplate/CollectionTemplate';

export const metadata: Metadata = {
  title: 'Tienda · Mulán',
  description: 'Doce piezas, hechas a mano en CDMX. Cuando se acaben, se acaban.',
};

export default function TiendaPage() {
  return (
    <Suspense>
      <CollectionTemplate />
    </Suspense>
  );
}
