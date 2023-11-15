const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.routes')
const statementRouter = require('./routes/statement.routes')

const PORT = process.env.PORT || 8000

const app = express()

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true
	})
)

app.use(cookieParser())
app.use(express.json())
app.use('/api', userRouter)
app.use('/api', statementRouter)

app.listen(PORT, () => console.log('server start'))
