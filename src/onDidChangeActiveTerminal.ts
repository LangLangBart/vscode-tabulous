/**
 * @file Handle active terminal change events
 */

import type { Terminal } from 'vscode'

import common from './common'

export async function onDidChangeActiveTerminal(activeTerminal?: Terminal): Promise<void> {
  if (!activeTerminal) {
    return
  }

  const terminalID = await activeTerminal.processId

  for (const [id, { terminal }] of common.terminals) {
    await (id === terminalID ? terminal.show() : terminal.hide())
  }
}
