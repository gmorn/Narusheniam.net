import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import MainButton from '../../components/UI/button/main-button/MainButton'
import Loader from '../../components/UI/loader/Loader'
import StatementItem from '../../components/blocks/statement/statement-item/StatementItem'
import StatementService from '../../service/statementService'
import './styles.scss'

export default function StatemantPage() {
	const [statement, setStatement] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const navigate = useNavigate()

	const { isLogin } = useSelector((state) => state.user)

	useEffect(() => {
		const fetchStatement = async () => {
			try {
				const response = await StatementService.getByUserId()
				setStatement(response.data)
			} catch (error) {
				setError(true)
			}
			setTimeout(() => {
				setLoading(false)
			}, 1000)
		}
		fetchStatement()
	}, [])

	return (
		<div>
			{error ? (
				<div className='error-message'>
					<h2>Не удалось получить данные!</h2>
				</div>
			) : (
				<>
					{loading ? (
						<Loader />
					) : (
						<>
							{statement.length === 0 ? (
								<div className='message-container'>
									<h3>Вы ещё не оставляли заявлений</h3>
									<Link to='/create-statement'>
										<MainButton>Оставить заявку</MainButton>
									</Link>
								</div>
							) : (
								<div className='statement-list'>
									<h2>Список заявок</h2>
									{statement.map((item) => (
										<StatementItem item={item} key={item.id} />
									))}
									<Link to='/create-statement'>
										<div>
											<MainButton>Оставить заявку</MainButton>
										</div>
									</Link>
								</div>
							)}
						</>
					)}
				</>
			)}
		</div>
	)
}
