'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type HeroVariant = 'A' | 'B' | 'C';
export type LogoVariant = 'wordmark' | 'monogram' | 'seal';
export type Density = 'loose' | 'compact';
export type PageBg = 'white' | 'warm';

export interface Tweaks {
  heroVariant: HeroVariant;
  logoVariant: LogoVariant;
  density: Density;
  pageBg: PageBg;
}

const DEFAULTS: Tweaks = {
  heroVariant: 'C',
  logoVariant: 'wordmark',
  density: 'loose',
  pageBg: 'white',
};

const STORAGE_KEY = 'mulan-tweaks';

interface TweaksContextValue {
  tweaks: Tweaks;
  setTweak: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void;
}

const TweaksContext = createContext<TweaksContextValue | null>(null);

export function TweaksProvider({ children }: { children: React.ReactNode }) {
  const [tweaks, setTweaks] = useState<Tweaks>(DEFAULTS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setTweaks({ ...DEFAULTS, ...JSON.parse(stored) });
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--mulan-bg',
      tweaks.pageBg === 'white' ? '#FFFFFF' : '#EFEAE1'
    );
  }, [tweaks.pageBg]);

  function setTweak<K extends keyof Tweaks>(key: K, value: Tweaks[K]) {
    setTweaks(prev => {
      const next = { ...prev, [key]: value };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }

  return (
    <TweaksContext.Provider value={{ tweaks, setTweak }}>
      {children}
    </TweaksContext.Provider>
  );
}

export function useTweaks(): TweaksContextValue {
  const ctx = useContext(TweaksContext);
  if (!ctx) throw new Error('useTweaks must be used inside TweaksProvider');
  return ctx;
}
