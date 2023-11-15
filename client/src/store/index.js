import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import notificationSlice from './notificationSlice'

const store = configureStore({
	reducer: {
		user: userSlice,
		notification: notificationSlice
	}
})

export default store