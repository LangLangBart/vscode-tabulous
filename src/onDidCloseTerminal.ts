/**
 * @file Handler for terminal close events
 */

import type { Terminal } from 'vscode'

import common from './common'

export async function onDidCloseTerminal(closedTerminal: Terminal) {
  const closedTerminalID = await closedTerminal.processId

  if (closedTerminalID) {
    const term = common.terminals.get(closedTerminalID)

    if (!term) {
      return
    }

    common.terminalCount--
    let end = false
    const terminalIndex = [...common.terminals.values()].findIndex(t => t.terminalID === closedTerminalID)
    term.terminal.dispose()
    common.terminals.delete(closedTerminalID)

    if (terminalIndex === common.terminalCount) {
      end = true
    }

    let index = 0
    for (const { terminal } of common.terminals.values()) {
      terminal.setTerminalIndex(index, terminal.name)

      // Replicate the native VS Code showing of the next terminal when one is closed
      if (
        common.loaded &&
        index === (end ? terminalIndex - 1 : terminalIndex)
      ) {
        await terminal.show()
      }

      index++
    }
  }
}
