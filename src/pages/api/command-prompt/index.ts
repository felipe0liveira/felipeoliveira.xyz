import type { NextApiRequest, NextApiResponse } from 'next'
import terminalData from '../../../data/terminal.json'
import type { TerminalCommand, TerminalConfig } from '../../../types/terminal'

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
	
	// Unknown command
	return {
		error: terminalData.terminal.errors.unknownCommand.replace('{{command}}', command)
	}
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<CommandResponse | InitialPromptResponse>
) {
	if (req.method === 'GET') {
		// Return initial prompt configuration from JSON
		const initialResponse: InitialPromptResponse = {
			initialText: terminalData.terminal.config.initialText,
			prompt: terminalData.terminal.config.prompt,
			title: terminalData.terminal.config.title
		}
		
		res.status(200).json(initialResponse)
	} else if (req.method === 'POST') {
		// Process command
		const { command } = req.body
		
		if (!command || typeof command !== 'string') {
			res.status(400).json({ error: terminalData.terminal.errors.invalidCommand })
			return
		}
		
		const result = processCommand(command.trim())
		res.status(200).json(result)
	} else {
		res.setHeader('Allow', ['GET', 'POST'])
		res.status(405).end(`Method ${req.method} Not Allowed`)
	}
}
