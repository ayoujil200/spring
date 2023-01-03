var express = require('express');
var webManagerRouter = express.Router();
var checkManagerRole = require("../../middlewares/checkManagerSessionRole.middleware");
const managerController = require("../../controllers/manager.controller");

//manage users
webManagerRouter.get('/users', checkManagerRole.checkManagerSessionRole, managerController.getUsers);
webManagerRouter.get('/users/:id/to/enable', checkManagerRole.checkManagerSessionRole, managerController.enableUser);
webManagerRouter.get('/users/:id/to/disable', checkManagerRole.checkManagerSessionRole, managerController.disableUser);

//manage personal informations
webManagerRouter.post('/profile', checkManagerRole.checkManagerSessionRole, managerController.editProfile);

//manage requests
webManagerRouter.post('/requests/search', checkManagerRole.checkManagerSessionRole, managerController.getRequestById);
webManagerRouter.get('/requests/accepted', checkManagerRole.checkManagerSessionRole, managerController.getAcceptedRequests);
webManagerRouter.get('/requests/refused', checkManagerRole.checkManagerSessionRole, managerController.getRefusedRequests);
webManagerRouter.get('/requests/waiting', checkManagerRole.checkManagerSessionRole, managerController.getWaitingRequests);
webManagerRouter.get('/requests/history', checkManagerRole.checkManagerSessionRole, managerController.getHistoryRequests);
webManagerRouter.get('/requests/:id/to/accepte', checkManagerRole.checkManagerSessionRole, managerController.accepteRequest);
webManagerRouter.post('/requests/to/refuse', checkManagerRole.checkManagerSessionRole, managerController.refuseRequest);
webManagerRouter.get('/requests/:id/to/history', checkManagerRole.checkManagerSessionRole, managerController.historyRequest);

module.exports = webManagerRouter;