'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTweaks } from '@/context/TweaksContext';
import type { HeroVariant, LogoVariant, Density, PageBg } from '@/context/TweaksContext';

export default function TweaksPanel() {
  const { tweaks, setTweak } = useTweaks();
  const [open, setOpen] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clamp = useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    offsetRef.current = {
      x: Math.min(Math.max(PAD, offsetRef.current.x), Math.max(PAD, window.innerWidth - w - PAD)),
      y: Math.min(Math.max(PAD, offsetRef.current.y), Math.max(PAD, window.innerHeight - h - PAD)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  useEffect(() => {
    if (!open) return;
    clamp();
    window.addEventListener('resize', clamp);
    return () => window.removeEventListener('resize', clamp);
  }, [open, clamp]);

  function onDragStart(e: React.MouseEvent) {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev: MouseEvent) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clamp();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  }

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    right: offsetRef.current.x,
    bottom: offsetRef.current.y,
    zIndex: 9999,
    width: 280,
    maxHeight: 'calc(100vh - 32px)',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(250,249,247,0.92)',
    color: '#29261b',
    backdropFilter: 'blur(24px) saturate(160%)',
    WebkitBackdropFilter: 'blur(24px) saturate(160%)',
    border: '0.5px solid rgba(255,255,255,0.6)',
    borderRadius: 14,
    boxShadow: '0 1px 0 rgba(255,255,255,0.5) inset, 0 12px 40px rgba(0,0,0,0.18)',
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
    fontSize: 11.5,
    lineHeight: 1.4,
    overflow: 'hidden',
  };

  return (
    <>
      {/* Toggle button — hidden when panel is open */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          title="Tweaks"
          style={{
            position: 'fixed', right: 16, bottom: 16, zIndex: 10000,
            background: '#111111', color: '#f7f3eb',
            border: 'none', borderRadius: '50%',
            width: 36, height: 36, cursor: 'pointer',
            fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          }}
        >
          ✦
        </button>
      )}

      {open && (
        <div ref={dragRef} style={panelStyle}>
          {/* Header / drag handle */}
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 8px 10px 14px', cursor: 'move', userSelect: 'none' }}
            onMouseDown={onDragStart}
          >
            <b style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.01em' }}>Tweaks</b>
            <button
              style={{ appearance: 'none', border: 0, background: 'transparent', color: 'rgba(41,38,27,0.55)', width: 22, height: 22, borderRadius: 6, cursor: 'pointer', fontSize: 13, lineHeight: 1 }}
              onMouseDown={e => e.stopPropagation()}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '2px 14px 14px', display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>

            <TweakSection label="Logotipo" />
            <TweakSelect
              label="Estilo"
              value={tweaks.logoVariant}
              onChange={v => setTweak('logoVariant', v as LogoVariant)}
              options={[
                { value: 'wordmark', label: 'Wordmark · Mulán' },
                { value: 'monogram', label: 'Monograma · M木' },
                { value: 'seal',     label: 'Sello · 木 + texto' },
              ]}
            />

            <TweakSection label="Hero (home)" />
            <TweakSelect
              label="Variante"
              value={tweaks.heroVariant}
              onChange={v => setTweak('heroVariant', v as HeroVariant)}
              options={[
                { value: 'A', label: 'A · Editorial vertical' },
                { value: 'B', label: 'B · Split manifesto' },
                { value: 'C', label: 'C · Arquitectónico' },
              ]}
            />

            <TweakSection label="Densidad" />
            <TweakRadio
              label="Compacto / amplio"
              value={tweaks.density}
              onChange={v => setTweak('density', v as Density)}
              options={[
                { value: 'loose',   label: 'Amplio' },
                { value: 'compact', label: 'Compacto' },
              ]}
            />

            <TweakSection label="Fondo" />
            <TweakRadio
              label="Color de página"
              value={tweaks.pageBg}
              onChange={v => setTweak('pageBg', v as PageBg)}
              options={[
                { value: 'white', label: 'Blanco' },
                { value: 'warm',  label: 'Lino cálido' },
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
}

function TweakSection({ label }: { label: string }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(41,38,27,0.45)', paddingTop: 8 }}>
      {label}
    </div>
  );
}

function TweakRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: 'rgba(41,38,27,0.72)' }}>
        <span style={{ fontWeight: 500 }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function TweakSelect({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <TweakRow label={label}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          appearance: 'none',
          boxSizing: 'border-box', width: '100%', height: 26, padding: '0 22px 0 8px',
          border: '0.5px solid rgba(0,0,0,0.1)', borderRadius: 7,
          background: `rgba(255,255,255,0.6) url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>") no-repeat right 8px center`,
          color: 'inherit',
          font: 'inherit', fontSize: 11.5,
          outline: 'none', cursor: 'pointer',
        }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </TweakRow>
  );
}

function TweakRadio({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <TweakRow label={label}>
      <div style={{ position: 'relative', display: 'flex', padding: 2, borderRadius: 8, background: 'rgba(0,0,0,0.06)', userSelect: 'none' }}>
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              position: 'relative', zIndex: 1, flex: 1, border: 0, cursor: 'pointer', minHeight: 22,
              background: value === opt.value ? 'rgba(255,255,255,0.9)' : 'transparent',
              borderRadius: 6, padding: '4px 6px', lineHeight: 1.2,
              font: 'inherit', fontSize: 11.5,
              boxShadow: value === opt.value ? '0 1px 2px rgba(0,0,0,0.12)' : 'none',
              color: 'inherit', fontWeight: 500,
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}
