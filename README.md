# GIEx2
An experimental injection method using `NODE_OPTIONS` via an Electron security bypass.

## Method
GIEx2 is injected via `NODE_OPTIONS`. This is usually disabled in packaged production Electron apps, but we found a bypass. The way Electron checks if the app is packaged is by checking the binary name.
![Electron Source](https://media.discordapp.net/attachments/789862118240682014/860092007702593536/unknown.png)

If you hardlink, rename, copy, etc. the binary to `electron` NODE_OPTIONS is no longer disabled.

Injecting using `NODE_OPTIONS` has it's own challenges; mostly how you cannot access Electron simply via `require` as it injects too early. Our injection script gets around this by using `require.cache`.

## Usage
Setup (once / possibly per host update) steps:
1. Open a terminal session
2. `cd` to your Discord install directory
3. Make a hardlink called `electron` to the Discord binary (eg: `ln DiscordCanary electron`), you will need root for this step
4. Clone GIEx2 to somewhere accessible

Run command in terminal (roughly, replace with own paths):
```bash
NODE_OPTIONS="-r <GIEx2_clone_dir>/inject.js" <discord_install_dir>/electron
```