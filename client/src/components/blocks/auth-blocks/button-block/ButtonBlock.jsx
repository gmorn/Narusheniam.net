import React from 'react'
import { Link } from 'react-router-dom'
import FormButton from '../../../UI/button/form-button/FormButton'
import './styles.scss'

export default function ButtonBlock({
	pageType,
	user,
	fetchUser,
	loginState,
	emailState,
	passwordState
}) {
	const isRegFormInvalid =
		user.FIO.isValid ||
		user.login.isValid ||
		user.email.isValid ||
		user.password.isValid ||
		user.passwordRepeat.isValid ||
		user.rules.isValid ||
		user.FIO.value === '' ||
		user.login.value === '' ||
		user.email.value === '' ||
		user.password.value === '' ||
		user.passwordRepeat.value === '' ||
		user.rules.value === 'off' ||
		loginState ||
		emailState ||
		passwordState

	const isLoginFormInvalid =
		user.login.isValid ||
		user.password.isValid ||
		user.login.value === '' ||
		user.password.value === '' ||
		loginState ||
		passwordState

	return (
		<div className='button-block'>
			{pageType === 'login' ? (
				<>
					<FormButton
						disabled={isLoginFormInvalid}
						onClick={() => fetchUser(pageType)}
					>
						Войти
					</FormButton>
					<p>Ещё нет аккаунта?</p>
					<Link to='/auth/registration'>
						<FormButton active={true}>Зарегистрироваться</FormButton>
					</Link>
				</>
			) : (
				<>
					<FormButton
						disabled={isRegFormInvalid}
						onClick={() => fetchUser(pageType)}
					>
						Зарегистрироваться
					</FormButton>
					<p>Уже есть аккаунт?</p>
					<Link to='/auth/login'>
						<FormButton active={true}>Войти</FormButton>
					</Link>
				</>
			)}
		</div>
	)
}
