import '@fontsource/roboto'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './assets/global.scss'
import Layout from './components/layout/Layout'
import store from './store/index.js'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Layout>
				<App />
			</Layout>
		</BrowserRouter>
	</Provider>
)
