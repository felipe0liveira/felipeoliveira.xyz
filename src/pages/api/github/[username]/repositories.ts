import { GithubRepository } from '@/types/github'
import type { NextApiRequest, NextApiResponse } from 'next'

type Response = [
	{
		name: string
		description: string
		stargazersCount: number
		size: string
		url: string
	},
]

type ErrorResponse = {
	error: string
	details?: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response | ErrorResponse>,
) {
	try {
		const username = req.query.username as string

		// Validate username parameter
		if (!username || typeof username !== 'string') {
			console.error('GitHub API Error: Missing or invalid username parameter', {
				username,
				query: req.query
			})
			return res.status(400).json({ 
				error: 'Username parameter is required and must be a string' 
			})
		}

		console.log(`Fetching GitHub repositories for user: ${username}`)

		const response = await fetch(
			`https://api.github.com/users/${username}/repos`,
			{
				headers: {
					'User-Agent': 'felipe0liveira-portfolio',
					'Accept': 'application/vnd.github.v3+json'
				}
			}
		)

		// Check if GitHub API response is ok
		if (!response.ok) {
			const errorText = await response.text()
			console.error('GitHub API Error:', {
				status: response.status,
				statusText: response.statusText,
				url: response.url,
				username,
				errorBody: errorText,
				headers: Object.fromEntries(response.headers.entries())
			})

			// Handle specific GitHub API errors
			switch (response.status) {
				case 404:
					return res.status(404).json({ 
						error: 'User not found',
						details: `GitHub user '${username}' does not exist`
					})
				case 403:
					return res.status(403).json({ 
						error: 'Rate limit exceeded or access forbidden',
						details: 'GitHub API rate limit reached or repository access denied'
					})
				case 401:
					return res.status(401).json({ 
						error: 'Unauthorized',
						details: 'GitHub API authentication failed'
					})
				default:
					return res.status(response.status).json({ 
						error: 'GitHub API error',
						details: `HTTP ${response.status}: ${response.statusText}`
					})
			}
		}

		const data = (await response.json()) as GithubRepository[]

		// Validate response data
		if (!Array.isArray(data)) {
			console.error('GitHub API Error: Invalid response format', {
				username,
				dataType: typeof data,
				data
			})
			return res.status(500).json({ 
				error: 'Invalid response format from GitHub API',
				details: 'Expected an array of repositories'
			})
		}

		console.log(`Successfully fetched ${data.length} repositories for user: ${username}`)

		// Transform and return the data
		const transformedData = data.map((repo) => ({
			name: repo.name,
			description: repo.description || 'No description available',
			stargazersCount: repo.stargazers_count,
			size: `${repo.size} KB`,
			url: repo.html_url,
		})) as Response

		res.status(200).json(transformedData)

	} catch (error) {
		// Catch any unexpected errors
		console.error('Unexpected error in GitHub repositories API:', {
			error: error instanceof Error ? error.message : String(error),
			stack: error instanceof Error ? error.stack : undefined,
			username: req.query.username,
			url: req.url,
			method: req.method,
			timestamp: new Date().toISOString()
		})

		res.status(500).json({ 
			error: 'Internal server error',
			details: 'An unexpected error occurred while fetching repositories'
		})
	}
}
