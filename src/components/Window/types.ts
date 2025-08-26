export interface TitleBarProps {
	title: string
	onMinimize?: () => void
	onMaximize?: () => void
	onClose?: () => void
}

export interface WindowProps extends TitleBarProps {
	children: JSX.Element
	padding?: boolean
}

export type WindowState = 'opened' | 'closed' | 'minimized' | 'maximized'
