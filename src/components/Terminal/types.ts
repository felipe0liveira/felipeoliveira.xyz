export interface TerminalProps {
	title?: string
	initialText?: string[]
	prompt?: string
}

export interface TerminalLine {
	type: 'command' | 'output' | 'error'
	text: string
}
