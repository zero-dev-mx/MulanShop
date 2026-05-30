interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  side?: string;
  count?: number;
}

export default function SectionHeader({ eyebrow, title, side, count }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-ash/50 pb-[18px] mb-9 gap-3 sm:gap-6">
      <div>
        <div className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-stone mb-2.5">
          {eyebrow}
        </div>
        <h2 className="m-0 font-display text-[32px] leading-[1.02] font-normal tracking-[-0.015em] text-sumi md:text-[44px]">
          {title}
        </h2>
      </div>
      {(side || count != null) && (
        <div className="sm:text-right">
          {side && <div className="font-body italic text-[14px] text-slate mb-1.5">{side}</div>}
          {count != null && <div className="font-mono text-[10px] text-stone tracking-[0.18em]">{count} piezas</div>}
        </div>
      )}
    </div>
  );
}
