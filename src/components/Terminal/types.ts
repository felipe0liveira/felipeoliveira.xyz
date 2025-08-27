export interface TerminalProps {
	title?: string
	initialText?: string[]
	prompt?: string
}

export interface TerminalLine {
	type: 'command' | 'output' | 'error'
	text: string
}

export interface ApiCommandResponse {
	output?: string
	error?: string
	clear?: boolean
}

export interface ApiInitialResponse {
	initialText: string[]
	prompt: string
	title: string
}
