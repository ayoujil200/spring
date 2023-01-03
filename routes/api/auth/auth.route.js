var express = require('express');
var apiAuthRouter = express.Router();
const login = require("../../../controllers/api/auth/login.controller");
const register = require("../../../controllers/api/auth/register.controller");
const logout = require("../../../controllers/api/auth/logout.controller");
var verifyJWTToken = require("../../../middlewares/verifyJWTToken");

/* GET users listing. */
apiAuthRouter.post('/login', login.login);
apiAuthRouter.post('/register', register.register);
apiAuthRouter.post('/logout', verifyJWTToken.verifyToken, logout.logout);

module.exports = apiAuthRouter;