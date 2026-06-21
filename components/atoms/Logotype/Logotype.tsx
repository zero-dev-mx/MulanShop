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
        }}>M</span>
        <span style={{ fontSize: size * 0.7, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 400 }}>Mulan Shop</span>
      </span>
    );
  }

  return (
    <span style={{ ...baseStyle, fontSize: size }}>
      Mulan Shop
      <span style={{ color: '#7a2a20', fontFamily: 'var(--font-body)', fontSize: size * 0.7, marginLeft: 1 }}>·</span>
    </span>
  );
}
