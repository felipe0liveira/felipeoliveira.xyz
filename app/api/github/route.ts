import { NextResponse } from 'next/server';

export interface GitHubProfile {
  avatar_url: string;
  html_url: string;
  name: string;
  company: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  created_at: string;
}

export async function GET() {
  try {
    const response = await fetch('https://api.github.com/users/felipe0liveira', {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub profile');
    }

    const data = await response.json();

    const profile: GitHubProfile = {
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      name: data.name,
      company: data.company,
      location: data.location,
      public_repos: data.public_repos,
      followers: data.followers,
      created_at: data.created_at,
    };

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub profile' },
      { status: 500 }
    );
  }
}
