import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --font-body: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    --font-display: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;

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

    --radius-sm: 12px;
    --radius-md: 20px;
    --radius-lg: 24px;
    --radius-full: 999px;
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
`
