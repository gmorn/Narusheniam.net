import React from 'react'
import './styles.scss'

export default function FormButton({ onClick, children, disabled, active }) {
	return (
		<button
			className={`form-button ${active && 'active'}`}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
