import { NextRequest, NextResponse } from 'next/server'
import terminalData from '@/data/terminal.json'
import asciiData from '@/data/ascii.json'
import type { TerminalCommand, TerminalConfig } from '@/types/terminal'

interface CommandResponse extends TerminalCommand {}

interface InitialPromptResponse extends TerminalConfig {}

type TerminalCommandKey = keyof typeof terminalData.terminal.commands

const processCommand = (command: string): CommandResponse => {
	const cmd = command.toLowerCase()
	
	// Check for specific commands in the JSON data
	if (cmd in terminalData.terminal.commands) {
		const commandData = terminalData.terminal.commands[cmd as TerminalCommandKey]
		return commandData as CommandResponse
	}
	
	// Handle dynamic commands
	if (cmd === 'date') {
		return {
			output: new Date().toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})
		}
	}
	
	if (cmd === 'time') {
		return {
			output: `The current time is: ${new Date().toLocaleTimeString()}`
		}
	}
	
	if (cmd.startsWith('echo ')) {
		return {
			output: command.substring(5)
		}
	}
	
	// Handle ascii commands
	if (cmd.startsWith('ascii ')) {
		const asciiType = cmd.substring(6).trim()
		
		if (asciiType in asciiData.ascii) {
			const asciiArt = asciiData.ascii[asciiType as keyof typeof asciiData.ascii]
			return {
				output: asciiArt.join('\n')
			}
		} else {
			return {
				error: `ASCII art for "${asciiType}" not found. Available options: ${Object.keys(asciiData.ascii).join(', ')}`
			}
		}
	}
	
	// Unknown command
	return {
		error: terminalData.terminal.errors.unknownCommand.replace('{{command}}', command)
	}
}

export async function GET() {
	// Return initial prompt configuration from JSON
	const initialResponse: InitialPromptResponse = {
		initialText: terminalData.terminal.config.initialText,
		prompt: terminalData.terminal.config.prompt,
		title: terminalData.terminal.config.title
	}
	
	return NextResponse.json(initialResponse)
}

export async function POST(request: NextRequest) {
	try {
		const { command } = await request.json()
		
		if (!command || typeof command !== 'string') {
			return NextResponse.json(
				{ error: terminalData.terminal.errors.invalidCommand },
				{ status: 400 }
			)
		}
		
		const result = processCommand(command.trim())
		return NextResponse.json(result)
	} catch (error) {
		return NextResponse.json(
			{ error: 'Invalid JSON request' },
			{ status: 400 }
		)
	}
}
