import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import UserService from '../../service/userService.js'
import { setIsLogin, setUserRole } from '../../store/userSlice'
import Notification from '../UI/notification/Notification.jsx'
import Header from './header/Header'

export default function Layout({ children }) {
	const location = useLocation()
	const currentPath = location.pathname
	const pattern = /^\/auth\/\w+$/

	// запрос на проверку токена

	const dispatch = useDispatch()

	const navigate = useNavigate()

	useEffect(() => {
		const isLogin = async () => {
			try {
				const response = await UserService.isLogin()
				if (response.data.status === true) {
					dispatch(setIsLogin(true))
					dispatch(setUserRole(response.data.roleId))
				} else {
					navigate('/auth/login')
				}
			} catch (error) {
				console.error(error)
			}
		}

		isLogin()
	}, [])

	return (
		<div className='container'>
			{!pattern.test(currentPath) && <Header />}
			{children}
			<Notification />
		</div>
	)
}
