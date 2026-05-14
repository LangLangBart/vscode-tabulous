/**
 * @file Rename terminal command registration
 */

import { commands, window } from 'vscode'

import common from '../common'

export function renameTerminal() {
  return commands.registerCommand('tabulous.renameTerminal', async () => {
    const { activeTerminal } = common
    try {
      if (!activeTerminal) {
        return await window.showWarningMessage('Can only rename an active terminal')
      }

      const name = await window.showInputBox()

      if (!name) {
        return await window.showWarningMessage('Must provide a name to rename the active terminal')
      }

      await commands.executeCommand(
        'workbench.action.terminal.renameWithArg',
        { name }
      )

      for (const { terminal, terminalID } of common.terminals.values()) {
        if (terminalID === activeTerminal) {
          terminal.setTerimalTitle(name)
        }
      }
    }
    catch {}
  })
}
