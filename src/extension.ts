/**
 * @file Tabulous extension entry point
 */

import type { ExtensionContext } from 'vscode'

import path from 'node:path'
import { commands, Uri, window, workspace } from 'vscode'

import type { DefaultTerminal } from './types'

import packageJSON from '../package.json' with { type: 'json' }
import common, { loadTerminals, MAX_TERMINALS } from './common'
import { createNamedTerminal } from './createNamedTerminal'
import { createTerminal } from './createTerminal'
import { onDidChangeActiveTerminal } from './onDidChangeActiveTerminal'
import { onDidCloseTerminal } from './onDidCloseTerminal'
import { onDidOpenTerminal } from './onDidOpenTerminal'
import { openTerminalHere } from './openTerminalHere'
import { reloadTerminals } from './reloadTerminals'
import { renameTerminal } from './renameTerminal'
import { StatusBarTerminal } from './statusBarTerminal'
import { toggleTerminal } from './toggleTerminal'

export async function activate(context: ExtensionContext) {
  try {
    checkForUpdatedVersion(context)
    const config = workspace.getConfiguration('tabulous')
    const defaultTerminals =
      config.get<DefaultTerminal[]>('defaultTerminals')

    context.subscriptions.push(
      openTerminalHere(),
      createNamedTerminal(),
      createTerminal(),
      renameTerminal(),
      reloadTerminals(),
      window.onDidCloseTerminal(onDidCloseTerminal)
    )

    if ('onDidOpenTerminal' in window) {
      context.subscriptions.push(window.onDidOpenTerminal(onDidOpenTerminal))
    }

    context.subscriptions.push(window.onDidChangeActiveTerminal(onDidChangeActiveTerminal))

    for (let index = 1; index <= MAX_TERMINALS; index++) {
      context.subscriptions.push(toggleTerminal(index))
    }

    await handleExistingTerminals()

    if (defaultTerminals?.length) {
      try {
        await loadTerminals(defaultTerminals)
      }
      catch {}
    }

    common.loaded = true
  }
  catch {
    // Can't do anything
  }
}

export function deactivate() {
  for (const { terminal } of common.terminals.values()) {
    terminal.dispose()
  }
}

function checkForUpdatedVersion(context: ExtensionContext) {
  const { version } = packageJSON
  const showChangelog = 'Show Change Log'
  const tabulousVersionKey = 'TabulousExtensionVersion'

  const storedVersion = context.globalState.get(tabulousVersionKey)

  if (
    (!storedVersion && version === '1.0.0') ||
    (storedVersion && version !== storedVersion)
  ) {
    window
      .showInformationMessage(
        `The Tabulous extension has been updated to version ${version} 🎉`,
        showChangelog
      )
      .then((choice) => {
        if (choice === showChangelog) {
          commands.executeCommand(
            'markdown.showPreview',
            Uri.file(path.resolve(import.meta.dirname, '../CHANGELOG.md'))
          )
        }
      })
  }

  context.globalState.update(tabulousVersionKey, version)
}

async function handleExistingTerminals() {
  const terminals = window.terminals
  for (const terminal of terminals) {
    const terminalID = await terminal.processId
    if (terminalID && !common.terminals.has(terminalID)) {
      const _terminal = new StatusBarTerminal({
        name: terminal.name,
        preserveFocus: true,
        show: true,
        terminal,
        terminalIndex: common.terminalCount++
      })
      common.terminals.set(terminalID, {
        terminal: _terminal,
        terminalID
      })
    }
  }
}
