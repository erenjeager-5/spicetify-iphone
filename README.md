# Spicetify iPhone

Spicetify-style theming and extensions for Spotify's web player in **Safari on iPhone**, packaged as one userscript.

Spicetify only works on the desktop Spotify app. This script brings a Spicetify setup to [open.spotify.com](https://open.spotify.com) using the free **Userscripts** Safari extension (App Store).

## What's included

| | |
|---|---|
| **Theme** | p1nk v01d: warm dark theme with pink-purple accents, a gradient progress bar, frosted-glass menus and the Outfit font |
| **NPV Ambience** | Colourful glow behind the cover art in the Now Playing panel |
| **Auto Skip Videos** | Skips video episodes (ads excluded) |
| **Jumping ZeroTwo** | Animated ZeroTwo on the progress bar |
| **Adblockify (web)** | Hides ad banners and upgrade prompts |

## Install on iPhone

1. Install **Userscripts** from the App Store.
2. Open it and tap **Set Userscripts Directory**. Pick or create a folder, for example `iCloud Drive/Userscripts`.
3. Go to **Settings → Apps → Safari → Extensions → Userscripts**, turn it on and allow it on `open.spotify.com`.
4. Download [`spicetify-iphone.user.js`](spicetify-iphone.user.js) and save it into that folder.
   - If it saves as `.txt`, rename it in Files so it ends in `.user.js`. Turn on **⋯ → View Options → Show All Extensions** first so you can see the ending.
5. In Safari, open **open.spotify.com**, tap **aA → Request Desktop Website**, and log in.
6. Tap **aA → Userscripts → ↻** and check that **Spicetify iPhone** is switched on, then reload.

## How it works

Spicetify themes and extensions target readable class names, like `main-card-card`, that Spicetify adds to the desktop app. The web player doesn't have these. The script:

1. Finds the same elements on the web player by stable attributes (`data-testid`, ids) and adds the desktop class names, so desktop theme CSS applies unchanged.
2. Provides a small `Spicetify.Player`-style API (`data`, `addEventListener('songchange')`, `next()`) from the page, so simple extensions can run with minimal changes.

## Adding another extension

1. Paste the extension inside a new function in the **EXTENSIONS** section and change `Spicetify.Player` to `Player`.
2. Call it in `start()` **before** `setInterval(pollPlayer, …)`.
3. If it targets desktop class names, add `['[data-testid="…"]', 'desktop-class-name']` to `ALIASES`.

Extensions that use other Spicetify APIs (`Platform`, `CosmosAsync`, `PopupModal`, `React`) need rewriting.

## Limitations

- iPhone Safari playback can be unreliable and stops when the phone is locked or Safari goes to the background. This is a Spotify / iOS limitation.
- Spotify updates to the web player can break individual selectors.
- Audio ads aren't blocked; only ad banners and upgrade UI are hidden.

## Credits

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
