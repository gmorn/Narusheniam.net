const db = require('../db')
const { addTokenInCookies } = require('../middleware/token')

class UserController {
	async login(req, res) {
		const { login, password } = req.body
		try {
			const user = await db.query(`SELECT * FROM users WHERE login = $1`, [
				login
			])
			if (user.rows.length === 0) {
				res.status(400).send('login not available')
			} else {
				if (password === user.rows[0].password) {
					addTokenInCookies(res, user.rows[0].id, () => {
						res.status(200).json(user.rows[0].role_id)
					})
				} else {
					res.status(400).send('password not available')
				}
			}
		} catch (error) {
			console.error(error)
			res.status(500).send('Not Found')
		}
	}
	async reg(req, res) {
		const { FIO, number, login, email, password } = req.body
		// проверка на унинкальность почы и логина
		try {
			// проверка логина
			const checkLogin = await db.query(
				`SELECT * FROM users WHERE login = $1`,
				[login]
			)
			if (checkLogin.rows.length !== 0) {
				res.status(400).send('login not available')
			} else {
				// проверка почты
				const checkEmail = await db.query(
					`SELECT * FROM users WHERE email = $1`,
					[email]
				)
				if (checkEmail.rows.length !== 0) {
					res.status(400).send('email not available')
				} else {
					const newUser = await db.query(
						`INSERT INTO users
						(FIO, number, login, email, password) 
						values ($1, $2, $3, $4, $5) RETURNING *`,
						[FIO, number, login, email, password]
					)
					addTokenInCookies(res, newUser.rows[0].id, () => {
						res.status(200).json(newUser.rows[0].role_id)
					})
				}
			}
		} catch (error) {
			console.error(error)
			res.status(500).send('Not Found')
		}
	}
	async isLogin(req, res) {
		try {
			const userId = req.id
			res.status(200)

			if (userId !== undefined && userId !== null) {
				const user = await db.query(`SELECT * FROM users WHERE id = $1`, [
					userId
				])
				res.json({ status: true, roleId: user.rows[0].role_id })
			} else {
				res.json({ status: false })
			}
		} catch (error) {
			res.status(500).send('Internal Server Error')
		}
	}
	async logout(req, res) {
		try {
			res.clearCookie('jwt')
			res.status(200).send('Logout successful')
		} catch (error) {
			console.error(error)
			res.status(500).send('Not Found')
		}
	}
	async getUserById(req, res) {
		try {
			const { id } = req.body
			const user = await db.query(`SELECT * FROM users WHERE id = $1`, [id])
			res.status(200).json(user.rows[0])
		} catch (error) {
			console.error(error)
			res.status(500).send('Not Found')
		}
	}
}

module.exports = new UserController()
