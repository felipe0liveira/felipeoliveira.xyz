'use client'

import { Paragraph } from '@/components/Typography'
import { Header } from '@/components/Header'
import { Window } from '@/components/Window'
import { Terminal } from '@/components/Terminal'
import { Blockquote } from '@/components/Blockquote'
import { Tabs } from '@/components/Tabs'
import { Columns, Layout, Container } from '@/components/Layout'
import { TableView } from '@/components/TableView'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getUserLanguage, trackEvent } from '@/lib/index'
import { useRepositories } from '@/hooks/index'
import * as i18n from '@/locales/i18n'

export function HomePageClient() {
	const [lang, setLang] = useState<'pt-BR' | 'en-US'>()

	const {
		data: githubData,
		loading,
		error,
	} = useRepositories({
		username: 'felipe0liveira',
		enabled: true,
	})

	useEffect(() => {
		const userLang = getUserLanguage() === 'pt-BR' ? 'pt-BR' : 'en-US'
		setLang(userLang)

		// Track user language preference
		trackEvent('language_detected', 'user_preference', userLang)
	}, [])

	if (!lang)
		return (
			<>
				<Header />
			</>
		)

	return (
		<Layout>
			<Container>
				<Header />

				<Window title={i18n.Homepage.aboutWindows98Theme.title[lang]}>
					<>
						<Paragraph>
							{i18n.Homepage.aboutWindows98Theme.description[lang]}
						</Paragraph>
					</>
				</Window>

				<Columns>
					<Window title={i18n.Homepage.thatsMe.title[lang]}>
						<>
							<Image
								src='/me.png'
								alt='A grayscale photo of me with a looking to the right. the background contains nature and mountains.'
								width={0}
								height={0}
								sizes='100%'
								style={{
									width: '100%',
									height: 'auto',
									filter: 'grayscale(100%)',
								}}
							/>
							<Paragraph>{i18n.Homepage.thatsMe.description[lang]}</Paragraph>
						</>
					</Window>
					<Window title={i18n.Homepage.aboutMe.title[lang]}>
						<>
							{i18n.Homepage.aboutMe.description[lang].map((p, i) => (
								<Paragraph key={i}>{p}</Paragraph>
							))}
						</>
					</Window>
				</Columns>

				<Window title={i18n.Homepage.tabs.title[lang]}>
					<>
						<Paragraph>{i18n.Homepage.tabs.description[lang]}</Paragraph>
						<hr />
						<Tabs
							tabs={i18n.Homepage.tabs.items.map((tab) => ({
								title: tab.title[lang],
								content: <Paragraph>{tab.description[lang]}</Paragraph>,
							}))}
						/>
					</>
				</Window>

				<Terminal />

				{githubData && !loading && !error && (
					<Columns>
						<Window title='Github'>
							<>
								<TableView
									heading={[
										{ title: 'Stars', key: 'stargazersCount' },
										{ title: 'Name', key: 'name' },
										{ title: 'Size', key: 'size' },
										{ title: 'URL', key: 'url', label: 'Visit', link: true },
									]}
									list={githubData}
								/>
								<Blockquote>
									<Paragraph>
										{i18n.Homepage.githubBlockquote.text[lang]}
										<a
											href='https://github.com/felipe0liveira'
											target='_blank'
											onClick={() =>
												trackEvent(
													'external_link_click',
													'social_media',
													'github',
												)
											}
										>
											Github
										</a>
										.
									</Paragraph>
								</Blockquote>
							</>
						</Window>
					</Columns>
				)}

				{loading && (
					<Window title='Github'>
						<Paragraph>Loading repositories...</Paragraph>
					</Window>
				)}
			</Container>
		</Layout>
	)
}
