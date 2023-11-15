import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MainButton from '../../components/UI/button/main-button/MainButton'
import FormInput from '../../components/UI/input/form-input/FormInput'
import TextArea from '../../components/UI/input/text-area/TextArea'
import Loader from '../../components/UI/loader/Loader'
import StatementService from '../../service/statementService'
import { addNewNotification } from '../../store/notificationSlice'
import './styles.scss'

export default function CreateStatementPage() {
	const [statement, setStatement] = useState('')
	const [carNumber, setCarNumber] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const createStatement = async () => {
		setLoading(true)
		const newStatement = {
			carNumber,
			description: statement
		}
		const response = await StatementService.create(newStatement)
		setTimeout(() => {}, 1000)
		if (response.status === 200) {
			navigate('/')
		} else {
			dispatch(
				addNewNotification({ title: 'Ошибка при добавлении заявки!', code: 3 })
			)
		}
		setLoading(false)
		dispatch(addNewNotification({ title: 'Заявка успешно добавлена', code: 1 }))
	}

	return (
		<>
		<div className='create-statement-container'>
			<h3>Форма для добавления заявки</h3>
			<div className='form'>
				<FormInput
					placeholder={'Введите номер автомобиля'}
					onChange={(e) => setCarNumber(e.target.value)}
					value={carNumber}
				/>
				<TextArea
					value={statement}
					setValue={setStatement}
					placeholder={'введите вашу заявку'}
				/>
			</div>
			<MainButton
				onClick={createStatement}
				disabled={statement === '' || carNumber === ''}
			>
				Добавить заявку
			</MainButton>
		</div>
			{loading && <Loader />}
		</>
	)
}
