import React from 'react'
import './styles.scss'

export default function MainButton({ children, onClick ,disabled }) {
	return (
		<button className='main-button' onClick={onClick} disabled={disabled}>
			{children}
		</button>
	)
}
