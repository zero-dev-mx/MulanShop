import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MULAN_PRODUCTS } from '@/lib/products';
import ProductTemplate from '@/components/templates/ProductTemplate/ProductTemplate';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MULAN_PRODUCTS.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = MULAN_PRODUCTS.find(p => p.id === id);
  if (!product) return {};
  return {
    title: `${product.name} · Mulán`,
    description: product.description,
  };
}

export default async function ProductoPage({ params }: Props) {
  const { id } = await params;
  const product = MULAN_PRODUCTS.find(p => p.id === id);
  if (!product) notFound();
  return <ProductTemplate productId={id} />;
}
