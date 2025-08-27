import { useState, useRef, useEffect } from 'react'
import { Window } from '../Window'
import { TerminalProps, TerminalLine } from './types'

interface ApiCommandResponse {
	output?: string
	error?: string
	clear?: boolean
}

interface ApiInitialResponse {
	initialText: string[]
	prompt: string
	title: string
}

export const Terminal = ({ 
	title: propTitle,
	initialText: propInitialText,
	prompt: propPrompt
}: TerminalProps) => {
	const [lines, setLines] = useState<TerminalLine[]>([])
	const [currentInput, setCurrentInput] = useState('')
	const [cursorVisible, setCursorVisible] = useState(true)
	const [prompt, setPrompt] = useState(propPrompt || 'C:\\>')
	const [title, setTitle] = useState(propTitle || 'MS-DOS Prompt')
	const [isLoading, setIsLoading] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const terminalRef = useRef<HTMLDivElement>(null)

	// Load initial configuration from API
	useEffect(() => {
		const loadInitialConfig = async () => {
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
				} else {
					// Fallback to props if API fails
					setLines([
						...(propInitialText || []).map(text => ({ type: 'output' as const, text })),
						{ type: 'command', text: prompt }
					])
				}
			} catch (error) {
				console.error('Failed to load terminal config:', error)
				// Fallback to props if API fails
				setLines([
					...(propInitialText || []).map(text => ({ type: 'output' as const, text })),
					{ type: 'command', text: prompt }
				])
			}
		}

		loadInitialConfig()
	}, [propTitle, propInitialText, propPrompt, prompt])

	// Cursor blinking effect
	useEffect(() => {
		const interval = setInterval(() => {
			setCursorVisible(prev => !prev)
		}, 530)
		return () => clearInterval(interval)
	}, [])

	// Auto-scroll to bottom when new lines are added
	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight
		}
	}, [lines])

	const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !isLoading) {
			const command = currentInput.trim()
			setIsLoading(true)
			
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
					} else {
						// Add output to terminal
						if (result.output) {
							newLines.push({ type: 'output', text: result.output })
						} else if (result.error) {
							newLines.push({ type: 'error', text: result.error })
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
				}
			} catch (error) {
				// Handle network error
				newLines.push({ type: 'error', text: 'Error: Network connection failed' })
				newLines.push({ type: 'command', text: prompt })
				setLines(newLines)
			} finally {
				setIsLoading(false)
				setCurrentInput('')
			}
		}
	}

	const focusInput = (e: React.MouseEvent) => {
		// Prevent focusing if clicking on text (to allow text selection)
		if (window.getSelection()?.toString()) {
			return
		}
		// Only focus if clicking on empty space
		const target = e.target as HTMLElement
		if (target === terminalRef.current || target.closest('.terminal-line-content')) {
			inputRef.current?.focus()
		}
	}

	return (
		<Window title={title} padding={false}>
			<div 
				ref={terminalRef}
				className="terminal-container"
				onClick={focusInput}
				onMouseDown={(e) => {
					// Prevent text selection on terminal background
					if (e.target === terminalRef.current) {
						e.preventDefault()
					}
				}}
				style={{
					backgroundColor: '#000000',
					color: '#c0c0c0',
					fontFamily: 'monospace',
					fontSize: '12px',
					padding: '8px',
					height: '300px',
					overflowY: 'auto',
					cursor: 'text',
					border: '2px inset #c0c0c0',
					userSelect: 'text'
				}}
			>
				{lines.map((line, index) => (
					<div key={index} className="terminal-line-content" style={{ margin: 0, padding: 0, lineHeight: '1.2' }}>
						{line.type === 'command' && index === lines.length - 1 ? (
							<div style={{ display: 'inline-block', width: '100%' }}>
								<span>{line.text} </span>
								<span style={{ position: 'relative', display: 'inline-block' }}>
									<input
										ref={inputRef}
										type="text"
										value={currentInput}
										onChange={(e) => setCurrentInput(e.target.value)}
										onKeyDown={handleKeyDown}
										disabled={isLoading}
										style={{
											backgroundColor: 'transparent',
											border: 'none',
											outline: 'none',
											color: isLoading ? '#808080' : '#c0c0c0',
											fontFamily: 'inherit',
											fontSize: 'inherit',
											width: `${Math.max(currentInput.length + 1, 1)}ch`,
											caretColor: 'transparent',
											boxShadow: 'none',
											WebkitAppearance: 'none',
											MozAppearance: 'none',
											position: 'relative',
											zIndex: 1
										}}
										autoFocus
									/>
									{!isLoading ? (
										<span 
											style={{ 
												position: 'absolute',
												left: `${currentInput.length}ch`,
												top: 0,
												backgroundColor: cursorVisible ? '#c0c0c0' : 'transparent',
												width: '1ch',
												height: '100%',
												display: 'inline-block',
												zIndex: 0
											}}
										>
										</span>
									) : (
										<span 
											style={{ 
												position: 'absolute',
												left: `${currentInput.length}ch`,
												top: 0,
												color: '#c0c0c0',
												marginLeft: '4px'
											}}
										>
											...
										</span>
									)}
								</span>
							</div>
						) : (
							<div 
								style={{ 
									color: line.type === 'error' ? '#ff0000' : '#c0c0c0',
									whiteSpace: 'pre-wrap'
								}}
							>
								{line.text}
							</div>
						)}
					</div>
				))}
			</div>
		</Window>
	)
}
