const Router = require('express')
const StatementController = require('../controller/statement.controller')
const router = new Router()
const { tokenMiddleware } = require('../middleware/token');


router.post('/statement/create', tokenMiddleware, StatementController.create)
router.get('/statement/getByUserId', tokenMiddleware, StatementController.getByUserId)
router.get('/statement/getAllStatement', StatementController.getAllStatement)
router.post('/statement/newStatus', StatementController.newStatus)

module.exports = router
