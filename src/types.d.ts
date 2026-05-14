import type { StatusBarTerminal } from './statusBarTerminal'

export interface Common {
  activeTerminal?: number
  loaded: boolean
  terminalCount: number
  terminals: Map<number, { terminal: StatusBarTerminal, terminalID: number }>
}

export interface DefaultTerminal {
  command?: string
  directory?: string
  executeCommand?: boolean
  name?: string
}
