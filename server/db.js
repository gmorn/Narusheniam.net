const Pool = require('pg').Pool
const pool = new Pool({
	user: 'demobd_user',
	password: 'OBycP9gTFpA5eBBOvWy1Nu4j144LpWEG',
	host: 'dpg-cla63tm2eqrc73962t5g-a.frankfurt-postgres.render.com',
	port: 5432,
	database: 'demobd',
	ssl: {
		rejectUnauthorized: false
	}
})
pool
	.connect()
	.then((client) => {
		console.log('Connected to the database')
		client.release()
	})
	.catch((err) => {
		console.error('Error connecting to the database')
	})

module.exports = pool
