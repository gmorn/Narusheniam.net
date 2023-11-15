import React from 'react'
import './styles.scss'

export default function AdminPageSwitcher({ pageState, setPageState }) {
	return (
		<div className='admin-page-switcher'>
			<div
				className={`admin-page-switcher-item ${
					pageState === 'product' && 'active product'
				}`}
        onClick={() => setPageState('product')}
			>
        <p>Товары</p>
				
			</div>
			<div
				className={`admin-page-switcher-item ${
					pageState === 'order' && 'active order'
				}`}
        onClick={() => setPageState('order')}
			>
				<p>Заказы</p>
			</div>
		</div>
	)
}
