var express = require('express');
var apiRequestRouter = express.Router();
const requestController = require("../../controllers/api/request.controller");
var verifyJWTToken = require("../../middlewares/verifyJWTToken");

///url = /api/v1/requests/folowed by paths exists in the bottom
apiRequestRouter.get('/', verifyJWTToken.verifyToken, requestController.getAllRequests);
apiRequestRouter.get('/accepted', verifyJWTToken.verifyToken, requestController.getAcceptedRequests);
apiRequestRouter.get('/refused', verifyJWTToken.verifyToken, requestController.getRefusedRequests);
apiRequestRouter.get('/waited', verifyJWTToken.verifyToken, requestController.getWaitingRequests);
apiRequestRouter.get('/histored', verifyJWTToken.verifyToken, requestController.getHistoryRequests);
apiRequestRouter.get('/:id', verifyJWTToken.verifyToken, requestController.getRequestById);
//apiRequestRouter.put('/', verifyJWTToken.verifyToken, requestController.updateRequest);
apiRequestRouter.get('/:id/to/accepted', verifyJWTToken.verifyToken, requestController.acceptRequest);
apiRequestRouter.get('/:id/to/refused', verifyJWTToken.verifyToken, requestController.refuseRequest);
apiRequestRouter.get('/:id/to/histored', verifyJWTToken.verifyToken, requestController.historyRequest);
apiRequestRouter.post('/', verifyJWTToken.verifyToken, requestController.addRequest);

module.exports = apiRequestRouter;