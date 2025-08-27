import { GithubRepository } from '@/types/github'

export interface RepositoryData {
  name: string
  description: string
  stargazersCount: number
  size: string
  url: string
}

export class GitHubService {
  static async getRepositories(username: string): Promise<RepositoryData[]> {
    const response = await fetch(`/api/github/${username}/repositories`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.statusText}`)
    }
    
    return response.json()
  }
}
