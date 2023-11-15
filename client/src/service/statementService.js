import axios from 'axios'
import { hostName } from '../constants'

export default class StatementService {
	static async create(date) {
		try {
			const response = await axios.post(`${hostName}/statement/create`, date, {
				withCredentials: true
			})
			return response
		} catch (error) {
			return error.response
		}
	}
	static async getByUserId() {
		try {
			const response = await axios.get(`${hostName}/statement/getByUserId`, {
				withCredentials: true
			})
			return response
		} catch (error) {
			return error.response
		}
	}
	static async getAll() {
		try {
			const response = await axios.get(
				`${hostName}/statement/getAllStatement`,
				{
					withCredentials: true
				}
			)
			return response
		} catch (error) {
			return error.response
		}
	}
	static async newStatus(data) {
		try {
			const response = await axios.post(
				`${hostName}/statement/newStatus`,
				data,
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
