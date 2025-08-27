import { useState, useEffect, useCallback } from 'react'
import { request } from '@utils/index'

interface Repository {
	name: string
	description: string
	stargazersCount: number
	size: string
	url: string
}

interface UseRepositoriesReturn {
	data: Repository[] | null
	loading: boolean
	error: string | null
	refetch: () => Promise<void>
}

interface UseRepositoriesOptions {
	username: string
	enabled?: boolean
}

export const useRepositories = ({ 
	username, 
	enabled = true 
}: UseRepositoriesOptions): UseRepositoriesReturn => {
	const [data, setData] = useState<Repository[] | null>(null)
	const [loading, setLoading] = useState<boolean>(enabled)
	const [error, setError] = useState<string | null>(null)

	const fetchRepositories = useCallback(async () => {
		if (!username || !enabled) {
			return
		}

		try {
			setLoading(true)
			setError(null)
			
			const repositories = await request(`/api/github/${username}/repositories`)
			setData(repositories)
		} catch (err) {
			const errorMessage = err instanceof Error 
				? err.message 
				: 'Failed to fetch repositories'
			
			setError(errorMessage)
			console.error('Error fetching repositories:', err)
		} finally {
			setLoading(false)
		}
	}, [username, enabled])

	const refetch = useCallback(async () => {
		await fetchRepositories()
	}, [fetchRepositories])

	useEffect(() => {
		fetchRepositories()
	}, [fetchRepositories])

	return {
		data,
		loading,
		error,
		refetch
	}
}
