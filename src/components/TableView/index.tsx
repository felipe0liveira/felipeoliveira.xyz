'use client'

import { TableViewProps } from './types'

export const TableView = ({ list, heading }: TableViewProps) => {
	return (
		<div className='sunken-panel'>
			<table className='interactive'>
				<thead>
					<tr>
						{heading.map((h, index) => (
							<th key={`${h.key}-${index}`}>{h.title}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{list.map((item, itemIndex) => (
						<tr key={item.id || `item-${itemIndex}`} style={{ cursor: 'unset' }}>
							{heading.map((h, headingIndex) => (
								<td key={`${itemIndex}-${headingIndex}`}>
									{h.link ? (
										<a href={item[h.key]} target='_blank'>
											{h.label}
										</a>
									) : (
										item[h.key]
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
