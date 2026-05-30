interface VerticalEyebrowProps {
  children: React.ReactNode;
  color?: string;
  side?: 'left' | 'right';
  top?: number;
}

export default function VerticalEyebrow({ children, color = '#6e6a64', side = 'left', top = 0 }: VerticalEyebrowProps) {
  return (
    <div
      className="absolute hidden lg:block font-mono text-[10px] tracking-[0.3em] uppercase z-[1] [writing-mode:vertical-rl] [text-orientation:mixed]"
      style={{ [side]: 24, top, color }}
    >
      {children}
    </div>
  );
}
