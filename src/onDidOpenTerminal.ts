/**
 * @file Handler for when a new terminal is opened
 */

import type { Terminal } from 'vscode'

import common from './common'
import { StatusBarTerminal } from './statusBarTerminal'

export async function onDidOpenTerminal(openedTerminal: Terminal): Promise<void> {
  const terminalID = await openedTerminal.processId
  const terminalExists = !!terminalID && common.terminals.has(terminalID)

  if (terminalID && !terminalExists) {
    for (const { terminal } of common.terminals.values()) {
      await terminal.processId
      terminal.hide()
    }

    const _terminal = new StatusBarTerminal({
      name: openedTerminal.name,
      preserveFocus: true,
      show: true,
      terminal: openedTerminal,
      terminalIndex: common.terminalCount++
    })

    setTimeout(() => {
      if (openedTerminal.name) {
        _terminal.setTerimalTitle(openedTerminal.name)
      }
    }, 100)

    common.terminals.set(terminalID, { terminal: _terminal, terminalID })
  }
}
