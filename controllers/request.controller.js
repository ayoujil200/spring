const requestService = require("../services/request.service");

exports.getAcceptedRequests = (idU = 0) => {
    return requestService.getAcceptedRequests(idU);
};

exports.getRefusedRequests = (idU = 0) => {
    return requestService.getRefusedRequests(idU);
};

exports.getWatingRequests = (idU = 0) => {
    return requestService.getWatingRequests(idU);
};

exports.getHistoryRequests = (idU = 0) => {
    return requestService.getHistoryRequests(idU);
};

exports.getRequestById = async (id, status, idU = 0) => {
    return requestService.getRequestById(id, status, idU);
};

exports.getOneRequestById = (id) => {
    return requestService.getOneRequestById(id);
};

exports.addRequest = (request, idU = 0) => {
    if (idU != 0) {
        return requestService.addRequest(request, idU);
    } else {
        return requestService.addRequest(request);
    }
};

exports.updateRequest = (request) => {
    return Request.update({
        reason: request.reason,
        transport: request.transport,
        start_date: request.start_date,
        end_date: request.end_date,
        destination_city: request.destination_city,
        total_fees: request.total_fees,
        status: request.status,
    }, { where: { id: request.id } });
};

exports.accepteRequest = (idR, idU = 0) => {
    return requestService.accepteRequest(idR, idU);
};

exports.refuseRequest = (idR, idU = 0) => {
    return requestService.refuseRequest(idR, idU);
};

exports.historyRequest = (idR, idU = 0) => {
    return requestService.historyRequest(idR, idU);
};