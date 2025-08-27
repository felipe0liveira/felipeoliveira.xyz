'use client'

import { useState } from 'react'
import { TabItem, TabsProps } from './types'

export const Tabs = ({ tabs }: TabsProps) => {
	const [selectedTab, setSelectedTab] = useState<TabItem>(tabs[0])

	const handleSelectTab = (tab: TabItem) => {
		if (tab.title === selectedTab.title) return

		setSelectedTab(tab)
	}
	return (
		<div>
			<menu role='tablist'>
				{tabs.map((t: TabItem, i: number) => (
					<li
						role='tab'
						aria-selected={t.title === selectedTab.title ? 'true' : 'false'}
						key={i}
						onClick={() => handleSelectTab(t)}
					>
						<a href='#tabs'>{t.title}</a>
					</li>
				))}
			</menu>
			<div className='window' role='tabpanel'>
				<div className='window-body'>{selectedTab.content}</div>
			</div>
		</div>
	)
}
