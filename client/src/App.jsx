import { Route, Routes, useNavigate } from 'react-router-dom'
import AdminPage from './pages/admin-page/AdminPage'
import AuthPage from './pages/auth-page/AuthPage'
import CreateStatementPage from './pages/create-statement-page/CreateStatementPage'
import StatemantPage from './pages/statement-page/StatemantPage'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function App() {

	return (
		<Routes>
			<Route path={'/'} element={<StatemantPage />} />
			<Route path={'/auth/:pageType'} element={<AuthPage />} />
			<Route path={'/create-statement'} element={<CreateStatementPage />} />
			<Route path={'/admin'} element={<AdminPage />} />
		</Routes>
	)
}
