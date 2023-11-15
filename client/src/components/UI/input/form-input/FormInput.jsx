import React from 'react'
import './styles.scss'

export default function FormInput({
	type,
	label,
	placeholder,
	status,
	onChange,
	value
}) {
	return (
		<div className='form-input-container'>
			<input
				type={type ? type : 'text'}
				className={status ? 'active' : ''}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
			/>
			<label className={status ? 'active' : ''}>{label}</label>
		</div>
	)
}
