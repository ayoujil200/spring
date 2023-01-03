var express = require('express');
var webRequesterRouter = express.Router();
var checkRequesterRole = require("../../middlewares/checkRequesterSessionRole.middleware");
const requesterController = require("../../controllers/requester.controller");

webRequesterRouter.post('/profile', checkRequesterRole.checkRequesterRole, requesterController.editProfile);
webRequesterRouter.post('/requests', checkRequesterRole.checkRequesterRole, requesterController.addRequest);
webRequesterRouter.post('/requests/search', checkRequesterRole.checkRequesterRole, requesterController.getRequestById);
webRequesterRouter.get('/requests/accepted', checkRequesterRole.checkRequesterRole, requesterController.getAcceptedRequests);
webRequesterRouter.get('/requests/refused', checkRequesterRole.checkRequesterRole, requesterController.getRefusedRequests);
webRequesterRouter.get('/requests/waiting', checkRequesterRole.checkRequesterRole, requesterController.getWaitingRequests);
webRequesterRouter.get('/requests/history', checkRequesterRole.checkRequesterRole, requesterController.getHistoryRequests);
webRequesterRouter.get('/requests/:id/to/history', checkRequesterRole.checkRequesterRole, requesterController.historyRequest);

module.exports = webRequesterRouter;