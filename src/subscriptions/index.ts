/**
 * @file Subscription Registration
 */

import type { ExtensionContext } from 'vscode'

import { window } from 'vscode'

import { MAX_TERMINALS } from '../common'
import { createNamedTerminal } from './createNamedTerminal'
import { createTerminal } from './createTerminal'
import { onDidChangeActiveTerminal } from './onDidChangeActiveTerminal'
import { onDidCloseTerminal } from './onDidCloseTerminal'
import { onDidOpenTerminal } from './onDidOpenTerminal'
import { reloadTerminals } from './reloadTerminals'
import { renameTerminal } from './renameTerminal'
import { toggleTerminal } from './toggleTerminal'

export function registerSubscriptions(context: ExtensionContext) {
  context.subscriptions.push(
    createNamedTerminal(),
    createTerminal(),
    renameTerminal(),
    reloadTerminals(),
    window.onDidCloseTerminal(onDidCloseTerminal)
  )

  if ('onDidOpenTerminal' in window) {
    context.subscriptions.push(window.onDidOpenTerminal(onDidOpenTerminal))
  }

  context.subscriptions.push(window.onDidChangeActiveTerminal(onDidChangeActiveTerminal))

  for (let index = 1; index <= MAX_TERMINALS; index++) {
    context.subscriptions.push(toggleTerminal(index))
  }
}
