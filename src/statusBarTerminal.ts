/**
 * @file StatusBarTerminal class for managing terminals with status bar integration
 */

import type { StatusBarItem, Terminal } from 'vscode'

import { existsSync } from 'node:fs'
import path from 'node:path'
import { StatusBarAlignment, window, workspace } from 'vscode'

import common from './common'

export interface StatusBarTerminalOptions {
  /** Which directory to start the terminal in */
  cwd?: string

  /** Name of the terminal */
  name?: string

  /** Whether or not to preserve focus when showing */
  preserveFocus?: boolean

  /** Whether or not to show terminal */
  show: boolean

  /** Reference to the native terminal */
  terminal?: Terminal

  /** Index of the status bar terminal (position on the status bar) */
  terminalIndex: number
}

export class StatusBarTerminal {
  get name() {
    return this._terminal.name
  }

  get processId() {
    return this._terminal.processId
  }

  private readonly _item: StatusBarItem

  private _showing = false

  private readonly _terminal: Terminal

  constructor({
    cwd,
    name,
    preserveFocus,
    show,
    terminal,
    terminalIndex
  }: StatusBarTerminalOptions) {
    this._terminal = terminal ?? window.createTerminal({ cwd: cwd && this.resolveDir(cwd), name })

    this._item = window.createStatusBarItem(StatusBarAlignment.Left, -10)
    this.setTerminalIndex(terminalIndex, name)
    this._item.show()

    if (show) {
      this.showTerminal(preserveFocus)
    }
  }

  dispose() {
    this._item.dispose()
    this._terminal.dispose()
  }

  hide() {
    this._showing = false
    this._item.color = undefined
    this._item.tooltip = `Show ${this._terminal.name} terminal`
    this._item.text = `$(terminal) ${this.name}`

    common.activeTerminal = undefined
  }

  hideTerminal() {
    this._terminal.hide()
    this.hide()
  }

  sendCommand(command: string, execute = true) {
    this._terminal.sendText(command, execute)
  }

  setTerimalTitle(name: string) {
    this._item.text = `$(terminal) ${name}`
    this._item.tooltip = `Show ${name} terminal`
  }

  setTerminalIndex(index: number, name?: string) {
    this.setTerimalTitle(`${name ?? index + 1}`)
    this._item.command = `tabulous.showTerminal${index + 1}`
  }

  async show() {
    const config = workspace.getConfiguration('tabulous')
    const terminalID = await this._terminal.processId
    this._showing = true
    this._item.color = config.get('activeTabColor')
    this._item.tooltip = `Hide ${this.name} terminal`
    this._item.text = `$(terminal) ${this.name}`

    common.activeTerminal = terminalID
  }

  showTerminal(preserveFocus?: boolean) {
    this._terminal.show(preserveFocus)
    void this.show()
  }

  toggleTerminal() {
    this._showing ? this.hideTerminal() : this.showTerminal()
  }

  private resolveDir(directory?: string) {
    const { workspaceFile, workspaceFolders } = workspace
    // There'll definitely be a workspace file if there's more than one workspace folder
    const workspaceFileDirectory = workspaceFile && path.dirname(workspaceFile.fsPath)

    if (directory) {
      let cwd: string | undefined

      if (path.isAbsolute(directory)) {
        cwd = directory
      }
      else if (workspaceFolders && workspaceFolders.length > 1) {
        const matchedWorkspaceFolder = workspaceFolders.find(w => w.name === directory)

        // Matched a workspace folder name, use this dir
        if (matchedWorkspaceFolder) {
          cwd = matchedWorkspaceFolder.uri.fsPath
        }
        else if (workspaceFileDirectory) {
          // Must be relative to the workspace file dir
          cwd = path.resolve(workspaceFileDirectory, directory)
        }
      }
      else if (workspaceFolders) {
        // Only one workspace folder, use this as relative dir
        cwd = path.resolve(workspaceFolders[0].uri.fsPath, directory)
      }

      // Check to see if this dir actually exists, if not, fall through
      if (cwd && existsSync(cwd)) {
        return cwd
      }

      window.showWarningMessage(`Cannot open terminal for directory/workspace folder name: ${directory}. Check to make sure this is correct. Used default location instead`)
    }

    // More than one workspace folder, use workspace file dir
    if (
      workspace.workspaceFolders &&
      workspace.workspaceFolders.length > 1
    ) {
      return workspaceFileDirectory
    }

    // Use workspace folder dir
    return workspaceFolders?.[0].uri.fsPath
  }
}
