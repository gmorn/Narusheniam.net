import React, { useEffect, useState } from 'react'
import StatementService from '../../../../service/statementService'
import UserService from '../../../../service/userService'
import MainButton from '../../../UI/button/main-button/MainButton'
import './styles.scss'

// id: 2,
// car_number: 'adsa',
// descriotion: 'asdsad',
// status: 1,
// user_id: 1

export default function AdminStatementItem({ item }) {
	const [loading, setLoading] = useState(true)
	const [user, setUser] = useState(null)
	const [localItem, setLocalItem] = useState(item)

	useEffect(() => {
		const fetchUser = async () => {
			const response = await UserService.getUserById(item.user_id)
			setUser(response.data)
			setLoading(false)
		}
		fetchUser()
	}, [])

	const statementConfirm = (id) => {
		setLocalItem({ ...item, status: 2 })
		const fetchNewStatus = async () => {
			await StatementService.newStatus({ id, newStatus: 2 })
		}
		fetchNewStatus()
	}

	const statementCancel = (id) => {
		setLocalItem({ ...item, status: 3 })
		const fetchNewStatus = async () => {
			await StatementService.newStatus({ id, newStatus: 3 })
		}
		fetchNewStatus()
	}

	return (
		<div className='admin-statement-item-container'>
			<div className='top'>
				<div className='fio'>
					{loading ? <div className='loader'></div> : `ФИО: ${user.fio}`}
				</div>
				<div className='number'>
					{loading ? (
						<div className='loader'></div>
					) : (
						`Номер Автомобиля: ${localItem.car_number}`
					)}
				</div>
				<div className='status'>
					{loading ? (
						<div className='loader'></div>
					) : (
						<>
							статус:
							{localItem.status === 1
								? ' Новое'
								: localItem.status === 2
								? ' Подтверждено'
								: localItem.status === 3 && ' Отклонено'}
						</>
					)}
				</div>
				{localItem.status === 1 && (
					<div className='menu'>
						{loading ? (
							<>
								<div className='loader'></div>
								<div className='loader'></div>
							</>
						) : (
							<>
								<MainButton onClick={() => statementConfirm(localItem.id)}>
									Подтвердить
								</MainButton>
								<MainButton onClick={() => statementCancel(localItem.id)}>
									Отклонить
								</MainButton>
							</>
						)}
					</div>
				)}
			</div>
			<div className='desc'>
			{loading ? (
							<>
								<div className='loader'></div>
								<div className='loader'></div>
								<div className='loader'></div>
							</>
						) : (
							<>
								{localItem.descriotion}
							</>
						)}
				</div>
		</div>
	)
}
