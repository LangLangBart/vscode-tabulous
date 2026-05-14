/**
 * @file Reload default terminals command
 */

import { commands, window, workspace } from 'vscode'

import type { DefaultTerminal } from '../types'

import common, { loadTerminals } from '../common'

export function reloadTerminals() {
  return commands.registerCommand('tabulous.reloadDefaultTerminals', () => {
    const config = workspace.getConfiguration('tabulous')
    const defaultTerminals = config.get<DefaultTerminal[]>('defaultTerminals')

    if (defaultTerminals?.length) {
      common.loaded = false
      for (const { terminal } of common.terminals.values()) {
        terminal.dispose()
      }

      common.terminalCount = 0
      common.terminals.clear()

      void load()
    }
    else {
      window.showWarningMessage('No default terminals specified in your settings, please add some then try again')
    }
  })
}

async function load() {
  if (common.terminals.size > 0) {
    if (!common.loaded) {
      setImmediate(() => {
        void load()
      })
    }
  }
  else {
    const config = workspace.getConfiguration('tabulous')
    const defaultTerminals = config.get<DefaultTerminal[]>('defaultTerminals')

    if (defaultTerminals) {
      await loadTerminals(defaultTerminals)
      await window.showInformationMessage('Default terminals reloaded')
    }

    common.loaded = true
  }
}
