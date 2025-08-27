export interface TerminalCommand {
	output?: string
	error?: string
	clear?: boolean
}

export interface TerminalConfig {
	initialText: string[]
	prompt: string
	title: string
}

export interface TerminalErrors {
	unknownCommand: string
	apiError: string
	networkError: string
	invalidCommand: string
}

export interface TerminalData {
	terminal: {
		config: TerminalConfig
		commands: Record<string, TerminalCommand>
		errors: TerminalErrors
	}
}
