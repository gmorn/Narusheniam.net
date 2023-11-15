import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLogin: false,
	userRole: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsLogin: (state, action) => {
			state.isLogin = action.payload
		},
		setUserRole: (state, action) => {
			state.userRole = action.payload
		}
	}
})

export const { setIsLogin, setUserRole } = userSlice.actions
export default userSlice.reducer
