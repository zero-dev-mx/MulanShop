interface LogotypeProps {
  variant?: 'wordmark' | 'monogram' | 'seal';
  size?: number;
  color?: string;
}

export default function Logotype({ variant = 'wordmark', size = 24, color = '#111111' }: LogotypeProps) {
  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    color,
    letterSpacing: '0.02em',
    fontWeight: 500,
    userSelect: 'none',
    lineHeight: 1,
    display: 'inline-flex',
    alignItems: 'center',
    gap: size * 0.3,
  };

  if (variant === 'monogram') {
    return (
      <span style={{ ...baseStyle, fontSize: size * 1.4, fontWeight: 400 }}>
        M
        <span style={{ color: '#7a2a20', fontSize: size * 0.5, verticalAlign: 'super' }}>木</span>
      </span>
    );
  }

  if (variant === 'seal') {
    return (
      <span style={{ ...baseStyle, fontSize: size, gap: size * 0.4 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: size * 1.5, height: size * 1.5,
          background: '#111111', color: '#f2ede4',
          fontSize: size * 0.85, fontWeight: 500,
        }}>木</span>
        <span style={{ fontSize: size * 0.7, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 400 }}>Mulán Shop</span>
      </span>
    );
  }

  return (
    <span style={{ ...baseStyle, fontSize: size }}>
      Mulán Shop
      <span style={{ color: '#7a2a20', fontFamily: 'var(--font-body)', fontSize: size * 0.7, marginLeft: 1 }}>·</span>
    </span>
  );
}
