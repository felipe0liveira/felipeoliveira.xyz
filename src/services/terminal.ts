import { TerminalCommand, TerminalConfig } from '@/types/terminal'

export class TerminalService {
  static async getInitialConfig(): Promise<TerminalConfig> {
    const response = await fetch('/api/command-prompt')
    
    if (!response.ok) {
      throw new Error(`Failed to fetch terminal config: ${response.statusText}`)
    }
    
    return response.json()
  }
  
  static async executeCommand(command: string): Promise<TerminalCommand> {
    const response = await fetch('/api/command-prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command }),
    })
    
    if (!response.ok) {
      throw new Error(`Failed to execute command: ${response.statusText}`)
    }
    
    return response.json()
  }
}
