'use client';

import { useSyncExternalStore } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

type Theme = 'system' | 'light' | 'dark';

const ORDER: Theme[] = ['system', 'light', 'dark'];
const LABEL: Record<Theme, string> = {
  system: 'Theme: follows your system',
  light: 'Theme: light',
  dark: 'Theme: dark',
};
const ICON = { system: Monitor, light: Sun, dark: Moon } as const;

export const THEME_KEY = 'timesince-theme';

// The pre-paint script applies the saved preference to the root element.
function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' || attr === 'dark' ? attr : 'system';
}

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => 'system' as const);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];

    const root = document.documentElement;
    if (next === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', next);

    try {
      if (next === 'system') localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, next);
    } catch {
      // Private browsing can refuse storage. The choice still applies to this
      // page; it just is not remembered, which is a fair degradation.
    }
  }

  const Icon = ICON[theme];

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={LABEL[theme]}
      title={LABEL[theme]}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-card border border-line text-muted transition-colors hover:text-ink"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

/**
 * Runs before first paint so a stored choice applies without a flash of the
 * wrong theme. Inline and tiny on purpose: anything async is too late.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})()`;
