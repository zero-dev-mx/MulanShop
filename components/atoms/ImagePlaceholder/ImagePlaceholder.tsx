import Image from 'next/image';
import Seal from '@/components/atoms/Seal/Seal';

interface ImagePlaceholderProps {
  ratio?: string | 'auto';
  label?: string;
  tone?: 'light' | 'dark';
  seal?: boolean;
  sealChar?: string;
  src?: string | null;
  objectPosition?: string;
  children?: React.ReactNode;
}

export default function ImagePlaceholder({
  ratio = '3/4',
  label = 'IMAGEN',
  tone = 'light',
  seal = false,
  sealChar = '木',
  src = null,
  objectPosition = 'center 18%',
  children,
}: ImagePlaceholderProps) {
  const isDark = tone === 'dark';
  const bg = isDark ? '#3a3a38' : '#d8d2c7';
  const stripe = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(46,41,39,0.05)';
  const txt = isDark ? '#d8d2c7' : '#6e6a64';
  const isAuto = ratio === 'auto';

  return (
    <div
      style={{
        aspectRatio: isAuto ? undefined : ratio,
        height: isAuto ? '100%' : undefined,
        minHeight: isAuto ? '100%' : undefined,
        background: src
          ? bg
          : `repeating-linear-gradient(135deg, ${stripe} 0 1.5px, transparent 1.5px 14px), ${bg}`,
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {src && (
        <Image
          src={src}
          alt={label}
          fill
          style={{ objectFit: 'cover', objectPosition }}
        />
      )}
      {!src && (
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: 9.5,
            letterSpacing: '0.18em',
            color: txt,
          }}
        >
          [ {label} ]
        </div>
      )}
      {seal && (
        <div style={{ position: 'absolute', top: 14, right: 14 }}>
          <Seal
            size={28}
            color={isDark || src ? '#f7f3eb' : '#111111'}
            bg="transparent"
            char={sealChar}
          />
        </div>
      )}
      {children}
    </div>
  );
}
