import { useState, useRef, useEffect } from 'react'
import { Window } from '../Window'
import { TerminalProps } from './types'
import { useCommandPrompt } from '@hooks/index'

export const Terminal = ({ 
	title: propTitle,
	initialText: propInitialText,
	prompt: propPrompt
}: TerminalProps) => {
	const [currentInput, setCurrentInput] = useState('')
	const [cursorVisible, setCursorVisible] = useState(true)
	const inputRef = useRef<HTMLInputElement>(null)
	const terminalRef = useRef<HTMLDivElement>(null)

	// Use the command prompt hook
	const {
		lines,
		prompt,
		title,
		isLoading,
		executeCommand
	} = useCommandPrompt({
		initialText: propInitialText,
		prompt: propPrompt,
		title: propTitle
	})

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
			await executeCommand(command)
			setCurrentInput('')
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
