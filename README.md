# Twitch Player Extension
Twitch Player Extension is a browser extension for watching sub-only Twitch VODs. It uses [Twitch Player Web](https://github.com/TwitchVODPlayer/twitch-player-web). 


## Installation
Replace the variable `BASE_URL` in [extension.js](./src/extension.js) by your server url.

Build the extension:
```sh
pnpm build
```

Drag-n-drop the file `TwitchVODPlayer.crx` from the `dist` folder into your browser.

## Development
Replace the variable `BASE_URL` in [extension.js](./src/extension.js) by your server url.

Run the extension:
```sh
pnpm dev
```
Drag-n-drop the folder `build` into your browser.
