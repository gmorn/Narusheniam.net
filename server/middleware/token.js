const jwt = require('jsonwebtoken')

const secretKey = 'presnet'

const generateToken = (id) => {
	const payload = { id }
	return jwt.sign(payload, secretKey, { expiresIn: '1h' })
}

const addTokenInCookies = (res, userId, callback) => {
	const newToken = generateToken(userId)
	res.cookie('jwt', newToken, {
		httpOnly: true,
		maxAge: 2592000000,
		sameSite: 'None',
		secure: true
	})
	callback()
}

const verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, secretKey)
		return { valid: true, id: decoded.id }
	} catch (error) {
		const decoded = jwt.decode(token)
		return { valid: false, id: decoded.id }
	}
}

const tokenMiddleware = (req, res, next) => {
	const token = req.cookies.jwt

	if (token) {
		const verificationResult = verifyToken(token)

		if (!verificationResult.valid) {
			const newToken = generateToken(verificationResult.id)
			res.cookie('jwt', newToken, { httpOnly: true, maxAge: 2592000000 })
		}

		req.id = verificationResult.id
	}

	next()
}

const checkCookie = (req) => {
	if (req.cookies && req.cookies.jwt) {
		return true
	}
	return false
}

module.exports = {
	generateToken,
	tokenMiddleware,
	verifyToken,
	checkCookie,
	addTokenInCookies
}
