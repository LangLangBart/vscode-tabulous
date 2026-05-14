/**
 * @file Common shared state and utilities
 */

import type { Common, DefaultTerminal } from './types'

import { StatusBarTerminal } from './statusBarTerminal'

export const MAX_TERMINALS = 10

const common: Common = {
  loaded: false,
  terminalCount: 0,
  terminals: new Map<
    number,
    { terminal: StatusBarTerminal, terminalID: number }
  >()
}

export async function loadTerminals(defaultTerminals: DefaultTerminal[]) {
  try {
    await Promise.all(defaultTerminals.map(async (terminal) => {
      const {
        command,
        directory: cwd,
        executeCommand = true,
        name
      } = terminal
      const _terminal = new StatusBarTerminal({
        cwd,
        name,
        show: false,
        terminalIndex: common.terminalCount++
      })

      const terminalID = await _terminal.processId

      if (terminalID) {
        common.terminals.set(terminalID, {
          terminal: _terminal,
          terminalID
        })

        if (command) {
          _terminal.sendCommand(command, executeCommand)
        }
      }
    }))
  }
  catch {}
}

export default common
