import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/UI/loader/Loader.jsx'
import ButtonBlock from '../../components/blocks/auth-blocks/button-block/ButtonBlock'
import InputBlock from '../../components/blocks/auth-blocks/input-block/InputBlock'
import UserService from '../../service/userService.js'
import { addNewNotification } from '../../store/notificationSlice.js'
import { setIsLogin, setUserRole } from '../../store/userSlice'
import './styles.scss'

export default function AuthPage() {
	const { pageType } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [user, setUser] = useState({
		FIO: { value: '', isValid: false },
		login: { value: '', isValid: false },
		email: { value: '', isValid: false },
		number: { value: '', isValid: false },
		password: { value: '', isValid: false },
		passwordRepeat: { value: '', isValid: false },
		rules: { value: 'off', isValid: false }
	})

	const [loginState, setLoginState] = useState(false)
	const [emailState, setEmailState] = useState(false)
	const [passwordState, setPasswordState] = useState(false)

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoginState(false)
		setEmailState(false)
		setPasswordState(false)
	}, [pageType])

	const fetchUser = async (pageType) => {
		if (!loading) {
			setLoading(true)
			try {
				let response
				switch (pageType) {
					case 'login':
						const userDataForLogin = {
							login: user.login.value,
							password: user.password.value
						}
						response = await UserService.login(userDataForLogin)
						if (response.status === 400) {
							switch (response.data) {
								case 'login not available':
									setLoginState(true)
									break
								case 'password not available':
									setPasswordState(true)
									break
							}
						}
						break
					case 'registration':
						const userDataForReg = {
							FIO: user.FIO.value,
							number: user.number.value,
							email: user.email.value,
							login: user.login.value,
							password: user.password.value
						}
						response = await UserService.reg(userDataForReg)
						if (response.status === 400) {
							switch (response.data) {
								case 'login not available':
									setLoginState(true)
								case 'email not available':
									setEmailState(true)
							}
						}
				}
				if (response.status === 200) {
					dispatch(setIsLogin(true))
					dispatch(setUserRole(response.data))
					navigate('/')
					dispatch(
						addNewNotification({
							title: 'Вы успешно вошли в аккаунт!',
							code: 1
						})
					)
				}
			} catch (error) {
				dispatch(addNewNotification({ title: 'Ошибка на сервере!', code: 3 }))
			}
			setLoading(false)
		}
	}

	return (
		<>
			<div className='auth-page-container'>
				<h1>
					{pageType === 'login'
						? 'Вход'
						: pageType === 'registration'
						? 'Регистрация'
						: ''}
				</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						fetchUser(pageType, e)
					}}
				>
					<InputBlock
						pageType={pageType}
						user={user}
						setUser={setUser}
						loginState={loginState}
						emailState={emailState}
						passwordState={passwordState}
						setLoginState={setLoginState}
						setEmailState={setEmailState}
						setPasswordState={setPasswordState}
					/>
					<ButtonBlock
						pageType={pageType}
						user={user}
						fetchUser={fetchUser}
						loginState={loginState}
						emailState={emailState}
						passwordState={passwordState}
					/>
				</form>
			</div>
			{loading && <Loader />}
		</>
	)
}
