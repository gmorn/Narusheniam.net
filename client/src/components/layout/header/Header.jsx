import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserService from '../../../service/userService'
import { setIsLogin, setUserRole } from '../../../store/userSlice'
import './styles.scss'

export default function Header() {
	const { isLogin, userRole } = useSelector((state) => state.user)

	const [menuState, setMenuState] = useState(false)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		setMenuState(false)
	}, [location.pathname]);

	const logout = async () => {
		await UserService.logout()
		// отчистка стора
		dispatch(setIsLogin(false))
		dispatch(setUserRole(null))
		// отправка на страницу "О нас"
		navigate('/auth/login')
	}



	return (
		<div className='header'>
			<div className={`burger-button ${menuState && 'active'}`} onClick={() => setMenuState(!menuState)}>
				{menuState ? (
					<img src='/icons/close.svg' alt='' />
				) : (
					<img src='/icons/burger.svg' alt='' />
				)}
			</div>
			<div className={`burger-menu ${menuState && 'active'}`}>
			<Link to='/create-statement'>
					<p>Добавить заявку</p>
				</Link>
				<Link to='/'>
					<p>Список заявок</p>
				</Link>
				{userRole === 2 && (
					<Link to='/admin'>
						<p>Админ панель</p>
					</Link>
				)}
				{isLogin ? (
					<>
						<p onClick={logout}>Выйти</p>
					</>
				) : (
					<Link to='/auth/login'>
						<p>Войти</p>
					</Link>
				)}
			</div>
			<div className='menu'>
				<Link to='/create-statement'>
					<p>Добавить заявку</p>
				</Link>
				<Link to='/'>
					<p>Список заявок</p>
				</Link>
				{userRole === 2 && (
					<Link to='/admin'>
						<p>Админ панель</p>
					</Link>
				)}
				{isLogin ? (
					<>
						<p onClick={logout}>Выйти</p>
					</>
				) : (
					<Link to='/auth/login'>
						<p>Войти</p>
					</Link>
				)}
			</div>
		</div>
	)
}
