'use client';

import { useGitHub } from '@/hooks/useGitHub';
import Image from 'next/image';

export default function ContributionSection() {
  const { profile, loading, error } = useGitHub();

  if (loading) {
    return (
      <section className="relative min-h-screen bg-black text-white py-20 overflow-hidden" id="contribution">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-800 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="relative min-h-screen bg-black text-white py-20 overflow-hidden" id="contribution">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="text-red-500">Error loading GitHub profile</p>
        </div>
      </section>
    );
  }

  const joinDate = new Date(profile.created_at);
  const yearsActive = new Date().getFullYear() - joinDate.getFullYear();

  return (
    <section className="relative min-h-screen bg-black text-white py-20 overflow-hidden" id="contribution">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-950/20 via-transparent to-lemon-950/20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-lemon-500 font-mono text-sm">04. OPEN_SOURCE</span>
            <div className="h-px flex-1 bg-gradient-to-r from-lemon-500 to-transparent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            GITHUB <span className="text-pink-500">CONTRIBUTION</span>
          </h2>
          <p className="text-gray-400 max-w-3xl leading-relaxed">
            Open-source contributions and public projects showcasing continuous learning and 
            community involvement in the software development ecosystem.
          </p>
        </div>

        {/* Terminal Style Container */}
        <div className="max-w-5xl mx-auto">
          {/* Terminal Header */}
          <div className="bg-gray-900 border-2 border-lemon-500/50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-500"></div>
              <div className="w-3 h-3 rounded-full bg-lemon-500"></div>
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            </div>
            <div className="font-mono text-xs text-gray-500 hidden sm:block">
              github:~$ fetch user/felipe0liveira
            </div>
            <div className="font-mono text-xs text-gray-500 sm:hidden flex-1 text-center">
              fetch user
            </div>
            <div className="w-4 sm:w-16"></div>
          </div>

          {/* Terminal Body */}
          <div 
            className="bg-black/90 border-2 border-lemon-500/50 border-t-0 p-8 font-mono text-sm backdrop-blur-sm"
            style={{
              boxShadow: '0 0 60px rgba(195, 255, 0, 0.2)',
            }}
          >
            {/* Command Prompt */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-x-1">
                <span className="text-lemon-500">root@github</span>
                <span className="text-gray-500">:</span>
                <span className="text-pink-500">~</span>
                <span className="text-gray-500">$</span>
                <span className="text-white ml-2 break-all">fetch_developer_profile</span>
              </div>
            </div>

            {/* Loading Animation */}
            <div className="mb-6 text-gray-500">
              <span className="animate-pulse">Connecting to GitHub API...</span>
              <span className="text-lemon-500 ml-2">✓</span>
            </div>

            {/* Profile Data */}
            <div className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="relative w-32 h-32 border-2 border-pink-500 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={profile.avatar_url}
                        alt={profile.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-500 text-xs mb-1">[PROFILE]</div>
                      <div className="text-lemon-500 text-xl font-bold mb-2">{profile.name}</div>
                      {profile.company && (
                        <div className="text-gray-400 mb-1">
                          <span className="text-pink-500">🏢</span> {profile.company}
                        </div>
                      )}
                      {profile.location && (
                        <div className="text-gray-400">
                          <span className="text-pink-500">📍</span> {profile.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-lemon-500/30 p-4 bg-lemon-950/10">
                    <div className="text-gray-500 text-xs mb-1">PUBLIC_REPOS</div>
                    <div className="text-lemon-500 text-3xl font-bold">{profile.public_repos}</div>
                  </div>
                  <div className="border border-pink-500/30 p-4 bg-pink-950/10">
                    <div className="text-gray-500 text-xs mb-1">FOLLOWERS</div>
                    <div className="text-pink-500 text-3xl font-bold">{profile.followers}</div>
                  </div>
                  <div className="border border-pink-500/30 p-4 bg-pink-950/10 col-span-2">
                    <div className="text-gray-500 text-xs mb-1">MEMBER_SINCE</div>
                    <div className="text-pink-500 text-xl font-bold">
                      {joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      {yearsActive}+ years contributing
                    </div>
                  </div>
                </div>
              </div>

              {/* System Output */}
              <div className="border-t border-gray-800 pt-6 space-y-2">
                <div className="text-gray-500">
                  <span className="text-lemon-500">&gt;</span> Status: 
                  <span className="text-green-500 ml-2">ACTIVE</span>
                  <span className="ml-2 animate-pulse">●</span>
                </div>
                <div className="text-gray-500">
                  <span className="text-lemon-500">&gt;</span> Profile verification: 
                  <span className="text-lemon-500 ml-2">AUTHENTICATED</span>
                </div>
                <div className="text-gray-500">
                  <span className="text-lemon-500">&gt;</span> Last sync: 
                  <span className="text-gray-400 ml-2">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Visit GitHub Button */}
              <div className="border-t border-gray-800 pt-6">
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 border-2 border-lemon-500 text-lemon-500 hover:bg-lemon-500 hover:text-black font-bold transition-all duration-300 transform hover:scale-105"
                >
                  VIEW GITHUB PROFILE &gt;&gt;
                </a>
              </div>

              {/* Command Prompt End */}
              <div className="pt-4">
                <div className="flex flex-wrap items-center gap-x-1">
                  <span className="text-lemon-500">root@github</span>
                  <span className="text-gray-500">:</span>
                  <span className="text-pink-500">~</span>
                  <span className="text-gray-500">$</span>
                  <span className="text-white ml-2 animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-20 h-px bg-gradient-to-r from-pink-500 via-lemon-500 to-transparent"></div>
      </div>
    </section>
  );
}
