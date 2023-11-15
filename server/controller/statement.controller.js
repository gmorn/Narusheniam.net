const db = require('../db')

class StatementController {
	async create(req, res) {
		try {
			const userId = req.id
			const { carNumber, description } = req.body

			await db.query(
				`INSERT INTO statement
        (car_number, descriotion, user_id) 
        values ($1, $2, $3) RETURNING *`,
				[carNumber, description, userId]
			)

			res.status(200).send('statement add')
		} catch (error) {
			console.error(error)
			res.status(500).send('Not Found')
		}
	}

	async getByUserId(req, res) {
		try {
			const userId = req.id
			const result = await db.query(
				`SELECT * FROM statement WHERE user_id = $1 ORDER BY id DESC;`,
				[userId]
			)
			res.status(200).json(result.rows)
		} catch (error) {
			console.error(error)
			res.status(500).send('Not Found')
		}
	}

	async getAllStatement(req, res) {
		try {
			const result = await db.query(`SELECT * FROM statement ORDER BY id DESC;`)
			res.status(200).json(result.rows)
		} catch (error) {
			console.error(error)
			res.status(500).send('Not Found')
		}
	}

	async newStatus(req, res) {
    try {
      const { id, newStatus } = req.body
      await db.query(
        `
      UPDATE statement
      SET status = $1
      WHERE id = $2;`,
        [newStatus, id]
      )
      res.status(200).send('completed')
		} catch (error) {
      console.error(error)
			res.status(500).send('Not Found')
    }
	}
}

module.exports = new StatementController()
