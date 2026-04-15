'use client'

import { useState, useEffect } from 'react'

interface GitHubProfile {
  avatar_url: string
  html_url: string
  name: string
  company: string | null
  location: string | null
  public_repos: number
  followers: number
  created_at: string
}

interface UseGitHubReturn {
  profile: GitHubProfile | null
  loading: boolean
  error: Error | null
}

export function useGitHub(): UseGitHubReturn {
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const response = await fetch('/api/github', {
          cache: 'force-cache',
        })

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub profile')
        }

        const data = await response.json()
        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'))
      } finally {
        setLoading(false)
      }
    }

    fetchGitHub()
  }, [])

  return { profile, loading, error }
}
