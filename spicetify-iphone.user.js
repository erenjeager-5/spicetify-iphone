// ==UserScript==
// @name         Spicetify iPhone
// @namespace    spicetify-iphone
// @version      1.1.0
// @description  p1nk v01d, NPV Ambience, Auto Skip Videos, Jumping ZeroTwo, and Adblockify web UI cleanup (no Premium spoof)
// @match        https://open.spotify.com/*
// @run-at       document-start
// @inject-into  content
// @grant        none
// @noframes
// ==/UserScript==

/*
 * Ported from Spicetify for use in Safari (iPhone) via the Userscripts app.
 *   Theme:     p1nk v01d — nullie (MIT) — github.com/nulli3/spicetify-pink-void
 *   Extension: NPV Ambience — OhItsTom — github.com/ohitstom/spicetify-extensions
 *   Extension: Auto Skip Videos — Spicetify — github.com/spicetify/cli
 *   Snippet:   Jumping ZeroTwo — Spicetify Marketplace
 *   Port:      Adblockify web UI cleanup — inspired by ririxi (rxri/spicetify-extensions)
 *              Web-only port: cannot disable Spotify ad services or spoof Premium.
 */
(function () {
  'use strict';
  const VERSION = '1.1.0';

  /* ------------------------------------------------------------------
   * 1. STYLES (theme + extension CSS + snippet)
   * ------------------------------------------------------------------ */
  const CSS = ":root {\n  --spice-main: #110e18;\n  --spice-rgb-main: 17,14,24;\n  --spice-sidebar: #0d0a14;\n  --spice-rgb-sidebar: 13,10,20;\n  --spice-player: #161222;\n  --spice-rgb-player: 22,18,34;\n  --spice-card: #1c1628;\n  --spice-rgb-card: 28,22,40;\n  --spice-shadow: #08060e;\n  --spice-rgb-shadow: 8,6,14;\n  --spice-selected-row: #c8bfd4;\n  --spice-rgb-selected-row: 200,191,212;\n  --spice-button: #d94f9e;\n  --spice-rgb-button: 217,79,158;\n  --spice-button-active: #ee6fba;\n  --spice-rgb-button-active: 238,111,186;\n  --spice-button-disabled: #4a3a55;\n  --spice-rgb-button-disabled: 74,58,85;\n  --spice-tab-active: #d94f9e;\n  --spice-rgb-tab-active: 217,79,158;\n  --spice-notification: #d94f9e;\n  --spice-rgb-notification: 217,79,158;\n  --spice-notification-error: #e53e6b;\n  --spice-rgb-notification-error: 229,62,107;\n  --spice-text: #eee6f4;\n  --spice-rgb-text: 238,230,244;\n  --spice-subtext: #a090b8;\n  --spice-rgb-subtext: 160,144,184;\n  --spice-misc: #eee6f4;\n  --spice-rgb-misc: 238,230,244;\n  --spice-main-elevated: #1c1628;\n  --spice-rgb-main-elevated: 28,22,40;\n  --spice-highlight: #1c1628;\n  --spice-rgb-highlight: 28,22,40;\n  --spice-highlight-elevated: #c8bfd4;\n  --spice-rgb-highlight-elevated: 200,191,212;\n}\n\n/* ===== p1nk v01d by nullie (MIT) ===== */\n/* ================================================================\n   p 1 n k   v 0 1 d\n   ================================================================ */\n\n\n\n/* ================================================================\n   I.  DESIGN TOKENS\n   ================================================================ */\n\n:root {\n  /* -- Accent palette -- */\n  --void-pink: 217, 79, 158;\n  --void-purple: 180, 77, 224;\n  --void-rose: 238, 111, 186;\n  --void-violet: 142, 68, 196;\n  --void-blush: 255, 160, 210;\n\n  /* -- Surface tints -- */\n  --void-surface-1: rgba(255, 255, 255, 0.03);\n  --void-surface-2: rgba(255, 255, 255, 0.05);\n  --void-surface-3: rgba(255, 255, 255, 0.08);\n  --void-surface-hover: rgba(var(--void-pink), 0.07);\n  --void-surface-active: rgba(var(--void-pink), 0.12);\n\n  /* -- Borders -- */\n  --void-border-faint: rgba(255, 255, 255, 0.04);\n  --void-border-subtle: rgba(255, 255, 255, 0.07);\n  --void-border-accent: rgba(var(--void-pink), 0.2);\n  --void-border-glow: rgba(var(--void-pink), 0.35);\n\n  /* -- Glow & shadows -- */\n  --void-glow-sm: 0 0 8px rgba(var(--void-pink), 0.2);\n  --void-glow-md: 0 0 16px rgba(var(--void-pink), 0.2);\n  --void-glow-lg: 0 4px 30px rgba(var(--void-pink), 0.15);\n  --void-shadow-sm: 0 2px 8px rgba(8, 6, 14, 0.4);\n  --void-shadow-md: 0 4px 16px rgba(8, 6, 14, 0.5);\n  --void-shadow-lg: 0 8px 40px rgba(8, 6, 14, 0.6);\n  --void-shadow-xl: 0 16px 64px rgba(8, 6, 14, 0.7);\n\n  /* -- Gradients -- */\n  --void-grad-accent: linear-gradient(135deg, rgb(var(--void-pink)), rgb(var(--void-purple)));\n  --void-grad-accent-h: linear-gradient(90deg, rgb(var(--void-pink)), rgb(var(--void-purple)));\n  --void-grad-surface: linear-gradient(180deg, rgba(var(--void-pink), 0.06), transparent);\n  --void-grad-radial: radial-gradient(ellipse at 30% 0%, rgba(var(--void-purple), 0.08), transparent 60%);\n  --void-grad-warm: linear-gradient(180deg, rgba(var(--void-pink), 0.04) 0%, transparent 40%);\n\n  /* -- Motion -- */\n  --void-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);\n  --void-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);\n  --void-speed-fast: 0.15s;\n  --void-speed: 0.25s;\n  --void-speed-slow: 0.4s;\n\n  /* -- Radius -- */\n  --void-radius-sm: 6px;\n  --void-radius-md: 10px;\n  --void-radius-lg: 14px;\n  --void-radius-xl: 20px;\n  --void-radius-pill: 100px;\n}\n\n\n/* ================================================================\n   II. TYPOGRAPHY\n   ================================================================ */\n\n* {\n  font-family: 'Outfit', sans-serif !important;\n}\n\n/* Tighten up heading letter-spacing */\nh1, h2, h3,\n[class*=\"Type__TypeElement\"] {\n  letter-spacing: -0.01em !important;\n}\n\n/* Large display headings */\n.main-entityHeader-title h1,\n.main-shelf-title {\n  font-weight: 700 !important;\n  letter-spacing: -0.025em !important;\n}\n\n/* Body text refinement */\nspan, p, a, div {\n  -webkit-font-smoothing: antialiased !important;\n  -moz-osx-font-smoothing: grayscale !important;\n}\n\n\n/* ================================================================\n   III. GLOBAL BACKGROUND & NOISE TEXTURE\n   ================================================================ */\n\nbody {\n  background-color: var(--spice-main) !important;\n}\n\n\n/* Noise texture overlay for depth */\nbody::after {\n  content: '';\n  position: fixed;\n  inset: 0;\n  background-image: url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\");\n  background-repeat: repeat;\n  background-size: 256px 256px;\n  pointer-events: none;\n  z-index: 9999;\n  opacity: 0.4;\n}\n\n\n/* ================================================================\n   IV. SIDEBAR (Left Panel)\n   ================================================================ */\n\n/* Container */\n.Root__nav-bar,\n.LayoutResizer__resize-bar {\n  background: var(--spice-sidebar) !important;\n}\n\n.Root__nav-bar {\n  border-right: 1px solid var(--void-border-faint) !important;\n}\n\n/* Sidebar top section (Home / Search) */\n.main-navBar-navBar {\n  background: transparent !important;\n  padding: 8px !important;\n  gap: 2px !important;\n}\n\n/* Nav links */\n.main-navBar-navBarLink {\n  border-radius: var(--void-radius-md) !important;\n  padding: 10px 16px !important;\n  transition: background var(--void-speed) var(--void-ease),\n              color var(--void-speed) var(--void-ease) !important;\n}\n\n.main-navBar-navBarLink:hover {\n  background: var(--void-surface-hover) !important;\n}\n\n.main-navBar-navBarLink.active {\n  background: var(--void-surface-active) !important;\n  color: var(--spice-text) !important;\n}\n\n/* Your Library section */\n.main-yourLibraryX-libraryContainer {\n  background: transparent !important;\n}\n\n.main-yourLibraryX-libraryRootlist {\n  background: transparent !important;\n}\n\n/* Library items */\n.main-yourLibraryX-listItem {\n  border-radius: var(--void-radius-sm) !important;\n  transition: background var(--void-speed-fast) var(--void-ease) !important;\n}\n\n.main-yourLibraryX-listItem:hover {\n  background: var(--void-surface-hover) !important;\n}\n\n/* Library filter chips */\n.main-yourLibraryX-filterArea button {\n  background: var(--void-surface-2) !important;\n  border: 1px solid var(--void-border-faint) !important;\n  border-radius: var(--void-radius-pill) !important;\n  color: var(--spice-subtext) !important;\n  transition: all var(--void-speed-fast) var(--void-ease) !important;\n}\n\n.main-yourLibraryX-filterArea button:hover {\n  background: var(--void-surface-3) !important;\n  color: var(--spice-text) !important;\n}\n\n.main-yourLibraryX-filterArea button[aria-checked=\"true\"],\n.main-yourLibraryX-filterArea button.active {\n  background: rgba(var(--void-pink), 0.15) !important;\n  border-color: var(--void-border-accent) !important;\n  color: rgb(var(--void-rose)) !important;\n}\n\n/* Sidebar resize handle */\n.LayoutResizer__input {\n  background: transparent !important;\n}\n\n.LayoutResizer__input:hover {\n  background: rgba(var(--void-pink), 0.3) !important;\n}\n\n/* Sidebar footer (Install app, etc) */\n.main-navBar-navBarFooter {\n  border-top: 1px solid var(--void-border-faint) !important;\n}\n\n\n/* ================================================================\n   V.  TOP BAR / NAVIGATION\n   ================================================================ */\n\n.main-topBar-container {\n  background: transparent !important;\n  padding: 12px 16px !important;\n}\n\n/* Scrolled state \u2014 frosted glass */\n.main-topBar-container[style*=\"background-color\"],\n.main-topBar-background {\n  background: rgba(17, 14, 24, 0.8) !important;\n  backdrop-filter: blur(20px) saturate(1.2) !important;\n  -webkit-backdrop-filter: blur(20px) saturate(1.2) !important;\n  border-bottom: 1px solid var(--void-border-faint) !important;\n}\n\n/* Back / Forward buttons */\n.main-topBar-historyButtons button {\n  background: var(--void-surface-2) !important;\n  border: 1px solid var(--void-border-faint) !important;\n  color: var(--spice-subtext) !important;\n  border-radius: 50% !important;\n  transition: all var(--void-speed-fast) var(--void-ease) !important;\n}\n\n.main-topBar-historyButtons button:hover {\n  background: var(--void-surface-3) !important;\n  color: var(--spice-text) !important;\n  border-color: var(--void-border-subtle) !important;\n}\n\n/* User avatar button */\n.main-topBar-container button[data-testid=\"user-widget-link\"] {\n  background: var(--void-surface-2) !important;\n  border: 1px solid var(--void-border-faint) !important;\n  transition: all var(--void-speed-fast) var(--void-ease) !important;\n}\n\n.main-topBar-container button[data-testid=\"user-widget-link\"]:hover {\n  border-color: var(--void-border-accent) !important;\n  box-shadow: var(--void-glow-sm) !important;\n}\n\n/* Top bar action buttons (upgrade, install, etc) */\n.main-topBar-container .encore-over-media-set button {\n  border-radius: var(--void-radius-pill) !important;\n}\n\n\n/* ================================================================\n   VI. MAIN CONTENT AREA\n   ================================================================ */\n\n.Root__main-view {\n  background: var(--spice-main) !important;\n}\n\n/* Section titles (e.g. \"Made For You\", \"Recently Played\") */\n.main-shelf-title {\n  color: var(--spice-text) !important;\n}\n\n.main-shelf-title a:hover {\n  color: rgb(var(--void-rose)) !important;\n}\n\n/* \"Show all\" links */\n.main-shelf-seeAll {\n  color: var(--spice-subtext) !important;\n  font-weight: 500 !important;\n  letter-spacing: 0.02em !important;\n  text-transform: uppercase !important;\n  font-size: 11px !important;\n  transition: color var(--void-speed-fast) var(--void-ease) !important;\n}\n\n.main-shelf-seeAll:hover {\n  color: rgb(var(--void-rose)) !important;\n}\n\n/* Horizontal scroll sections */\n.main-shelf-shelf {\n  padding-bottom: 4px !important;\n}\n\n\n/* ================================================================\n   VII. CARDS\n   ================================================================ */\n\n/* Base card */\n.main-card-card {\n  background: var(--spice-card) !important;\n  border: 1px solid var(--void-border-faint) !important;\n  border-radius: var(--void-radius-md) !important;\n  box-shadow: var(--void-shadow-sm) !important;\n  transition: all var(--void-speed) var(--void-ease) !important;\n  overflow: hidden !important;\n}\n\n.main-card-card:hover {\n  background: rgba(28, 22, 40, 0.95) !important;\n  border-color: var(--void-border-accent) !important;\n  box-shadow: var(--void-glow-lg) !important;\n  transform: translateY(-3px) !important;\n}\n\n/* Card image */\n.main-card-card .main-cardImage-imageWrapper {\n  border-radius: var(--void-radius-sm) !important;\n  overflow: hidden !important;\n}\n\n.main-card-card:hover .main-cardImage-imageWrapper {\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;\n}\n\n/* Card image slight zoom on hover */\n.main-card-card .main-image-image {\n  transition: transform var(--void-speed-slow) var(--void-ease) !important;\n}\n\n.main-card-card:hover .main-image-image {\n  transform: scale(1.03) !important;\n}\n\n/* Card play button (green circle \u2192 pink) */\n.main-card-PlayButtonContainer button,\n.main-card-card button[data-testid=\"play-button\"] {\n  background-color: rgb(var(--void-pink)) !important;\n  color: #fff !important;\n  box-shadow: var(--void-shadow-md) !important;\n  transition: all var(--void-speed-fast) var(--void-ease-bounce) !important;\n}\n\n.main-card-PlayButtonContainer button:hover,\n.main-card-card button[data-testid=\"play-button\"]:hover {\n  transform: scale(1.08) !important;\n  background-color: rgb(var(--void-rose)) !important;\n  box-shadow: var(--void-glow-md) !important;\n}\n\n/* Card text */\n.main-card-card .main-cardHeader-text {\n  color: var(--spice-text) !important;\n}\n\n.main-card-card .main-cardSubHeader-root {\n  color: var(--spice-subtext) !important;\n}\n\n/* Card hover text color */\n.main-card-card:hover .main-cardHeader-link {\n  color: rgb(var(--void-blush)) !important;\n}\n\n\n/* ================================================================\n   VIII. GENRE / BROWSE CATEGORY CARDS\n   ================================================================ */\n\n.main-cardImage-imagePlaceholder,\n[data-testid=\"genre-card\"] {\n  border-radius: var(--void-radius-md) !important;\n  overflow: hidden !important;\n}\n\n\n/* ================================================================\n   IX. TRACK LIST / TABLE\n   ================================================================ */\n\n/* Table header */\n.main-trackList-trackListHeaderRow {\n  border-bottom: 1px solid var(--void-border-faint) !important;\n  color: var(--spice-subtext) !important;\n  font-weight: 500 !important;\n  text-transform: uppercase !important;\n  font-size: 11px !important;\n  letter-spacing: 0.06em !important;\n}\n\n/* Column resize handles \u2192 thin separator lines */\n[aria-label=\"Resize columns\"] {\n  background: transparent !important;\n  border: none !important;\n  width: 1px !important;\n  min-width: 1px !important;\n  max-width: 1px !important;\n  padding: 0 !important;\n  border-radius: 0 !important;\n  position: relative !important;\n  overflow: visible !important;\n}\n\n[aria-label=\"Resize columns\"]::after {\n  content: '' !important;\n  position: absolute !important;\n  top: 20% !important;\n  bottom: 20% !important;\n  left: 0 !important;\n  width: 1px !important;\n  background: var(--void-border-subtle) !important;\n  transition: background var(--void-speed-fast) var(--void-ease) !important;\n}\n\n[aria-label=\"Resize columns\"]:hover::after {\n  background: rgba(var(--void-pink), 0.4) !important;\n}\n\n/* Track rows */\n.main-trackList-trackListRow {\n  border-radius: var(--void-radius-sm) !important;\n  transition: background var(--void-speed-fast) var(--void-ease) !important;\n}\n\n.main-trackList-trackListRow:hover {\n  background: var(--void-surface-hover) !important;\n}\n\n/* Currently playing row */\n.main-trackList-trackListRow.main-trackList-active,\n.main-trackList-trackListRow[aria-selected=\"true\"] {\n  background: var(--void-surface-active) !important;\n}\n\n/* Playing indicator (animated bars icon) */\n.main-trackList-playingIcon {\n  color: rgb(var(--void-pink)) !important;\n}\n\n/* Track name when playing */\n.main-trackList-active .main-trackList-trackListRowName,\n[class*=\"trackListRow\"] [data-encore-id=\"text\"][style*=\"color\"] {\n  color: rgb(var(--void-rose)) !important;\n}\n\n/* Track number / index */\n.main-trackList-rowSectionIndex {\n  color: var(--spice-subtext) !important;\n  font-variant-numeric: tabular-nums !important;\n}\n\n/* Track duration */\n.main-trackList-rowSectionEnd {\n  color: var(--spice-subtext) !important;\n  font-variant-numeric: tabular-nums !important;\n}\n\n/* Track drag handle on hover */\n.main-trackList-trackListRow:hover .main-trackList-rowSectionIndex {\n  color: var(--spice-text) !important;\n}\n\n\n/* ================================================================\n   X.  ALBUM / PLAYLIST PAGE HEADERS\n   ================================================================ */\n\n/* Hero gradient overlay */\n.main-entityHeader-backgroundColor,\n.main-entityHeader-overlay {\n  background: linear-gradient(\n    180deg,\n    rgba(var(--void-purple), 0.15) 0%,\n    var(--spice-main) 100%\n  ) !important;\n}\n\n/* Entity title */\n.main-entityHeader-title h1 {\n  font-weight: 700 !important;\n  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3) !important;\n}\n\n/* Entity owner / metadata */\n.main-entityHeader-metaData,\n.main-entityHeader-metaData span,\n.main-entityHeader-metaData a {\n  color: var(--spice-subtext) !important;\n}\n\n.main-entityHeader-metaData a:hover {\n  color: var(--spice-text) !important;\n}\n\n/* Entity cover art */\n.main-entityHeader-image img {\n  border-radius: var(--void-radius-md) !important;\n  box-shadow: var(--void-shadow-lg) !important;\n}\n\n/* Action bar (play, heart, more) */\n.main-actionBar-ActionBar {\n  padding: 16px 0 16px 16px !important;\n}\n\n/* Big play button on entity pages */\n.main-actionBar-ActionBar button[data-testid=\"play-button\"],\n.main-actionBar-ActionBar button[data-testid=\"pause-button\"] {\n  background: rgb(var(--void-pink)) !important;\n  transition: all var(--void-speed-fast) var(--void-ease-bounce) !important;\n}\n\n.main-actionBar-ActionBar button[data-testid=\"play-button\"]:hover,\n.main-actionBar-ActionBar button[data-testid=\"pause-button\"]:hover {\n  background: rgb(var(--void-rose)) !important;\n  transform: scale(1.05) !important;\n  box-shadow: var(--void-glow-md) !important;\n}\n\n\n/* ================================================================\n   XI. ARTIST PAGES\n   ================================================================ */\n\n/* Artist header gradient */\n.main-entityHeader-background {\n  background: linear-gradient(\n    180deg,\n    rgba(var(--void-purple), 0.2) 0%,\n    var(--spice-main) 90%\n  ) !important;\n}\n\n/* Monthly listeners text */\n.main-entityHeader-headerText span[data-testid=\"monthly-listeners-label\"] {\n  color: var(--spice-subtext) !important;\n}\n\n/* Discography section headers */\n.main-shelf-title[as=\"h2\"] {\n  border-bottom: none !important;\n}\n\n\n/* ================================================================\n   XII. NOW PLAYING BAR (Bottom Player)\n   ================================================================ */\n\n.Root__now-playing-bar {\n  background: var(--spice-player) !important;\n  border-top: 1px solid var(--void-border-accent) !important;\n  backdrop-filter: blur(12px) !important;\n  -webkit-backdrop-filter: blur(12px) !important;\n}\n\n/* Warm glow strip along the top edge */\n.Root__now-playing-bar::before {\n  content: '';\n  position: absolute;\n  top: -1px;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background: var(--void-grad-accent-h);\n  opacity: 0.6;\n}\n\n/* Album art in player */\n.Root__now-playing-bar .main-image-image {\n  border-radius: var(--void-radius-sm) !important;\n  box-shadow: var(--void-shadow-sm) !important;\n  transition: border-radius var(--void-speed) var(--void-ease) !important;\n}\n\n.Root__now-playing-bar .main-image-image:hover {\n  border-radius: var(--void-radius-md) !important;\n}\n\n/* Now playing track name */\n.Root__now-playing-bar a[data-testid=\"context-item-link\"] {\n  color: var(--spice-text) !important;\n  font-weight: 500 !important;\n  transition: color var(--void-speed-fast) var(--void-ease) !important;\n}\n\n.Root__now-playing-bar a[data-testid=\"context-item-link\"]:hover {\n  color: rgb(var(--void-rose)) !important;\n}\n\n/* Now playing artist name */\n.Root__now-playing-bar a[data-testid=\"context-item-info-artist\"] {\n  color: var(--spice-subtext) !important;\n}\n\n.Root__now-playing-bar a[data-testid=\"context-item-info-artist\"]:hover {\n  color: rgb(var(--void-blush)) !important;\n}\n\n/* -- Progress bar track \u2014 cyan to purple gradient -- */\n.x-progressBar-sliderArea {\n  background: linear-gradient(90deg, #5ef5ff, #d946ef) !important;\n  border-radius: 3px !important;\n}\n\n/* Current progress fill \u2014 translucent white, always visible */\n.x-progressBar-fillColor {\n  background: rgba(255, 255, 255, 0.85) !important;\n  border-radius: 3px !important;\n  opacity: 1 !important;\n}\n\n/* Progress bar knob */\n.x-progressBar-sliderArea [role=\"slider\"] div,\n.playback-bar [role=\"slider\"] div {\n  background: #fff !important;\n  border: 2px solid rgb(var(--void-pink)) !important;\n  box-shadow: var(--void-glow-sm) !important;\n}\n\n/* -- Volume bar -- */\n.volume-bar [data-testid=\"progress-bar\"] > div:first-child > div {\n  background: var(--void-grad-accent-h) !important;\n}\n\n.volume-bar [data-testid=\"progress-bar\"] > div:first-child {\n  background: rgba(255, 255, 255, 0.06) !important;\n}\n\n/* Playback control buttons */\n.player-controls__buttons button {\n  color: var(--spice-subtext) !important;\n  transition: all var(--void-speed-fast) var(--void-ease) !important;\n}\n\n.player-controls__buttons button:hover {\n  color: var(--spice-text) !important;\n}\n\n/* Active shuffle / repeat */\n.player-controls__buttons button[aria-checked=\"true\"],\n.player-controls__buttons button.control-button--active {\n  color: rgb(var(--void-pink)) !important;\n}\n\n/* Main play/pause in player */\n.player-controls__buttons button[data-testid=\"control-button-playpause\"],\n.player-controls button[data-testid=\"control-button-playpause\"] {\n  background: rgb(var(--void-pink)) !important;\n  color: #fff !important;\n  border-radius: 50% !important;\n  transition: all var(--void-speed-fast) var(--void-ease-bounce) !important;\n}\n\n.player-controls__buttons button[data-testid=\"control-button-playpause\"]:hover,\n.player-controls button[data-testid=\"control-button-playpause\"]:hover {\n  background: rgb(var(--void-rose)) !important;\n  transform: scale(1.06) !important;\n  box-shadow: var(--void-glow-md) !important;\n}\n\n/* Extra player buttons (queue, devices, lyrics, etc.) */\n.main-nowPlayingBar-extraControls button,\n.player-controls__right button {\n  color: var(--spice-subtext) !important;\n  transition: color var(--void-speed-fast) var(--void-ease) !important;\n}\n\n.main-nowPlayingBar-extraControls button:hover,\n.player-controls__right button:hover {\n  color: var(--spice-text) !important;\n}\n\n.main-nowPlayingBar-extraControls button[aria-checked=\"true\"],\n.player-controls__right button[aria-checked=\"true\"] {\n  color: rgb(var(--void-pink)) !important;\n}\n\n/* Time stamps */\n.playback-bar__progress-time-elapsed,\n.playback-bar__progress-time,\n.playback-bar [class*=\"progress-bar\"] + div {\n  color: var(--spice-subtext) !important;\n  font-size: 11px !important;\n  font-variant-numeric: tabular-nums !important;\n}\n\n\n/* ================================================================\n   XIII. NOW PLAYING VIEW (Right Panel)\n   ================================================================ */\n\n.Root__right-sidebar {\n  background: var(--spice-sidebar) !important;\n  border-left: 1px solid var(--void-border-faint) !important;\n}\n\n/* Now playing view cover art */\n.main-nowPlayingView-coverArt img {\n  border-radius: var(--void-radius-lg) !important;\n  box-shadow: var(--void-shadow-lg) !important;\n}\n\n/* Queue in now playing view */\n.main-nowPlayingView-sectionHeaderText {\n  color: var(--spice-text) !important;\n  font-weight: 600 !important;\n}\n\n\n/* ================================================================\n   XIV. SEARCH\n   ================================================================ */\n\n/* Search input */\n.x-searchInput-searchInputInput,\ninput[data-testid=\"search-input\"],\n[role=\"search\"] input {\n  background: var(--void-surface-2) !important;\n  border: 1px solid var(--void-border-subtle) !important;\n  border-radius: var(--void-radius-pill) !important;\n  color: var(--spice-text) !important;\n  padding: 10px 16px 10px 40px !important;\n  transition: all var(--void-speed) var(--void-ease) !important;\n}\n\n.x-searchInput-searchInputInput:focus,\ninput[data-testid=\"search-input\"]:focus,\n[role=\"search\"] input:focus {\n  background: var(--void-surface-3) !important;\n  border-color: rgb(var(--void-pink)) !important;\n  box-shadow: 0 0 0 3px rgba(var(--void-pink), 0.12) !important;\n  outline: none !important;\n}\n\n/* Search input placeholder */\n.x-searchInput-searchInputInput::placeholder,\ninput[data-testid=\"search-input\"]::placeholder {\n  color: var(--spice-subtext) !important;\n  opacity: 0.6 !important;\n}\n\n/* Search results chips / filters */\n[role=\"search\"] ~ div button,\n.search-searchCategory-catergoryButton {\n  border-radius: var(--void-radius-pill) !important;\n}\n\n\n/* ================================================================\n   XV. QUEUE PANEL\n   ================================================================ */\n\n.main-queue-queue {\n  background: transparent !important;\n}\n\n.main-queue-queueItem {\n  border-radius: var(--void-radius-sm) !important;\n  transition: background var(--void-speed-fast) var(--void-ease) !important;\n}\n\n.main-queue-queueItem:hover {\n  background: var(--void-surface-hover) !important;\n}\n\n/* Queue section titles */\n.main-queue-header {\n  color: var(--spice-text) !important;\n  font-weight: 600 !important;\n}\n\n\n/* ================================================================\n   XVI. LYRICS\n   ================================================================ */\n\n.lyrics-lyrics-contentContainer {\n  background: transparent !important;\n}\n\n/* Inactive lyrics */\n.lyrics-lyricsContent-lyric {\n  color: rgba(var(--void-blush), 0.35) !important;\n  font-weight: 400 !important;\n  transition: color var(--void-speed-slow) var(--void-ease),\n              font-weight var(--void-speed-slow) var(--void-ease),\n              opacity var(--void-speed-slow) var(--void-ease) !important;\n}\n\n/* Active lyric */\n.lyrics-lyricsContent-lyric.lyrics-lyricsContent-active {\n  color: rgb(var(--void-blush)) !important;\n  font-weight: 600 !important;\n  text-shadow: 0 0 24px rgba(var(--void-pink), 0.3) !important;\n}\n\n/* Lyric hover */\n.lyrics-lyricsContent-lyric:hover {\n  color: rgba(var(--void-blush), 0.6) !important;\n}\n\n/* Lyrics background gradient */\n.lyrics-lyrics-background {\n  opacity: 0.15 !important;\n}\n\n\n/* ================================================================\n   XVII. CONTEXT MENUS / DROPDOWNS\n   ================================================================ */\n\n.main-contextMenu-menu,\n[data-depth] > ul,\n[role=\"menu\"] {\n  background: rgba(22, 18, 34, 0.92) !important;\n  backdrop-filter: blur(24px) saturate(1.3) !important;\n  -webkit-backdrop-filter: blur(24px) saturate(1.3) !important;\n  border: 1px solid var(--void-border-subtle) !important;\n  border-radius: var(--void-radius-md) !important;\n  box-shadow: var(--void-shadow-xl) !important;\n  padding: 4px !important;\n  overflow-y: visible !important;\n}\n\n/* Menu items */\n.main-contextMenu-menuItemButton,\n[role=\"menuitem\"] {\n  border-radius: var(--void-radius-sm) !important;\n  padding: 8px 12px !important;\n  transition: background var(--void-speed-fast) var(--void-ease) !important;\n}\n\n.main-contextMenu-menuItemButton:hover,\n[role=\"menuitem\"]:hover,\n[role=\"menuitem\"]:focus {\n  background: var(--void-surface-hover) !important;\n}\n\n/* Menu dividers */\n.main-contextMenu-divider,\n[role=\"separator\"] {\n  background: var(--void-border-faint) !important;\n  margin: 4px 8px !important;\n}\n\n\n/* ================================================================\n   XVIII. MODALS & DIALOGS\n   ================================================================ */\n\n[role=\"dialog\"],\n.GenericModal,\n.main-trackCreditsModal-container {\n  background: rgba(22, 18, 34, 0.95) !important;\n  backdrop-filter: blur(30px) !important;\n  -webkit-backdrop-filter: blur(30px) !important;\n  border: 1px solid var(--void-border-subtle) !important;\n  border-radius: var(--void-radius-lg) !important;\n  box-shadow: var(--void-shadow-xl) !important;\n}\n\n/* Modal backdrop */\n[data-overlayscrollbars-viewport] ~ div[style*=\"opacity\"],\n.GenericModal__overlay {\n  background: rgba(8, 6, 14, 0.7) !important;\n  backdrop-filter: blur(4px) !important;\n}\n\n/* Create playlist modal */\n.main-editPlaylistModal-content {\n  background: rgba(22, 18, 34, 0.98) !important;\n  border-radius: var(--void-radius-lg) !important;\n}\n\n\n/* ================================================================\n   XIX. SCROLLBARS\n   ================================================================ */\n\n::-webkit-scrollbar {\n  width: 6px !important;\n  height: 6px !important;\n}\n\n::-webkit-scrollbar-track {\n  background: transparent !important;\n}\n\n::-webkit-scrollbar-thumb {\n  background: rgba(var(--void-pink), 0.15) !important;\n  border-radius: 3px !important;\n  transition: background 0.2s !important;\n}\n\n::-webkit-scrollbar-thumb:hover {\n  background: rgba(var(--void-pink), 0.3) !important;\n}\n\n::-webkit-scrollbar-corner {\n  background: transparent !important;\n}\n\n\n/* ================================================================\n   XX. BUTTONS\n   ================================================================ */\n\n/* Primary buttons */\nbutton[data-encore-id=\"buttonPrimary\"],\nbutton.main-buttons-button.main-button-primary {\n  background: rgb(var(--void-pink)) !important;\n  color: #fff !important;\n  border: none !important;\n  border-radius: var(--void-radius-pill) !important;\n  font-weight: 600 !important;\n  letter-spacing: 0.02em !important;\n  box-shadow: var(--void-shadow-sm) !important;\n  transition: all var(--void-speed-fast) var(--void-ease) !important;\n}\n\nbutton[data-encore-id=\"buttonPrimary\"]:hover,\nbutton.main-buttons-button.main-button-primary:hover {\n  background: rgb(var(--void-rose)) !important;\n  box-shadow: var(--void-glow-md) !important;\n  transform: translateY(-1px) !important;\n}\n\nbutton[data-encore-id=\"buttonPrimary\"]:active,\nbutton.main-buttons-button.main-button-primary:active {\n  transform: translateY(0) scale(0.98) !important;\n}\n\n/* Secondary / outline buttons */\nbutton[data-encore-id=\"buttonSecondary\"],\nbutton.main-buttons-button.main-button-secondary {\n  background: transparent !important;\n  border: 1px solid var(--void-border-subtle) !important;\n  border-radius: var(--void-radius-pill) !important;\n  color: var(--spice-text) !important;\n  font-weight: 500 !important;\n  transition: all var(--void-speed-fast) var(--void-ease) !important;\n}\n\nbutton[data-encore-id=\"buttonSecondary\"]:hover,\nbutton.main-buttons-button.main-button-secondary:hover {\n  border-color: rgb(var(--void-pink)) !important;\n  color: rgb(var(--void-rose)) !important;\n  background: rgba(var(--void-pink), 0.06) !important;\n}\n\n/* Tertiary / text buttons */\nbutton[data-encore-id=\"buttonTertiary\"] {\n  color: var(--spice-subtext) !important;\n  transition: color var(--void-speed-fast) var(--void-ease) !important;\n}\n\nbutton[data-encore-id=\"buttonTertiary\"]:hover {\n  color: var(--spice-text) !important;\n}\n\n/* Icon buttons (small circular) */\nbutton[data-encore-id=\"buttonIcon\"] {\n  color: var(--spice-subtext) !important;\n  transition: all var(--void-speed-fast) var(--void-ease) !important;\n}\n\nbutton[data-encore-id=\"buttonIcon\"]:hover {\n  color: var(--spice-text) !important;\n  background: var(--void-surface-hover) !important;\n}\n\n\n/* ================================================================\n   XXI. HEART / SAVE BUTTON\n   ================================================================ */\n\nbutton[data-testid=\"add-button\"] svg,\nbutton[aria-label*=\"Save\"] svg,\nbutton[aria-label*=\"save\"] svg {\n  transition: all var(--void-speed-fast) var(--void-ease-bounce) !important;\n}\n\nbutton[data-testid=\"add-button\"][aria-checked=\"true\"] svg,\nbutton[aria-label*=\"Remove from Your Library\"] svg {\n  color: rgb(var(--void-pink)) !important;\n}\n\nbutton[data-testid=\"add-button\"]:hover svg,\nbutton[aria-label*=\"Save\"]:hover svg,\nbutton[aria-label*=\"save\"]:hover svg {\n  transform: scale(1.15) !important;\n}\n\n\n/* ================================================================\n   XXII. TOOLTIPS\n   ================================================================ */\n\n[data-tippy-root] .tippy-content,\n[role=\"tooltip\"] {\n  background: rgba(22, 18, 34, 0.95) !important;\n  border: 1px solid var(--void-border-subtle) !important;\n  border-radius: var(--void-radius-sm) !important;\n  box-shadow: var(--void-shadow-md) !important;\n  color: var(--spice-text) !important;\n  font-size: 12px !important;\n  font-weight: 500 !important;\n}\n\n[data-tippy-root] .tippy-arrow::before {\n  color: rgba(22, 18, 34, 0.95) !important;\n}\n\n\n/* ================================================================\n   XXIII. NOTIFICATIONS / TOASTS\n   ================================================================ */\n\n.main-notification-notification {\n  background: rgba(22, 18, 34, 0.95) !important;\n  backdrop-filter: blur(16px) !important;\n  -webkit-backdrop-filter: blur(16px) !important;\n  border: 1px solid var(--void-border-accent) !important;\n  border-radius: var(--void-radius-md) !important;\n  box-shadow: var(--void-glow-lg) !important;\n  color: var(--spice-text) !important;\n}\n\n\n/* ================================================================\n   XXIV. FRIEND ACTIVITY (Right Sidebar)\n   ================================================================ */\n\n.main-buddyFeed-activityFeedContainer {\n  background: var(--spice-sidebar) !important;\n  border-left: 1px solid var(--void-border-faint) !important;\n}\n\n.main-buddyFeed-buddyFeedItem:hover {\n  background: var(--void-surface-hover) !important;\n}\n\n\n/* ================================================================\n   XXV. ALBUM ART\n   ================================================================ */\n\n/* Global rounded corners on all images */\n.main-image-image {\n  border-radius: var(--void-radius-sm) !important;\n}\n\n/* Artist circular images stay circular */\n[data-testid=\"cardImage\"] .main-image-image[style*=\"border-radius: 50%\"] {\n  border-radius: 50% !important;\n}\n\n/* Full-screen now playing art */\n.main-nowPlayingView-coverArt .main-image-image {\n  border-radius: var(--void-radius-lg) !important;\n}\n\n\n/* ================================================================\n   XXVI. CHIPS, BADGES, TAGS\n   ================================================================ */\n\n/* Filter chips (Home page: All, Music, Podcasts) */\n.main-chip-chip,\n[class*=\"chipInner\"] {\n  background: var(--void-surface-2) !important;\n  border: 1px solid var(--void-border-faint) !important;\n  border-radius: var(--void-radius-pill) !important;\n  color: var(--spice-subtext) !important;\n  font-weight: 500 !important;\n  transition: all var(--void-speed-fast) var(--void-ease) !important;\n}\n\n.main-chip-chip:hover,\n[class*=\"chipInner\"]:hover {\n  background: var(--void-surface-3) !important;\n  border-color: var(--void-border-subtle) !important;\n  color: var(--spice-text) !important;\n}\n\n.main-chip-chip.main-chip-selected,\n.main-chip-chip[aria-checked=\"true\"] {\n  background: rgba(var(--void-pink), 0.18) !important;\n  border-color: var(--void-border-accent) !important;\n  color: rgb(var(--void-rose)) !important;\n}\n\n\n/* ================================================================\n   XXVII. INPUT FIELDS & FORMS\n   ================================================================ */\n\ninput[type=\"text\"],\ninput[type=\"search\"],\ntextarea {\n  background: var(--void-surface-2) !important;\n  border: 1px solid var(--void-border-subtle) !important;\n  border-radius: var(--void-radius-sm) !important;\n  color: var(--spice-text) !important;\n  transition: all var(--void-speed) var(--void-ease) !important;\n}\n\ninput[type=\"text\"]:focus,\ninput[type=\"search\"]:focus,\ntextarea:focus {\n  border-color: rgb(var(--void-pink)) !important;\n  box-shadow: 0 0 0 3px rgba(var(--void-pink), 0.1) !important;\n  outline: none !important;\n}\n\n\n/* ================================================================\n   XXVIII. CONNECT BAR (Device picker)\n   ================================================================ */\n\n.main-connectBar-connectBar {\n  background: linear-gradient(\n    90deg,\n    rgb(var(--void-pink)),\n    rgb(var(--void-purple))\n  ) !important;\n  border-radius: 0 !important;\n  color: #fff !important;\n}\n\n\n/* ================================================================\n   XXIX. PODCAST / EPISODE SPECIFICS\n   ================================================================ */\n\n/* Episode progress bar */\n.main-episodeProgress-progressBarContainer .progress-bar__fg {\n  background: var(--void-grad-accent-h) !important;\n}\n\n/* Episode description links */\n.main-episodeCard-episodeDescription a {\n  color: rgb(var(--void-rose)) !important;\n}\n\n.main-episodeCard-episodeDescription a:hover {\n  text-decoration: underline !important;\n}\n\n\n/* ================================================================\n   XXX. ENCORE DESIGN SYSTEM OVERRIDES\n   ================================================================\n   Spotify uses \"Encore\" internally \u2014 override its palette tokens\n   to prevent any default green from leaking through.\n   ================================================================ */\n\n.encore-bright-accent-set,\n.encore-dark-theme,\n.encore-base-set,\n[data-encore-theme] {\n  --background-base: var(--spice-main) !important;\n  --background-highlight: var(--spice-card) !important;\n  --background-press: var(--spice-selected-row) !important;\n  --background-elevated-base: var(--spice-card) !important;\n  --background-elevated-highlight: var(--spice-selected-row) !important;\n  --background-tinted-base: var(--void-surface-2) !important;\n  --background-tinted-highlight: var(--void-surface-3) !important;\n  --text-base: var(--spice-text) !important;\n  --text-subdued: var(--spice-subtext) !important;\n  --text-bright-accent: rgb(var(--void-rose)) !important;\n  --essential-base: var(--spice-text) !important;\n  --essential-subdued: var(--spice-subtext) !important;\n  --essential-bright-accent: rgb(var(--void-pink)) !important;\n  --essential-positive: rgb(var(--void-pink)) !important;\n  --essential-negative: var(--spice-notification-error) !important;\n  --decorative-base: var(--spice-text) !important;\n  --decorative-subdued: var(--spice-subtext) !important;\n}\n\n/* Override the green accent specifically */\n.encore-bright-accent-set {\n  --background-base: rgb(var(--void-pink)) !important;\n  --background-highlight: rgb(var(--void-rose)) !important;\n  --text-base: #fff !important;\n  --essential-base: #fff !important;\n  color: #fff !important;\n}\n\n/* Home shortcuts grid \u2014 play button icon always visible */\n.view-homeShortcutsGrid-PlayButtonContainer,\n.view-homeShortcutsGrid-PlayButtonContainer *,\n.view-homeShortcutsGrid-playButton,\n.view-homeShortcutsGrid-playButton * {\n  opacity: 1 !important;\n  visibility: visible !important;\n}\n\n\n/* ================================================================\n   XXXI. SMOOTH GLOBAL TRANSITIONS\n   ================================================================ */\n\na, button, input, textarea,\n[role=\"button\"],\n[role=\"link\"],\n[role=\"tab\"],\n[role=\"menuitem\"] {\n  transition: color var(--void-speed-fast) var(--void-ease),\n              background-color var(--void-speed-fast) var(--void-ease),\n              border-color var(--void-speed-fast) var(--void-ease),\n              box-shadow var(--void-speed-fast) var(--void-ease),\n              transform var(--void-speed-fast) var(--void-ease),\n              opacity var(--void-speed-fast) var(--void-ease) !important;\n}\n\n/* Disable transitions on page load to prevent flash */\nbody.loading * {\n  transition: none !important;\n}\n\n\n/* ================================================================\n   XXXII. FOCUS STATES (Accessibility)\n   ================================================================ */\n\n*:focus-visible {\n  outline: 2px solid rgba(var(--void-pink), 0.5) !important;\n  outline-offset: 2px !important;\n  border-radius: var(--void-radius-sm) !important;\n}\n\n\n/* ================================================================\n   XXXIII. SELECTION COLOR\n   ================================================================ */\n\n::selection {\n  background: rgba(var(--void-pink), 0.3) !important;\n  color: #fff !important;\n}\n\n\n/* ================================================================\n   XXXIV. SETTINGS CREDIT\n   ================================================================ */\n\n.x-settings-header::after {\n  content: 'theme made with love by nullie & claude \\1F49C  #transrights' !important;\n  display: block !important;\n  margin-top: 6px !important;\n  font-size: 11px !important;\n  font-weight: 400 !important;\n  color: var(--spice-subtext) !important;\n  opacity: 0.5 !important;\n  letter-spacing: 0.02em !important;\n}\n\n\n/* ================================================================\n   FIN.\n   ================================================================ */\n\n/* ===== NPV Ambience by OhItsTom ===== */\n \n\t\t.main-nowPlayingView-coverArtContainer::before,\n\t\t.main-nowPlayingView-coverArtContainer::after {\n\t\t\tcontent: \"\";\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tright: 0;\n\t\t\tbottom: 0;\n\t\t\tpointer-events: none;\n\t\t\tbackground: var(--npv-ambience-img);\n\t\t\tz-index: -1;\n\t\t\tfilter: blur(40px) saturate(2);\n\t\t\tbackground-position: center;\n\t\t\tbackground-size: cover;\n\t\t\ttransition: height 0.6s cubic-bezier(0, 0, 0, 1), background 0.5s ease, opacity 0.5s ease;\n\t\t\tbackground-repeat: no-repeat;\n\t\t\topacity: var(--npv-ambience-opacity, 0);\n\t\t\theight: var(--npv-ambience-width);\n\t\t\tmargin-top: 48px;\n\t\t}\n\n\t\t.main-nowPlayingView-coverArtContainer::after {\n\t\t\tfilter: blur(40px) contrast(2);\n\t\t}\n\n\t\t\n\t\t.Root__right-sidebar {\n\t\t\t--background-base: var(--spice-main) !important;\n\t\t}\n\t\t.main-nowPlayingView-coverArtContainer {\n\t\t\tposition: relative;\n\t\t\tisolation: isolate;\n\t\t}\n\n/* ===== Snippet: Jumping ZeroTwo ===== */\n.player-controls .playback-progressbar::before { content: ''; width: 32px; height: 32px; bottom: calc(100% - 4px); left: 10px; position: absolute; image-rendering: pixelated; background-size: 32px 32px; background-image: url('https://media.tenor.com/vuMDJNZY76sAAAAi/jumping-blushing.gif'); }\n\n/* web-player fixes */\n/* Round play buttons: the web player draws the pink circle on an inner span that\n   fades in on hover, so paint the span instead of the button (the theme's\n   bright-accent override already turns that span pink). */\nbutton[data-encore-id=\"buttonPrimary\"][data-is-icon-only=\"true\"]:not([data-testid=\"control-button-playpause\"]) { background: transparent !important; box-shadow: none !important; }\nbutton[data-encore-id=\"buttonPrimary\"][data-is-icon-only=\"true\"]:not([data-testid=\"control-button-playpause\"]):hover > span { box-shadow: var(--void-glow-md) !important; }\n.player-controls button[data-testid=\"control-button-playpause\"] > span { background: rgb(var(--void-pink)) !important; color: #fff !important; }\n.player-controls button[data-testid=\"control-button-playpause\"]:hover > span { background: rgb(var(--void-rose)) !important; }\n.player-controls .playback-progressbar { position: relative; overflow: visible !important; }\n";
  const FONTS = ["https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"];

  if (window.top !== window) return; // main page only, not iframes

  function injectStyles() {
    const parent = document.head || document.documentElement;
    if (!parent || document.getElementById('spicetify-web-css')) return;
    const style = document.createElement('style');
    style.id = 'spicetify-web-css';
    style.textContent = CSS;
    parent.appendChild(style);
    // the theme's Outfit font (loaded separately so a slow font server can't block the theme)
    for (const href of FONTS) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      parent.appendChild(link);
    }
  }
  injectStyles();

  /* ------------------------------------------------------------------
   * 2. CLASS ALIASES
   * The theme and extensions were written for desktop Spotify, where
   * Spicetify renames Spotify's scrambled class names to readable ones
   * (e.g. "main-card-card"). The web player has no such names, so we
   * find the same elements by stable attributes and add the names.
   * ------------------------------------------------------------------ */
  const ALIASES = [
    ['[data-testid="now-playing-bar"]', 'Root__now-playing-bar'],
    ['[data-testid="player-controls"]', 'player-controls'],
    ['[data-testid="general-controls"]', 'player-controls__buttons'],
    ['[data-testid="playback-progressbar"]', 'playback-progressbar'],
    ['[data-testid="playback-position"]', 'playback-bar__progress-time-elapsed'],
    ['[data-testid="playback-duration"]', 'playback-bar__progress-time'],
    ['[data-testid="volume-bar"]', 'volume-bar'],
    ['#global-nav-bar', 'main-topBar-container'],
    ['#Desktop_LeftSidebar_Id', 'Root__nav-bar'],
    ['.main-view-container', 'Root__main-view'],
    ['#Desktop_PanelContainer_Id', 'Root__right-sidebar'],
    ['[data-encore-id="card"]', 'main-card-card'],
    ['[data-testid="card-image"], [data-testid="cover-art-image"], [data-testid="entity-image"], [data-testid="shortcut-image"]', 'main-image-image'],
    ['[data-testid="component-shelf"]', 'main-shelf-shelf'],
    ['[data-testid="component-shelf"] h2', 'main-shelf-title'],
    ['[data-testid="see-all-link"]', 'main-shelf-seeAll'],
    ['[data-testid="tracklist-row"]', 'main-trackList-trackListRow'],
    ['[data-testid="lyrics-line"]', 'lyrics-lyricsContent-lyric'],
    ['[data-testid="context-menu"]', 'main-contextMenu-menu'],
    ['[data-testid="entity-header"]', 'main-entityHeader-headerText'],
    ['[data-testid="entityTitle"]', 'main-entityHeader-title'],
    ['[data-testid="playlist-image"]', 'main-entityHeader-image'],
    ['[data-testid="action-bar"]', 'main-actionBar-ActionBar'],
    ['[data-testid="track-list"] [role="row"][aria-rowindex="1"]', 'main-trackList-trackListHeaderRow'],
    ['[data-testid="tracklist-row"] > [aria-colindex="1"]', 'main-trackList-rowSectionIndex'],
    ['[data-testid="tracklist-row"] > [role="gridcell"]:last-child', 'main-trackList-rowSectionEnd'],
    ['[data-testid="internal-track-link"]', 'main-trackList-trackListRowName'],
  ];

  function applyAliases() {
    for (const [sel, cls] of ALIASES) {
      for (const el of document.querySelectorAll(sel)) {
        if (!el.classList.contains(cls)) el.classList.add(cls);
      }
    }
    // Wrapper that holds the progress bar + times
    const pb = document.querySelector('[data-testid="playback-progressbar"]');
    if (pb && pb.parentElement) pb.parentElement.classList.add('playback-bar');
    // Progress bar internals: [background > (tooltip), (slider area > fill), (hover), handle]
    for (const bg of document.querySelectorAll('.playback-progressbar [data-testid="progress-bar-background"]')) {
      const area = bg.children[1];
      if (area) {
        area.classList.add('x-progressBar-sliderArea');
        if (area.firstElementChild) area.firstElementChild.classList.add('x-progressBar-fillColor');
      }
    }
    // Extra controls (lyrics / queue / volume) on the right of the player bar
    const lyr = document.querySelector('[data-testid="now-playing-bar"] [data-testid="lyrics-button"]');
    if (lyr && lyr.parentElement) lyr.parentElement.classList.add('main-nowPlayingBar-extraControls');
    // Now Playing View cover art: the first big square box in the right panel
    const panel = document.getElementById('Desktop_PanelContainer_Id');
    const npvRoot = panel && panel.querySelector('[data-npv-root]');
    if (npvRoot && !npvRoot.querySelector('.main-nowPlayingView-coverArtContainer')) {
      for (const el of npvRoot.querySelectorAll('div')) {
        const w = el.offsetWidth, h = el.offsetHeight;
        if (w > 150 && Math.abs(w - h) < 4) {
          el.classList.add('main-nowPlayingView-coverArtContainer', 'main-nowPlayingView-coverArt');
          break;
        }
      }
    }
  }

  let aliasQueued = false;
  function queueAliases() {
    if (aliasQueued) return;
    aliasQueued = true;
    requestAnimationFrame(() => { aliasQueued = false; try { applyAliases(); } catch (e) { console.warn('[spicetify-web]', e); } });
  }

  /* ------------------------------------------------------------------
   * 3. MINI "Spicetify" API
   * Just enough of Spicetify.Player for the extensions below, built
   * from what the web player shows on screen.
   * ------------------------------------------------------------------ */
  const listeners = { songchange: [] };
  const Player = {
    data: null,
    addEventListener(type, fn) { (listeners[type] = listeners[type] || []).push(fn); },
    next() {
      const b = document.querySelector('[data-testid="control-button-skip-forward"]');
      if (b && !b.disabled) b.click();
    },
  };

  function bigCover(src) {
    // i.scdn.co album art: swap the size code for the 640px version
    return src ? src.replace(/(ab67616d0000)[0-9a-f]{4}/, '$1b273') : '';
  }

  function isVideoPlaying() {
    for (const v of document.querySelectorAll('video')) {
      // Canvas loops are muted looping clips — those aren't "videos"
      if (!v.loop && v.offsetWidth > 0) return true;
    }
    return false;
  }

  function readNowPlaying() {
    const bar = document.querySelector('[data-testid="now-playing-bar"]');
    if (!bar) return null;
    const img = bar.querySelector('[data-testid="cover-art-image"]');
    const link = bar.querySelector('[data-testid="context-item-link"]');
    if (!img && !link) return null;
    const href = link ? link.getAttribute('href') || '' : '';
    return {
      item: {
        uri: href,
        metadata: {
          title: link ? link.textContent.trim() : '',
          image_xlarge_url: bigCover(img ? img.src : ''),
          'media.type': href.includes('/episode/') && isVideoPlaying() ? 'video' : 'audio',
          is_advertisement: bar.dataset.testadtype && bar.dataset.testadtype !== 'ad-type-none' ? 'true' : 'false',
        },
      },
    };
  }

  let lastKey = '';
  function pollPlayer() {
    const d = readNowPlaying();
    if (!d) return;
    Player.data = d;
    const key = d.item.uri + '|' + d.item.metadata.title + '|' + d.item.metadata.image_xlarge_url;
    if (key !== lastKey) {
      lastKey = key;
      for (const fn of listeners.songchange) { try { fn({ data: d }); } catch (e) { console.warn('[spicetify-web]', e); } }
    }
  }

  /* ------------------------------------------------------------------
   * 4. EXTENSIONS
   * ------------------------------------------------------------------ */

  // --- NPV Ambience (OhItsTom) -------------------------------------
  function npvAmbience() {
    const rightSidebar = document.querySelector('.Root__right-sidebar');
    if (!(Player.data && rightSidebar)) { setTimeout(npvAmbience, 250); return; }
    const root = document.documentElement.style;
    root.setProperty('--npv-ambience-width', rightSidebar.offsetWidth + 'px');
    root.setProperty('--npv-ambience-img', `url(${Player.data.item.metadata.image_xlarge_url})`);
    root.setProperty('--npv-ambience-opacity', rightSidebar.offsetWidth > 0 ? 1 : 0);
    new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        root.setProperty('--npv-ambience-opacity', width > 0 ? 1 : 0);
        if (width > 0) root.setProperty('--npv-ambience-width', `${width}px`);
      }
    }).observe(rightSidebar);
    Player.addEventListener('songchange', e => {
      const pre = new Image();
      pre.src = e.data.item.metadata.image_xlarge_url;
      pre.onload = () => root.setProperty('--npv-ambience-img', `url(${pre.src})`);
    });
  }

  // --- Auto Skip Videos (spicetify) --------------------------------
  function autoSkipVideo() {
    Player.addEventListener('songchange', () => {
      // give the page a moment to load the video player
      setTimeout(() => {
        const d = readNowPlaying();
        if (!d) return;
        const meta = d.item.metadata;
        if (meta['media.type'] === 'video' && meta.is_advertisement !== 'true') {
          console.log('[spicetify-web] Auto Skip Videos: skipping', meta.title);
          Player.next();
        }
      }, 1500);
    });
  }

  // --- Adblockify (ririxi) — web-compatible subset --------------------
  // The upstream desktop extension depends on Spicetify.Events, Platform,
  // CosmosAsync, webpack internals, and ad-manager APIs. Those are NOT part
  // of this web userscript's mini Player API. This port only hides known
  // ad/premium promotional UI and tries an exposed, enabled skip control
  // while an ad is explicitly identifiable. It does NOT spoof Premium,
  // prevent Spotify from streaming audio ads, or unlock paid features.
  const ADBLOCKIFY_WEB_CSS = `
    /* Stable ad placements from ririxi's Adblockify; not hashed classes. */
    .main-leaderboardComponent-container,
    .sponsor-container,
    #leaderboard-ad-element,
    #view-billboard-ad,
    [data-testid="billboard-minimized"],
    [data-testid="billboard-image-link"],
    [data-testid="hpto-parent-container"],
    [data-testid="hpto-native"],
    [data-testid="hpto-image"],
    [data-testid="html-hpto-container"],
    [data-testid="html-hpto-iframe"],
    [data-testid="hpto-native-buttons"],
    [data-testid="home-ad-card"],
    [data-testid="home-ads-container"],
    [data-testid^="home-ad-"],
    [data-testid="signup-bar"],
    .main-topBar-UpgradeButton,
    .main-contextMenu-menuItem a[href^="https://www.spotify.com/premium/"] {
      display: none !important;
    }
  `;

  function ensureAdblockifyStyles() {
    const parent = document.head || document.documentElement;
    if (!parent || document.getElementById('spicetify-web-adblockify-css')) return;
    const style = document.createElement('style');
    style.id = 'spicetify-web-adblockify-css';
    style.textContent = ADBLOCKIFY_WEB_CSS;
    parent.appendChild(style);
  }

  function adblockifyWeb() {
    let lastSkipAttempt = 0;
    let adDetectedAt = 0;
    let skipAttempts = 0;
    let skipClicks = 0;
    ensureAdblockifyStyles();

    function isAdPlaying() {
      const bar = document.querySelector('[data-testid="now-playing-bar"]');
      if (!bar) return false;
      const adType = bar.getAttribute('data-testadtype');
      if (adType && adType !== 'ad-type-none') return true;
      if (bar.querySelector('[data-testid="ad-label"], [data-testid="now-playing-ad"], [aria-label="Advertisement"], [aria-label="Ad playing"]')) return true;
      // Do not infer ads from text such as a track titled "Advertisement".
      // A global ad indicator alone may be an ad card, not an audio ad.
      return Boolean(
        document.querySelector('[data-testid="ad-playing-indicator"]') &&
        document.querySelector('[data-testid="skip-ad-button"], [data-testid="ad-skip-button"]')
      );
    }

    function isEnabled(button) {
      return Boolean(button && !button.disabled && button.getAttribute('aria-disabled') !== 'true');
    }

    // Only perform real, enabled UI actions; never claim to bypass Spotify's
    // server-side ad scheduling, unskippable spots, or Premium entitlements.
    function check() {
      if (!isAdPlaying()) {
        lastSkipAttempt = 0;
        adDetectedAt = 0;
        return false;
      }
      const now = Date.now();
      // Require two consecutive observations to avoid skipping a normal
      // song during a brief DOM transition into or out of an ad.
      if (!adDetectedAt) { adDetectedAt = now; return false; }
      if (now - adDetectedAt < 750) return false;
      if (lastSkipAttempt && now - lastSkipAttempt < 5000) return false;
      const skipAd = document.querySelector(
        '[data-testid="skip-ad-button"], [data-testid="ad-skip-button"], button[aria-label="Skip ad" i], button[aria-label="Skip advertisement" i]'
      );
      const skipForward = document.querySelector('[data-testid="control-button-skip-forward"]');
      const button = isEnabled(skipAd) ? skipAd : (isEnabled(skipForward) ? skipForward : null);
      if (!button) return false;
      lastSkipAttempt = now;
      skipAttempts++;
      try {
        button.click();
        skipClicks++;
        console.info('[spicetify-web] Adblockify web: clicked an enabled skip control');
        return true;
      } catch (error) {
        console.warn('[spicetify-web] Adblockify web: skip control failed', error);
        return false;
      }
    }

    return {
      check,
      status: () => ({
        uiCleanup: Boolean(document.getElementById('spicetify-web-adblockify-css')),
        audioAdBlocking: false,
        premiumSpoof: false,
        skipAttempts,
        skipClicks
      })
    };
  }

  // Start UI cleanup as soon as the userscript runs (also at document-start).
  ensureAdblockifyStyles();

  /* ------------------------------------------------------------------
   * 5. START
   * ------------------------------------------------------------------ */
  function start() {
    injectStyles();
    applyAliases();
    new MutationObserver(queueAliases).observe(document.body, { childList: true, subtree: true });
    autoSkipVideo();           // register listeners before the first song is read
    const adblockify = adblockifyWeb();
    setInterval(() => { pollPlayer(); adblockify.check(); }, 500);
    pollPlayer();
    adblockify.check();
    npvAmbience();
    window.SpicetifyWeb = { Player, applyAliases, adblockify, version: VERSION };
    console.log('[spicetify-web] loaded v' + VERSION);
  }

  // Spotify can swap out <head>; re-add the stylesheet if it goes missing
  setInterval(() => { injectStyles(); ensureAdblockifyStyles(); }, 2000);
  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start);
})();
