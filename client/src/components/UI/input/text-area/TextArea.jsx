import React from 'react'
import './styles.scss'

export default function TextArea({ value, setValue, placeholder }) {
	return (
			<textarea placeholder={placeholder} className='text-area-component' onChange={(e) => setValue(e.target.value)} value={value} />
	)
}
