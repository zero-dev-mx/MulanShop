'use client';

import Link from 'next/link';
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';
import { formatMXN } from '@/lib/products';
import type { ShopifyProduct } from '@/lib/shopify';

interface ProductCardProps {
  product: ShopifyProduct;
  density?: 'loose' | 'compact';
}

export default function ProductCard({ product, density = 'loose' }: ProductCardProps) {
  const compact = density === 'compact';
  const image = product.images.edges[0]?.node.url ?? null;
  const label = product.productType || product.title.toUpperCase();
  const sizes = product.variants.edges.map(e => e.node.title).join(' · ');

  return (
    <Link
      href={`/producto/${product.handle}`}
      className="block no-underline text-sumi cursor-pointer group"
    >
      <div className={`relative ${compact ? 'mb-2.5' : 'mb-3.5'}`}>
        <ImagePlaceholder ratio="3/4" label={label} src={image} />
        <div className="absolute inset-0 bg-[rgba(46,41,39,0.85)] text-paper flex items-center justify-center font-mono text-[10.5px] tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          VER PIEZA →
        </div>
      </div>
      <div className={`flex justify-between items-baseline font-display font-normal mb-0.5 ${compact ? 'text-[14px]' : 'text-[16px]'}`}>
        <span>{product.title}</span>
        <span className={`font-mono text-slate tracking-[0.06em] ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
          {formatMXN(product.priceRange.minVariantPrice.amount)}
        </span>
      </div>
      <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-stone">
        {sizes}
      </div>
    </Link>
  );
}
