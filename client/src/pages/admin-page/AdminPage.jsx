import React, { useEffect, useState } from 'react'
import AdminStatementItem from '../../components/blocks/statement/admin-statement-item/AdminStatementItem'
import StatementService from '../../service/statementService'
import './styles.scss'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/UI/loader/Loader'

export default function AdminPage() {
	const [statements, setStatements] = useState([])
	const [loading, setLoading] = useState(true)

	const navigate = useNavigate()

	useEffect(() => {
		const fetchStatements = async () => {
			try {
				const response = await StatementService.getAll()
				setStatements(response.data)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching statements:', error)
				setLoading(false)
			}
		}

		fetchStatements()
	}, [])

	return (
		<div className='admin-page-container'>
			{loading ? (
				<Loader />
			) : (
				<>
					<h2>Список заявок пользователей</h2>
					{statements.length !== 0 &&
						statements.map((item) => (
							<AdminStatementItem key={item.id} item={item} />
						))}
				</>
			)}
		</div>
	)
}
