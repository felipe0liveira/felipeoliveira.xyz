'use client'

import { Divider } from '@components/Divider'
import { Heading1, Heading2, Paragraph } from '@components/Typography'
import { Blockquote } from '@components/Blockquote'

export const Header = () => {
	return (
		<>
			<Blockquote>
				<Heading1>I am a Software Engineer</Heading1>
				<Heading2 style={{ margin: '0' }}>— Felipe Oliveira</Heading2>
			</Blockquote>

			<Divider />
		</>
	)
}
