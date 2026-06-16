import { act, renderHook } from '@testing-library/react';
import { TweaksProvider, useTweaks } from './TweaksContext';

const STORAGE_KEY = 'mulan-tweaks';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TweaksProvider>{children}</TweaksProvider>
);

beforeEach(() => {
  localStorage.clear();
  document.documentElement.style.removeProperty('--mulan-bg');
});

it('throws when used outside a provider', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => renderHook(() => useTweaks())).toThrow('useTweaks must be used inside TweaksProvider');
  spy.mockRestore();
});

it('exposes the defaults when storage is empty', () => {
  const { result } = renderHook(() => useTweaks(), { wrapper });
  expect(result.current.tweaks).toEqual({
    heroVariant: 'C',
    logoVariant: 'wordmark',
    density: 'loose',
    pageBg: 'white',
  });
});

it('persists a tweak to localStorage', () => {
  const { result } = renderHook(() => useTweaks(), { wrapper });

  act(() => result.current.setTweak('density', 'compact'));

  expect(result.current.tweaks.density).toBe('compact');
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toMatchObject({ density: 'compact' });
});

it('hydrates from stored values merged over defaults', () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ logoVariant: 'seal' }));
  const { result } = renderHook(() => useTweaks(), { wrapper });

  expect(result.current.tweaks.logoVariant).toBe('seal');
  // unspecified keys still fall back to defaults
  expect(result.current.tweaks.heroVariant).toBe('C');
});

it('ignores malformed stored JSON', () => {
  localStorage.setItem(STORAGE_KEY, '{not json');
  const { result } = renderHook(() => useTweaks(), { wrapper });
  expect(result.current.tweaks.heroVariant).toBe('C');
});

it('reflects pageBg on the --mulan-bg custom property', () => {
  const { result } = renderHook(() => useTweaks(), { wrapper });
  expect(document.documentElement.style.getPropertyValue('--mulan-bg')).toBe('#FFFFFF');

  act(() => result.current.setTweak('pageBg', 'warm'));
  expect(document.documentElement.style.getPropertyValue('--mulan-bg')).toBe('#EFEAE1');
});
