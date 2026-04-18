import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-body: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    --font-display: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;

    --radius-sm: 12px;
    --radius-md: 20px;
    --radius-lg: 24px;
    --radius-full: 999px;

    /* ── Light theme (default) ───────────────────────── */
    --bg: #f5f0e8;
    --surface: rgba(255, 250, 244, 0.85);
    --surface-strong: rgba(255, 255, 255, 0.78);
    --border: rgba(34, 49, 63, 0.1);
    --text: #1a2b3c;
    --muted: #6b7d8e;
    --accent: #0f7b6c;
    --accent-strong: #0a5c50;

    --shadow-soft: 0 2px 8px rgba(24, 44, 53, 0.05);
    --shadow: 0 8px 28px rgba(24, 44, 53, 0.08), 0 2px 6px rgba(24, 44, 53, 0.04);

    --glass: rgba(245, 240, 232, 0.82);
    --glass-subtle: rgba(245, 240, 232, 0.6);
    --surface-item: rgba(255, 250, 244, 0.78);
    --surface-alt: rgba(255, 255, 255, 0.62);
    --artwork-from: rgba(255, 255, 255, 0.95);
    --artwork-to: rgba(232, 245, 241, 0.7);
    --skeleton-a: rgba(0, 0, 0, 0.04);
    --skeleton-b: rgba(0, 0, 0, 0.08);
    --stat-track: rgba(34, 49, 63, 0.08);
    --active-surface: rgba(255, 255, 255, 0.72);
  }

  /* ── Dark theme ──────────────────────────────────── */
  [data-theme="dark"] {
    --bg: #0f1318;
    --surface: rgba(22, 28, 38, 0.9);
    --surface-strong: rgba(30, 38, 50, 0.82);
    --border: rgba(200, 210, 220, 0.08);
    --text: #e1e7ef;
    --muted: #7d8da0;
    --accent: #34d399;
    --accent-strong: #10b981;

    --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.3);
    --shadow: 0 8px 28px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2);

    --glass: rgba(15, 19, 24, 0.88);
    --glass-subtle: rgba(15, 19, 24, 0.65);
    --surface-item: rgba(22, 28, 38, 0.8);
    --surface-alt: rgba(30, 38, 50, 0.65);
    --artwork-from: rgba(22, 28, 38, 0.95);
    --artwork-to: rgba(15, 30, 28, 0.7);
    --skeleton-a: rgba(255, 255, 255, 0.04);
    --skeleton-b: rgba(255, 255, 255, 0.08);
    --stat-track: rgba(200, 210, 220, 0.08);
    --active-surface: rgba(30, 38, 50, 0.75);
  }

  /* ── Nord Light ──────────────────────────────────── */
  [data-theme="nord_light"] {
    --bg: #eceff4;
    --surface: rgba(255, 255, 255, 0.9);
    --surface-strong: rgba(240, 243, 248, 0.9);
    --border: rgba(100, 120, 150, 0.15);
    --text: #2e3440;
    --muted: #6a7791;
    --accent: #8fbcbb;
    --accent-strong: #5e81ac;

    --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.05);
    --shadow: 0 8px 28px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05);

    --glass: rgba(255, 255, 255, 0.85);
    --glass-subtle: rgba(255, 255, 255, 0.6);
    --surface-item: rgba(240, 243, 248, 0.85);
    --surface-alt: rgba(220, 225, 235, 0.6);
    --artwork-from: rgba(255, 255, 255, 0.95);
    --artwork-to: rgba(220, 225, 235, 0.7);
    --skeleton-a: rgba(0, 0, 0, 0.03);
    --skeleton-b: rgba(0, 0, 0, 0.06);
    --stat-track: rgba(100, 120, 150, 0.1);
    --active-surface: rgba(220, 225, 235, 0.7);
  }

  /* ── Solarized Light ─────────────────────────────── */
  [data-theme="solarized_light"] {
    --bg: #fdf6e3;
    --surface: rgba(255, 251, 240, 0.9);
    --surface-strong: rgba(250, 244, 220, 0.9);
    --border: rgba(120, 110, 80, 0.15);
    --text: #586e75;
    --muted: #93a1a1;
    --accent: #859900;
    --accent-strong: #2aa198;

    --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.05);
    --shadow: 0 8px 28px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05);

    --glass: rgba(253, 246, 227, 0.85);
    --glass-subtle: rgba(253, 246, 227, 0.6);
    --surface-item: rgba(250, 244, 220, 0.85);
    --surface-alt: rgba(240, 235, 210, 0.6);
    --artwork-from: rgba(255, 251, 240, 0.95);
    --artwork-to: rgba(240, 235, 210, 0.7);
    --skeleton-a: rgba(0, 0, 0, 0.03);
    --skeleton-b: rgba(0, 0, 0, 0.06);
    --stat-track: rgba(120, 110, 80, 0.1);
    --active-surface: rgba(240, 235, 210, 0.7);
  }

  /* ── Modern Ink ────────────────────────────────────── */
  [data-theme="modern_ink"] {
    --bg: #ffffff;
    --surface: rgba(255, 255, 255, 0.95);
    --surface-strong: rgba(245, 245, 245, 0.95);
    --border: rgba(0, 0, 0, 0.1);
    --text: #000000;
    --muted: #666666;
    --accent: #ff360d;
    --accent-strong: #cc2b0a;

    --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.06);
    --shadow: 0 8px 28px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.05);

    --glass: rgba(255, 255, 255, 0.9);
    --glass-subtle: rgba(255, 255, 255, 0.65);
    --surface-item: rgba(245, 245, 245, 0.85);
    --surface-alt: rgba(230, 230, 230, 0.6);
    --artwork-from: rgba(255, 255, 255, 0.95);
    --artwork-to: rgba(230, 230, 230, 0.7);
    --skeleton-a: rgba(0, 0, 0, 0.04);
    --skeleton-b: rgba(0, 0, 0, 0.08);
    --stat-track: rgba(0, 0, 0, 0.08);
    --active-surface: rgba(230, 230, 230, 0.7);
  }

  /* ── Husqy ───────────────────────────────────────── */
  [data-theme="husqy"] {
    --bg: #000000;
    --surface: rgba(10, 10, 10, 0.9);
    --surface-strong: rgba(20, 20, 20, 0.95);
    --border: rgba(197, 138, 255, 0.25);

    --text: #ebd7ff;
    --muted: #c58aff;

    --accent: #c58aff;
    --accent-strong: #972fff;

    --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.6);
    --shadow: 0 8px 28px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.5);

    --glass: rgba(0, 0, 0, 0.75);
    --glass-subtle: rgba(0, 0, 0, 0.5);

    --surface-item: rgba(25, 0, 40, 0.7);
    --surface-alt: rgba(151, 47, 255, 0.15);

    --artwork-from: rgba(0, 0, 0, 0.95);
    --artwork-to: rgba(151, 47, 255, 0.3);

    --skeleton-a: rgba(255, 255, 255, 0.05);
    --skeleton-b: rgba(255, 255, 255, 0.1);

    --stat-track: rgba(197, 138, 255, 0.2);
    --active-surface: rgba(151, 47, 255, 0.25);
  }

  /* ── Aurora ──────────────────────────────────────── */
  [data-theme="aurora"] {
    --bg: #011926;
    --surface: rgba(1, 25, 38, 0.9);
    --surface-strong: rgba(3, 35, 50, 0.95);
    --border: rgba(0, 233, 128, 0.25);

    --text: #ffffff;
    --muted: #245c69;

    --accent: #00e980;
    --accent-strong: #00e980;

    --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.6);
    --shadow: 0 8px 28px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.5);

    --glass: rgba(1, 25, 38, 0.75);
    --glass-subtle: rgba(1, 25, 38, 0.5);

    --surface-item: rgba(0, 233, 128, 0.08);
    --surface-alt: rgba(36, 92, 105, 0.2);

    --artwork-from: rgba(1, 25, 38, 0.95);
    --artwork-to: rgba(0, 233, 128, 0.25);

    --skeleton-a: rgba(255, 255, 255, 0.05);
    --skeleton-b: rgba(255, 255, 255, 0.1);

    --stat-track: rgba(0, 233, 128, 0.2);
    --active-surface: rgba(0, 233, 128, 0.2);
  }

  /* ── Tangerine ─────────────────────────────────── */
  [data-theme="tangerine"] {
    --bg: #ffede0;
    --surface: rgba(255, 237, 224, 0.9);
    --surface-strong: rgba(255, 220, 200, 0.9);
    --border: rgba(200, 120, 60, 0.2);
    --text: #3d1705;
    --muted: #a65a2a;
    --accent: #fe5503;
    --accent-strong: #ff9562;

    --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.06);
    --shadow: 0 8px 28px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.05);

    --glass: rgba(255, 237, 224, 0.85);
    --glass-subtle: rgba(255, 237, 224, 0.6);
    --surface-item: rgba(255, 220, 200, 0.85);
    --surface-alt: rgba(255, 200, 170, 0.6);
    --artwork-from: rgba(255, 237, 224, 0.95);
    --artwork-to: rgba(255, 200, 170, 0.7);
    --skeleton-a: rgba(0, 0, 0, 0.04);
    --skeleton-b: rgba(0, 0, 0, 0.08);
    --stat-track: rgba(200, 120, 60, 0.15);
    --active-surface: rgba(255, 200, 170, 0.7);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    min-height: 100dvh;
  }

  img {
    display: block;
    max-width: 100%;
  }

  button {
    cursor: pointer;
    font: inherit;
    color: inherit;
    border: none;
    background: none;
  }

  input, select {
    font: inherit;
  }

  a {
    color: inherit;
  }

  ::selection {
    background: rgba(15, 123, 108, 0.15);
    color: var(--text);
  }

  /* ── Custom scrollbar ────────────────────────────── */

  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(15, 123, 108, 0.25) transparent;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(15, 123, 108, 0.25);
    border-radius: var(--radius-full);
    border: 2px solid var(--bg);
    transition: background 160ms ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(15, 123, 108, 0.45);
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }
`
