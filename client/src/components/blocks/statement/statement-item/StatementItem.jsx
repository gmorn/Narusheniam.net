import React from 'react'
import './styles.scss'

export default function StatementItem({ item }) {
	return (
		<div className='statement-item-container'>
			<div className='top'>
				<div className='number'>Номер автомобиля: {item.car_number}</div>
				<div className='status'>
					статус:
					{item.status === 1
						? ' Новое'
						: item.status === 2
						? ' Подтверждено'
						: item.status === 3 && ' Отклонено'}
				</div>
			</div>
			<div className='desc'>{item.descriotion}</div>
		</div>
	)
}
