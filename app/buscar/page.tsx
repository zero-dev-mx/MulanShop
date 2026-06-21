import type { Metadata } from 'next';
import { Suspense } from 'react';
import { searchProducts } from '@/lib/queries';
import SearchTemplate from '@/components/templates/SearchTemplate/SearchTemplate';

export const metadata: Metadata = {
  title: 'Buscar · Mulan',
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function BuscarPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';
  const products = query ? await searchProducts(query) : [];

  return (
    <Suspense>
      <SearchTemplate query={query} products={products} />
    </Suspense>
  );
}
