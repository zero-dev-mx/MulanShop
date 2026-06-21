'use client';

import Link from 'next/link';
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';
import { formatMXN } from '@/lib/products';
import type { ShopifyProduct } from '@/lib/shopify';

interface SaleProductCardProps {
  product: ShopifyProduct;
}

export default function SaleProductCard({ product }: SaleProductCardProps) {
  const image = product.images.edges[0]?.node.url ?? null;
  const label = product.productType || product.title.toUpperCase();

  return (
    <Link
      href={`/producto/${product.handle}`}
      className="block no-underline text-sumi cursor-pointer group"
    >
      <div className="relative mb-4">
        <ImagePlaceholder ratio="2/4" label={label} src={image} />
        <div className="absolute inset-0 bg-[rgba(46,41,39,0.85)] text-paper flex items-center justify-center font-mono text-[10.5px] tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          VER PIEZA →
        </div>
      </div>
      <div className="flex justify-between items-baseline font-display font-normal mb-1 text-[18px]">
        <span>{product.title}</span>
        <span className="font-mono text-slate tracking-[0.06em] text-[12px]">
          {formatMXN(product.priceRange.minVariantPrice.amount)}
        </span>
      </div>
    </Link>
  );
}
