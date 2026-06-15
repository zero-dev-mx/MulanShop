interface SealProps {
  size?: number;
  color?: string;
  bg?: string;
  char?: string;
}

export default function Seal({ size = 32, color = '#111111', bg = 'transparent', char = 'M' }: SealProps) {
  const hasBg = bg !== 'transparent';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        background: bg,
        color,
        border: hasBg ? 'none' : `1px solid ${color}`,
        fontFamily: 'var(--font-body)',
        fontSize: size * 0.55,
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: 0,
      }}
    >
      {char}
    </span>
  );
}
