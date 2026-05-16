# Tabulous

Adds tabs for each terminal process to the status bar.

![Tabulous gif](images/tabs.png)

> Fork of
> [BenWildeman/vscode-tabulous](https://github.com/BenWildeman/vscode-tabulous)

| Keybind                           | Description                                                      |
| --------------------------------- | ---------------------------------------------------------------- |
| `tabulous.createTerminal`         | Create a terminal with an icon                                   |
| `tabulous.createNamedTerminal`    | Create a named terminal with an icon (shown in the dropdown)     |
| `tabulous.renameTerminal`         | Rename the active terminal; replaces the built-in rename command |
| `tabulous.reloadDefaultTerminals` | Close all terminals and reload from config (no VSCode restart)   |
| `tabulous.showTerminal1`          | Show the 1st terminal                                            |
| `tabulous.showTerminal2`          | Show the 2nd terminal                                            |
| `tabulous.showTerminal3`          | Show the 3rd terminal                                            |
| `tabulous.showTerminal4`          | Show the 4th terminal                                            |
| `tabulous.showTerminal5`          | Show the 5th terminal                                            |
| `tabulous.showTerminal6`          | Show the 6th terminal                                            |
| `tabulous.showTerminal7`          | Show the 7th terminal                                            |
| `tabulous.showTerminal8`          | Show the 8th terminal                                            |
| `tabulous.showTerminal9`          | Show the 9th terminal                                            |
| `tabulous.showTerminal10`         | Show the 10th terminal                                           |

| Setting                     | Description                                                                               | Default |
| --------------------------- | ----------------------------------------------------------------------------------------- | ------- |
| `tabulous.activeTabColor`   | Color of the active tab (must be a valid CSS color)                                       | —       |
| `tabulous.defaultTerminals` | Default terminals that open when VSCode starts. Best used inside .code-workspace settings | —       |

`tabulous.defaultTerminals` example:

```jsonc
{
  "folders": [
    {
      "path": "relative/to/workspace/file",
      "name": "Named Workspace"
    },
    {
      "path": "relative/to/workspace/file",
      "name": "Another Named Workspace"
    }
  ],
  "tabulous.defaultTerminals": [{
    "name": "App",
    // Could be absolute path
    "directory": "C:/absolute/path",
    "command": "npm start",
    "executeCommand": false
  }, {
    "name": "API",
    // Could be the name of the workspace folder specified within the .code-workspace
    "directory": "Workspace Folder Name",
    "command": "npm start"
  }, {
    "name": "Watcher",
    // Could be relative path. If multi-root workspace,
    // path will be relative to the .code-workspace directory, otherwise
    // it will be relative to the workspace directory
    "directory": "./relative/path",
    "command": "npm run watch",
    "executeCommand": false
  }]
}
```

---

## Contributing

Checkout the repo, ensure `bun` is on your `PATH`, install dependencies with
`bun install`, optionally build the package, commit your changes, and send a PR.

### Build

- [github.com/oven-sh/bun](https://github.com/oven-sh/bun)

```bash
bun install
bun run package
codium --install-extension tabulous-*.vsix
```

## Release Process

Automated with **googleapis/release-please-action**

1. Pushing to `main` triggers `.github/workflows/release.yml`
2. It opens or updates a release PR that bumps `package.json` and updates
   `CHANGELOG.md` using Conventional Commits, no need to manually edit them.
3. When merged, the workflow builds the package and uploads it to GitHub release

## Extension Evolution

1. [Tyriar/vscode-terminal-tabs](https://github.com/Tyriar/vscode-terminal-tabs)
2. [BenWildeman/vscode-terminal-tabs](https://github.com/BenWildeman/vscode-terminal-tabs)
3. [BenWildeman/vscode-tabulous](https://github.com/BenWildeman/vscode-tabulous)
4. Fork +v2 => [CHANGELOG](CHANGELOG.md)
