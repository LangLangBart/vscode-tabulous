/**
 * @file Send file path commands for terminal integration
 */

import type { Disposable } from 'vscode'

import { commands, Disposable as DisposableClass, window, workspace } from 'vscode'

import packageJSON from '../package.json' with { type: 'json' }

export function registerSendFilePathCommands(): Disposable {
  return DisposableClass.from(
    commands.registerCommand('tabulous.sendAbsolutePath', () => {
      withActiveFilePath(p => window.activeTerminal?.sendText(p, false))
    }),
    commands.registerCommand('tabulous.sendRelativePath', () => {
      withActiveFilePath(p => window.activeTerminal?.sendText(workspace.asRelativePath(p, false) || p, false))
    })
  )
}

function withActiveFilePath(function_: (path: string) => void) {
  const editor = window.activeTextEditor
  if (!editor || editor.document.isUntitled) {
    window.showWarningMessage(`${packageJSON.displayName}: No active file editor. Open a file first.`)
    return
  }
  const { fsPath, query, scheme } = editor.document.uri
  function_(scheme === 'git' ? (JSON.parse(query) as { path: string }).path : fsPath)
}
