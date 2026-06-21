import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProducts, getProductByHandle, getProductsByCollection } from '@/lib/queries';
import ProductTemplate from '@/components/templates/ProductTemplate/ProductTemplate';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map(p => ({ id: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductByHandle(id);
  if (!product) return {};
  return {
    title: `${product.title} · Mulan`,
    description: product.description,
  };
}

export default async function ProductoPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductByHandle(id);
  if (!product) notFound();

  const categoryHandle = product.collections.edges
    .map(e => e.node.handle)
    .find(h => h !== 'frontpage');
  const related = categoryHandle
    ? (await getProductsByCollection(categoryHandle))
        .filter(p => p.handle !== product.handle)
        .slice(0, 4)
    : [];

  return <ProductTemplate product={product} related={related} />;
}
