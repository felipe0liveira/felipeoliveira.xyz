import { useState, useEffect } from 'react'
import { WindowProps, WindowState } from './types'
import { trackEvent } from '../../utils/analytics'

export const Window = ({ title, children, padding = true }: WindowProps) => {
	const [windowState, setWindowState] = useState<WindowState>('opened')

	useEffect(() => {
		// Track window state changes
		trackEvent(
			'window_state_change',
			'UI Interaction',
			`${title} - ${windowState}`,
		)
	}, [windowState, title])

	if (windowState === 'closed') return <></>
	return (
		<div
			className='window'
			style={{ height: 'min-content', width: '-webkit-fill-available' }}
		>
			<div className='title-bar'>
				<div className='title-bar-text'>{title}</div>
				<div className='title-bar-controls'>
					<button
						aria-label='Minimize'
						onClick={() => setWindowState('minimized')}
						disabled={['minimized'].includes(windowState)}
					/>
					<button
						aria-label='Maximize'
						onClick={() => setWindowState('maximized')}
						disabled={['opened', 'maximized'].includes(windowState)}
					/>
					<button aria-label='Close' onClick={() => setWindowState('closed')} />
				</div>
			</div>
			{['opened', 'maximized'].includes(windowState) && (
				<div
					className='window-body'
					style={{
						display: 'grid',
						gap: '8px',
						...(padding ? {} : { margin: 0 }),
					}}
				>
					{children}
				</div>
			)}
		</div>
	)
}
