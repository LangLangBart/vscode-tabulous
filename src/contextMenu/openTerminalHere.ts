/**
 * @file Open terminal here context menu command
 */

import type { Uri } from 'vscode'

import { lstatSync } from 'node:fs'
import path from 'node:path'
import { commands, window } from 'vscode'

import common, { MAX_TERMINALS } from '../common'
import { StatusBarTerminal } from '../statusBarTerminal'

export function openTerminalHere() {
  return commands.registerCommand(
    'tabulous.openTerminalHere',
    async (context?: Uri) => {
      const uri = context?.fsPath ?? window.activeTextEditor?.document.uri.fsPath

      if (uri) {
        const stat = lstatSync(uri)
        const directoryPath = stat.isDirectory() ? uri : path.dirname(uri)
        const directoryName = stat.isDirectory() ?
            path.basename(uri) :
            path.basename(path.dirname(uri))

        if (common.terminals.size >= MAX_TERMINALS) {
          window.showInformationMessage(`This extension does not support more than ${MAX_TERMINALS} terminals.`)
          return
        }

        try {
          for (const { terminal } of common.terminals.values()) {
            terminal.hide()
          }

          const _terminal = new StatusBarTerminal({
            cwd: directoryPath,
            name: `${directoryName}/`,
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
          // Nothing we can do
          window.showErrorMessage(`Unable to open terminal in ${directoryPath}`)
        }
      }
    }
  )
}
