var express = require('express');
var apiUserRouter = express.Router();
const userController = require("../../controllers/api/user.controller");
const requestController = require("../../controllers/api/request.controller");
var verifyJWTToken = require("../../middlewares/verifyJWTToken");

apiUserRouter.get('/', verifyJWTToken.verifyToken, userController.getAllUsers);
apiUserRouter.get('/:id', verifyJWTToken.verifyToken, userController.getUserById);
apiUserRouter.put('/', verifyJWTToken.verifyToken, userController.updateUser);
apiUserRouter.get('/:id/to/enable', verifyJWTToken.verifyToken, userController.enableUser);
apiUserRouter.get('/:id/to/disable', verifyJWTToken.verifyToken, userController.disableUser);

/*apiUserRouter.get('/:id/requests/accepted', null);
apiUserRouter.get('/:id/requests/refused', null);
apiUserRouter.get('/:id/requests/waited', null);
apiUserRouter.get('/:id/requests/histored', null);*/

module.exports = apiUserRouter;