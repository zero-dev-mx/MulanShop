import Link from 'next/link';
import type { Category } from '@/lib/products';
import ImagePlaceholder from '@/components/atoms/ImagePlaceholder/ImagePlaceholder';

interface CategoryCardProps {
  category: Category;
  index: number;
  total: number;
}

export default function CategoryCard({ category, index, total }: CategoryCardProps) {
  const dark = index === 1;
  return (
    <Link href={`/tienda?cat=${category.id}`} className="no-underline text-inherit block relative">
      <div className="relative mb-4 overflow-hidden">
        <ImagePlaceholder
          ratio="4/5"
          label={category.label.toUpperCase()}
          tone={dark ? 'dark' : 'light'}
          src={category.featuredImage ?? null}
          objectPosition="center top"
        />
        <div className={`absolute top-4 left-4 font-mono text-[10px] tracking-[0.22em] ${dark ? 'text-white' : 'text-sumi'}`}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>
      <div className="flex justify-between items-baseline">
        <div>
          <h3 className="m-0 font-display text-[28px] font-normal tracking-[-0.01em] md:text-[32px]">{category.label}</h3>
          <p className="m-0 mt-1.5 font-body italic text-[14px] text-slate">{category.blurb}</p>
        </div>
        <span className="font-mono text-[10px] tracking-[0.22em] text-stone shrink-0 ml-4">{category.count} piezas →</span>
      </div>
    </Link>
  );
}
