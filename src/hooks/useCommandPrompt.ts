import { useState, useEffect, useCallback } from 'react'
import { trackEvent } from '@utils/analytics'
import { TerminalLine, ApiCommandResponse, ApiInitialResponse } from '@components/Terminal/types'

interface UseCommandPromptOptions {
	initialText?: string[]
	prompt?: string
	title?: string
}

interface UseCommandPromptReturn {
	lines: TerminalLine[]
	prompt: string
	title: string
	isLoading: boolean
	executeCommand: (command: string) => Promise<void>
	clearTerminal: () => void
	initializeTerminal: () => Promise<void>
}

export const useCommandPrompt = ({
	initialText: propInitialText,
	prompt: propPrompt,
	title: propTitle
}: UseCommandPromptOptions = {}): UseCommandPromptReturn => {
	const [lines, setLines] = useState<TerminalLine[]>([])
	const [prompt, setPrompt] = useState(propPrompt || 'C:\\>')
	const [title, setTitle] = useState(propTitle || 'MS-DOS Prompt')
	const [isLoading, setIsLoading] = useState(false)

	const initializeTerminal = useCallback(async () => {
		try {
			const response = await fetch('/api/command-prompt')
			if (response.ok) {
				const config: ApiInitialResponse = await response.json()
				setPrompt(config.prompt)
				setTitle(propTitle || config.title)
				setLines([
					...(propInitialText || config.initialText).map(text => ({ type: 'output' as const, text })),
					{ type: 'command', text: config.prompt }
				])
				
				// Track terminal initialization
				trackEvent(
					'terminal_initialized',
					'Terminal Interaction',
					'success',
					1
				)
			} else {
				// Fallback to props if API fails
				setLines([
					...(propInitialText || []).map(text => ({ type: 'output' as const, text })),
					{ type: 'command', text: prompt }
				])
				
				// Track terminal initialization with fallback
				trackEvent(
					'terminal_initialized',
					'Terminal Interaction',
					'fallback',
					1
				)
			}
		} catch (error) {
			console.error('Failed to load terminal config:', error)
			// Fallback to props if API fails
			setLines([
				...(propInitialText || []).map(text => ({ type: 'output' as const, text })),
				{ type: 'command', text: prompt }
			])
			
			// Track terminal initialization error
			trackEvent(
				'terminal_initialization_error',
				'Terminal Error',
				'config_load_failed',
				1
			)
		}
	}, [propTitle, propInitialText, prompt])

	const executeCommand = useCallback(async (command: string) => {
		if (isLoading) return

		setIsLoading(true)
		
		// Track command usage with Google Analytics
		trackEvent(
			'terminal_command_executed',
			'Terminal Interaction',
			command.toLowerCase(),
			1
		)
		
		// Add the command line
		const newLines = [...lines]
		newLines[newLines.length - 1] = { 
			type: 'command', 
			text: `${prompt} ${command}` 
		}

		try {
			// Send command to API
			const response = await fetch('/api/command-prompt', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ command })
			})

			if (response.ok) {
				const result: ApiCommandResponse = await response.json()
				
				if (result.clear) {
					// Handle cls command
					setLines([{ type: 'command', text: prompt }])
					
					// Track cls command specifically
					trackEvent(
						'terminal_screen_cleared',
						'Terminal Interaction',
						'cls',
						1
					)
				} else {
					// Add output to terminal
					if (result.output) {
						newLines.push({ type: 'output', text: result.output })
						
						// Track successful command execution
						trackEvent(
							'terminal_command_success',
							'Terminal Interaction',
							command.toLowerCase().split(' ')[0],
							1
						)
					} else if (result.error) {
						newLines.push({ type: 'error', text: result.error })
						
						// Track command errors (unknown commands, etc.)
						trackEvent(
							'terminal_command_error',
							'Terminal Interaction',
							command.toLowerCase().split(' ')[0],
							1
						)
					}

					// Add new prompt
					newLines.push({ type: 'command', text: prompt })
					setLines(newLines)
				}
			} else {
				// Handle API error
				newLines.push({ type: 'error', text: 'Error: Could not process command' })
				newLines.push({ type: 'command', text: prompt })
				setLines(newLines)
				
				// Track API errors
				trackEvent(
					'terminal_api_error',
					'Terminal Error',
					`command: ${command.toLowerCase().split(' ')[0]}, status: ${response.status}`,
					1
				)
			}
		} catch (error) {
			// Handle network error
			newLines.push({ type: 'error', text: 'Error: Network connection failed' })
			newLines.push({ type: 'command', text: prompt })
			setLines(newLines)
			
			// Track network errors
			trackEvent(
				'terminal_network_error',
				'Terminal Error',
				`command: ${command.toLowerCase().split(' ')[0]}`,
				1
			)
		} finally {
			setIsLoading(false)
		}
	}, [lines, prompt, isLoading])

	const clearTerminal = useCallback(() => {
		setLines([{ type: 'command', text: prompt }])
		
		// Track manual terminal clear
		trackEvent(
			'terminal_manually_cleared',
			'Terminal Interaction',
			'manual_clear',
			1
		)
	}, [prompt])

	// Initialize terminal on mount
	useEffect(() => {
		initializeTerminal()
	}, [initializeTerminal])

	return {
		lines,
		prompt,
		title,
		isLoading,
		executeCommand,
		clearTerminal,
		initializeTerminal
	}
}
