var express = require('express');
var webUserRouter = express.Router();
//const userController = require("../controllers/user.controller");
const loginController = require("../controllers/auth/login.controller");
const registerController = require("../controllers/auth/register.controller");
const logoutController = require("../controllers/auth/logout.controller");

webUserRouter.get('/login', loginController.getLoginView);
webUserRouter.post('/login', loginController.login);
webUserRouter.get('/register', registerController.getRegisterView);
webUserRouter.post('/register', registerController.register);
webUserRouter.post('/logout', logoutController.logout);

module.exports = webUserRouter;