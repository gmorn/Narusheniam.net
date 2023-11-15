const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.routes')
const statementRouter = require('./routes/statement.routes')

const PORT = process.env.PORT || 8000

const app = express()

app.use(
	cors({
		origin: 'https://narusheniam-net-fz8v.onrender.com',
		credentials: true
	})
)

app.use(cookieParser())
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', statementRouter)

app.listen(PORT, () => console.log('server start'))
