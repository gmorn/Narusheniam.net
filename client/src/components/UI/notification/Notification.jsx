import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteLastNotification } from '../../../store/notificationSlice'
import NotificationItem from './item/NotificationItem'
import './styles.scss'

export default function Notification() {
	const { notification } = useSelector((state) => state.notification)
	const dispatch = useDispatch()

	const notificationRef = useRef(null)

	useEffect(() => {
		const deleteNotification = () => {
			setTimeout(() => {
				if (notification.length !== 0) {
					dispatch(deleteLastNotification())
				}
			}, 3000)
		}
		setTimeout(() => {
			if (notificationRef.current && notificationRef.current.lastChild) {
				notificationRef.current.lastChild.classList.toggle('active', true)
			}
		}, 10)

		deleteNotification()
	}, [notification])

	return (
		<div className='notification-container' ref={notificationRef}>
			{notification
				.slice()
				.reverse()
				.map((item) => (
					<div className='item'>
						<NotificationItem title={item.title} code={item.code} />
					</div>
				))}
		</div>
	)
}
