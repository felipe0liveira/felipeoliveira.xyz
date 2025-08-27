import { GithubRepository } from '@/types/github'
import { NextRequest, NextResponse } from 'next/server'

type Response = Array<{
	name: string
	description: string
	stargazersCount: number
	size: string
	url: string
}>

type ErrorResponse = {
	error: string
	details?: string
}

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ username: string }> }
) {
	try {
		const { username } = await params

		// Validate username parameter
		if (!username || typeof username !== 'string') {
			console.error('GitHub API Error: Missing or invalid username parameter', {
				username,
				params
			})
			return NextResponse.json(
				{ 
					error: 'Username parameter is required and must be a string' 
				},
				{ status: 400 }
			)
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
					return NextResponse.json(
						{ 
							error: 'User not found',
							details: `GitHub user '${username}' does not exist`
						},
						{ status: 404 }
					)
				case 403:
					return NextResponse.json(
						{ 
							error: 'Rate limit exceeded or access forbidden',
							details: 'GitHub API rate limit reached or repository access denied'
						},
						{ status: 403 }
					)
				case 401:
					return NextResponse.json(
						{ 
							error: 'Unauthorized',
							details: 'GitHub API authentication failed'
						},
						{ status: 401 }
					)
				default:
					return NextResponse.json(
						{ 
							error: 'GitHub API error',
							details: `HTTP ${response.status}: ${response.statusText}`
						},
						{ status: response.status }
					)
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
			return NextResponse.json(
				{ 
					error: 'Invalid response format from GitHub API',
					details: 'Expected an array of repositories'
				},
				{ status: 500 }
			)
		}

		console.log(`Successfully fetched ${data.length} repositories for user: ${username}`)

		// Transform and return the data
		const transformedData: Response = data.map((repo) => ({
			name: repo.name,
			description: repo.description || 'No description available',
			stargazersCount: repo.stargazers_count,
			size: `${repo.size} KB`,
			url: repo.html_url,
		}))

		return NextResponse.json(transformedData)

	} catch (error) {
		// Catch any unexpected errors
		const { username: usernameFromParams } = await params
		console.error('Unexpected error in GitHub repositories API:', {
			error: error instanceof Error ? error.message : String(error),
			stack: error instanceof Error ? error.stack : undefined,
			username: usernameFromParams,
			url: request.url,
			method: request.method,
			timestamp: new Date().toISOString()
		})

		return NextResponse.json(
			{ 
				error: 'Internal server error',
				details: 'An unexpected error occurred while fetching repositories'
			},
			{ status: 500 }
		)
	}
}
