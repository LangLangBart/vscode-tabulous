/**
 * @file Create Named Terminal command registration
 */

import type { Disposable } from 'vscode'

import { commands, window, workspace } from 'vscode'

import common, { MAX_TERMINALS } from './common'
import { StatusBarTerminal } from './statusBarTerminal'

export function createNamedTerminal(): Disposable {
  return commands.registerCommand(
    'tabulous.createNamedTerminal',
    async () => {
      if (common.terminals.size >= MAX_TERMINALS) {
        window.showInformationMessage(`This extension does not support more than ${MAX_TERMINALS} terminals.`)
        return
      }

      try {
        let cwd: string | undefined

        if (
          workspace.workspaceFolders &&
          workspace.workspaceFolders.length > 1
        ) {
          const workspaceFolder = await window.showWorkspaceFolderPick({
            placeHolder: 'Select working directory for new terminal'
          })

          cwd = workspaceFolder?.uri.fsPath
        }

        const name = await window.showInputBox({
          placeHolder: 'Enter name for new terminal'
        })

        for (const { terminal } of common.terminals.values()) {
          terminal.hide()
        }

        const _terminal = new StatusBarTerminal({
          cwd,
          name,
          show: true,
          terminalIndex: common.terminalCount++
        })

        const terminalID = await _terminal.processId

        if (terminalID) {
          common.terminals.set(terminalID, {
            terminal: _terminal,
            terminalID
          })
        }
      }
      catch {
        window.showErrorMessage('Unable to create named terminal')
      }
    }
  )
}
