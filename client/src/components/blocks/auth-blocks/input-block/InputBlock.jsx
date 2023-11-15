import React from 'react'
import { validationFunc } from '../../../../pages/auth-page/validation'
import FormInput from '../../../UI/input/form-input/FormInput'
import './styles.scss'

// проверки строк
// const cyrillicPattern = /^[а-яА-ЯёЁ\s-]+$/
// const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
// const latinPattern = /^[a-zA-Z0-9-]+$/
// const numberPattern = /^[0-9-]+$/

export default function InputBlock({
	pageType,
	user,
	setUser,
	loginState,
	emailState,
	passwordState,
	setLoginState,
	setEmailState,
	setPasswordState
}) {
	// const FIOValidation = (value) => {
	// 	setUser({
	// 		...user,
	// 		FIO: { value, isValid: !cyrillicPattern.test(value) }
	// 	})
	// }
	// const numberValidation = (value) => {
	// 	setUser({
	// 		...user,
	// 		number: { value, isValid: !numberPattern.test(value) }
	// 	})
	// }
	// const loginValidation = (value) => {
	// 	setLoginState(false)
	// 	setUser({
	// 		...user,
	// 		login: { value, isValid: !latinPattern.test(value) }
	// 	})
	// }
	// const emailValidation = (value) => {
	// 	setEmailState(false)
	// 	setUser({
	// 		...user,
	// 		email: { value, isValid: !emailPattern.test(value) }
	// 	})
	// }
	// const passwordValidation = (value) => {
	// 	setPasswordState(false)
	// 	setUser({
	// 		...user,
	// 		password: {
	// 			value,
	// 			isValid: pageType === 'login' ? false : value.length < 6
	// 		}
	// 	})
	// }
	// const passwordRepeatValidation = (value) => {
	// 	setUser({
	// 		...user,
	// 		passwordRepeat: { value, isValid: value !== user.password.value }
	// 	})
	// }
	const inputData = [
		{
			name: 'FIO',
			pageType: ['registration'],
			type: 'text',
			placeholder: 'ФИО',
			label: 'Используйте только "а-я", "А-Я", " "',
			value: user.FIO.value,
			onChange: validationFunc,
			status: user.FIO.isValid
		},
		{
			name: 'number',
			pageType: ['registration'],
			type: 'text',
			placeholder: 'номер телефона',
			label: 'Используйте только "0-9"',
			value: user.number.value,
			onChange: validationFunc,
			status: user.number.isValid
		},
		{
			name: 'login',
			pageType: ['login', 'registration'],
			type: 'text',
			placeholder: 'Логин',
			label: loginState
				? pageType === 'login'
					? 'Пользователя с таким логином нет'
					: 'Пользователь с таким логином уже существует'
				: 'Используйте только "a-z", "A-Z", "0-9", "-"',
			value: user.login.value,
			onChange: validationFunc,
			status: loginState ? loginState : user.login.isValid
		},
		{
			name: 'email',
			pageType: ['registration'],
			type: 'text',
			placeholder: 'Email',
			label: emailState
				? 'Пользователь с такой почтой уже существует'
				: 'Некорректная почта',
			value: user.email.value,
			onChange: validationFunc,
			status: emailState ? emailState : user.email.isValid
		},
		{
			name: 'password',
			pageType: ['login', 'registration'],
			type: 'password',
			placeholder: 'Пароль',
			label: passwordState ? 'Неверный пароль' : 'Пароль не менее 6 символов',
			value: user.password.value,
			onChange: validationFunc,
			status: passwordState ? passwordState : user.password.isValid
		},
		{
			name: 'passwordRepeat',
			pageType: ['registration'],
			type: 'password',
			placeholder: 'Повторите пароль',
			label: 'Пароли не совпадают',
			value: user.passwordRepeat.value,
			onChange: validationFunc,
			status: user.passwordRepeat.isValid
		}
	]

	return (
		<div className='input-block-container'>
			{inputData.map(
				(input, index) =>
					input.pageType.includes(pageType) && (
						<FormInput
							key={index}
							type={input.type}
							placeholder={input.placeholder}
							label={input.label}
							value={input.value}
							onChange={(e) =>
								input.onChange(
									e.target.value,
									input.name,
									setUser,
									user,
									setEmailState,
									setLoginState,
									setPasswordState,
									pageType
								)
							}
							status={input.status}
						/>
					)
			)}
			{pageType === 'registration' && (
				<div className='input-block-checkbox'>
					<p>Я согласен справилами регистрации</p>
					<input
						type='checkbox'
						checked={user.rules.value === 'on'}
						onChange={(e) =>
							setUser({
								...user,
								rules: { ...user.rules, value: e.target.checked ? 'on' : 'off' }
							})
						}
					/>
				</div>
			)}
		</div>
	)
}
