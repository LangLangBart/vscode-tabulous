# Tabulous Change Log

## [2.0.2](https://github.com/LangLangBart/vscode-tabulous/compare/v2.0.1...v2.0.2) (2026-05-16)

### Bug Fixes

* terminal will not take focus ([fbf7a2e](https://github.com/LangLangBart/vscode-tabulous/commit/fbf7a2e73f06bd480fd54f86681ed059a9c687cb))

## [2.0.1](https://github.com/LangLangBart/vscode-tabulous/compare/v2.0.0...v2.0.1) (2026-05-16)

### Bug Fixes

* dependabot config for dependency updates ([9f2d3f1](https://github.com/LangLangBart/vscode-tabulous/commit/9f2d3f12c53bbca71ac0ee4469d41eef81476fbb))

## [2.0.0](https://github.com/LangLangBart/vscode-tabulous/compare/v1.1.1...v2.0.0) (2026-05-16)

### ⚠ BREAKING CHANGES

* remove touch bar support (macOS)

### Features

* fork repo; fix terminal tab bug; remove legacy configs ([f7d092d](https://github.com/LangLangBart/vscode-tabulous/commit/f7d092defef9773feb0977af67361eef71139e45))
* release workflow ([a7a2713](https://github.com/LangLangBart/vscode-tabulous/commit/a7a271372494fa1c25145dfa047b822c8f37430d))

### Bug Fixes

* remove touch bar support (macOS) ([59a24e5](https://github.com/LangLangBart/vscode-tabulous/commit/59a24e51e9b7a42e571cafc63d915a35d5aa123b))
* support markdownlint MD024 ([fddcbff](https://github.com/LangLangBart/vscode-tabulous/commit/fddcbffe8ef974d7771175ebc7c953c171cbf905))

## 1.2.0

* Added support for "Open terminal here". This defaults to setting the terminal title to the closest directory name
  * Can be open from Explorer context menu
  * Can be open Editor tab context menu
  * Can be open with keybind `Shift+Alt+T`. This opens a terminal from the last active file

## 1.1.1

* Fixed grep rename blunder that stopped Touch Bar support from working 🤦

## 1.1.0

* Added Rename Terminal command. Can be used as a replacement for the built-in rename terminal command (Updates the status bar icon without having to switch terminals)
* Added support for Touch Bar (macOS):
  * Create Named Terminal
  * Rename terminal
  * Reload default terminals

## 1.0.3

* Fixed edge-case where it's not possible to create terminal when through a new blank window
* Now waits for "default terminal reloaded" message before specifying as loaded
* Made sure terminal exists in the terminals list before trying to dispose it

## 1.0.2

* Fixed bug where it's not possible to create terminal without workspace, for real this time

## 1.0.1

* Fixed bug where it's not possible to create terminal without workspace

## 1.0.0

* Added multi-root workspace support
  * When creating a new terminal, you will be prompted to choose which workspace folder to open the terminal in
  * Now possible to use workspace folder name within the `directory` option of `defaultTerminals`
* Relative paths within `directory` option of `defaultTerminals` will now either resolve from the workspace folder, or the workspace file directory if it's a multi-root workspace
* Shows Change Log prompt when version is updated

## 0.5.0

* Add tooltips for tabs
* Create tabs on native terminal creation
* Track when active terminal changes natively

## 0.4.0

* Added executeCommand option for default terminals - Makes it possible to pretype the command when the default terminals are opened without actually executing them

## 0.3.1

* Added changelog

## 0.3.0

* Moved subscriptions into their own directory - cleans up extensions.ts
* Await the disposal of the lingering terminal on startup before doing anything.
* No longer caches config within `StatusBarTerminal` so that `tabulous.activeColor` can be updated without reload
* Added `tabulous.reloadDefaultTerminals` so that it's possible to dispose of the terminals then reloads the defaults. Good for when the defaults have been updated so that you no longer have to reload VS Code
* Prefixed commands with "Tabulous: " to better distinguish the commands from others

## 0.2.1

* Forked from [terminal-tabs](https://github.com/Tyriar/vscode-terminal-tabs)
* Added `tabulous.createNamedTerminal` - creates a named terminal
* Added `tabulous.activeTabColor` - sets the active tab colour
* Added `Tabulous.defaultTerminals` - sets the default terminals to open when VS Code starts. Best used inside \<workspace-name\>.code-workspace
