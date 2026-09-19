/**
 * @file Handler for terminal close events
 */

import type { Terminal } from 'vscode'

import common from './common'

export async function onDidCloseTerminal(closedTerminal: Terminal): Promise<void> {
  const closedTerminalID = await closedTerminal.processId

  if (closedTerminalID) {
    const term = common.terminals.get(closedTerminalID)

    if (!term) {
      return
    }

    common.terminalCount--
    let isEnd = false
    const terminalIndex = common.terminals.values().toArray().findIndex(t => t.terminalID === closedTerminalID)
    term.terminal.dispose()
    common.terminals.delete(closedTerminalID)

    if (terminalIndex === common.terminalCount) {
      isEnd = true
    }

    let index = 0
    for (const { terminal } of common.terminals.values()) {
      terminal.setTerminalIndex(index, terminal.name)

      // Replicate the native VS Code showing of the next terminal when one is closed
      if (
        common.loaded &&
        index === (isEnd ? terminalIndex - 1 : terminalIndex)
      ) {
        await terminal.show()
      }

      index++
    }
  }
}
