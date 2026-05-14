/**
 * @file Toggle terminal command registration
 */

import { commands } from 'vscode'

import common from '../common'

export function toggleTerminal(index: number) {
  return commands.registerCommand(`tabulous.showTerminal${index}`, async () => {
    const _terminal = [...common.terminals.values()][index - 1].terminal
    const terminalID = await _terminal.processId

    for (const [id, { terminal }] of common.terminals.entries()) {
      // Toggle or mark terminal as hidden
      id === terminalID ? terminal.toggleTerminal() : terminal.hide()
    }
  })
}
