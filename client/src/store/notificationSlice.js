import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	notification: []
}

const notificationSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addNewNotification: (state, action) => {
			state.notification.unshift(action.payload)
		},
		deleteLastNotification: (state) => {
			state.notification.pop()
		}
	}
})

export const { addNewNotification, deleteLastNotification } =
	notificationSlice.actions
export default notificationSlice.reducer
