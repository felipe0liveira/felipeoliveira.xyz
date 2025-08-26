import { useState, useRef, useEffect } from 'react'
import { Window } from '../Window'
import { TerminalProps, TerminalLine } from './types'

export const Terminal = ({ 
	title = 'MS-DOS Prompt', 
	initialText = [],
	prompt = 'C:\\>' 
}: TerminalProps) => {
	const [lines, setLines] = useState<TerminalLine[]>([
		...initialText.map(text => ({ type: 'output' as const, text })),
		{ type: 'command', text: prompt }
	])
	const [currentInput, setCurrentInput] = useState('')
	const [cursorVisible, setCursorVisible] = useState(true)
	const inputRef = useRef<HTMLInputElement>(null)
	const terminalRef = useRef<HTMLDivElement>(null)

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

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const command = currentInput.trim()
			
			// Add the command line
			const newLines = [...lines]
			newLines[newLines.length - 1] = { 
				type: 'command', 
				text: `${prompt} ${command}` 
			}

			// Process command and add output
			const output = processCommand(command)
			if (output) {
				newLines.push({ type: 'output', text: output })
			}

			// Add new prompt
			newLines.push({ type: 'command', text: prompt })

			setLines(newLines)
			setCurrentInput('')
		}
	}

	const processCommand = (command: string): string => {
		const cmd = command.toLowerCase()
		
		switch (cmd) {
			case 'help':
				return `Available commands:
DIR     - List directory contents
CLS     - Clear screen
DATE    - Display current date
TIME    - Display current time
VER     - Display version information
ECHO    - Display messages
EXIT    - Close terminal`
			
			case 'dir':
				return `Volume in drive C has no label.
Volume Serial Number is 1234-ABCD

Directory of C:\\

08/26/2025  10:30 AM    <DIR>          WINDOWS
08/26/2025  09:15 AM    <DIR>          TEMP
08/26/2025  08:45 AM         1,024 AUTOEXEC.BAT
08/26/2025  08:45 AM           512 CONFIG.SYS
               2 File(s)          1,536 bytes
               2 Dir(s)   2,147,483,648 bytes free`
			
			case 'cls':
				setLines([{ type: 'command', text: prompt }])
				return ''
			
			case 'date':
				return new Date().toLocaleDateString('en-US', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})
			
			case 'time':
				return `The current time is: ${new Date().toLocaleTimeString()}`
			
			case 'ver':
				return 'Microsoft Windows 98 [Version 4.10.1998]'
			
			case 'exit':
				return 'Goodbye!'
			
			default:
				if (cmd.startsWith('echo ')) {
					return command.substring(5)
				}
				return `'${command}' is not recognized as an internal or external command,
operable program or batch file.`
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
										style={{
											backgroundColor: 'transparent',
											border: 'none',
											outline: 'none',
											color: '#c0c0c0',
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
									<span 
										style={{ 
											position: 'absolute',
											left: `${currentInput.length}ch`,
											top: 0,
                                            marginLeft: 5,
											backgroundColor: cursorVisible ? '#c0c0c0' : 'transparent',
											width: '1ch',
											height: '100%',
											display: 'inline-block',
											zIndex: 0
										}}
									>
									</span>
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
