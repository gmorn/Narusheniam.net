const { tokenMiddleware } = require('../middleware/token');

const Router = require('express')
const UserController = require('../controller/user.controller')
const router = new Router()

router.post('/user/login', UserController.login)
router.post('/user/reg', UserController.reg)
router.get('/user/isLogin', tokenMiddleware,UserController.isLogin)
router.get('/user/logout', UserController.logout)
router.post('/user/getUserById', UserController.getUserById)

module.exports = router
