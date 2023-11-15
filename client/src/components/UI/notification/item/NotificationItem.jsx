import React from 'react'
import './styles.scss'

export default function NotificationItem({ title, code }) {
	return (
		<div
			className={`notification-item ${
				code === 1 ? 'green' : code === 2 ? 'yellow' : code === 3 && 'red'
			}`}
		>
			{title}
		</div>
	)
}
