import axios from 'axios'
import { hostName } from '../constants'

export default class UserService {
	static async reg(user) {
		try {
			const response = await axios.post(`${hostName}/user/reg`, user, {
				withCredentials: true
			})
			return response
		} catch (error) {
			return error.response
		}
	}

	static async login(user) {
		try {
			const response = await axios.post(`${hostName}/user/login`, user, {
				withCredentials: true
			})
			return response
		} catch (error) {
			return error.response
		}
	}

	static async isLogin() {
		try {
			const response = await axios.get(`${hostName}/user/isLogin`, {
				withCredentials: true
			})
			return response
		} catch (error) {
			return error.response
		}
	}

	static async logout() {
		try {
			const response = await axios.get(`${hostName}/user/logout`, {
				withCredentials: true
			})
			return response
		} catch (error) {
			return error.response
		}
	}

	static async getUserById(id) {
		try {
			const response = await axios.post(
				`${hostName}/user/getUserById`,
				{ id },
				{
					withCredentials: true
				}
			)
			return response
		} catch (error) {
			return error.response
		}
	}
}
