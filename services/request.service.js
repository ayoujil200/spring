const db = require("../models/index.model");
const { Op } = require("sequelize");
const Request = db.request;
const User = db.user;

exports.getAllRequests = (idU = 0) => {
    if (idU != 0) {
        return Request.findAll({
            where: { userId: idU }, include: [
                {
                    model: User, as: "user"
                }
            ]
        });
    }
    else {
        return Request.findAll({
            include: [
                {
                    model: User, as: "user"
                }
            ]
        });
    }
};

exports.getAcceptedRequests = (idU = 0) => {
    if (idU != 0) {
        return Request.findAll({
            where: { userId: idU, status: "ACCEPTED" }, include: [
                {
                    model: User, as: "user"
                }
            ]
        });
    }
    else {
        return Request.findAll({
            where: { status: "ACCEPTED" }, include: [
                {
                    model: User, as: "user"
                }
            ]
        });
    }
};

exports.getRefusedRequests = (idU = 0) => {
    if (idU != 0) {
        return Request.findAll({
            where: { userId: idU, status: "REFUSED" }, include: [
                {
                    model: User, as: "user"
                }
            ]
        });
    }
    else {
        return Request.findAll({
            where: { status: "REFUSED" }, include: [
                {
                    model: User, as: "user"
                }
            ]
        });
    }
};

exports.getWatingRequests = (idU = 0) => {
    if (idU != 0) {
        return Request.findAll({
            where: { userId: idU, status: "WAITED" }, include: [
                {
                    model: User, as: "user"
                }
            ]
        });
    }
    else {
        return Request.findAll({
            where: { status: "WAITED" }, include: [
                {
                    model: User, as: "user"
                }
            ]
        });
    }
};

exports.getHistoryRequests = (idU = 0) => {
    if (idU != 0) {
        return Request.findAll({
            where: { userId: idU, status: "HISTORED" }, include: [
                {
                    model: User, as: "user"
                }
            ]
        });
    }
    else {
        return Request.findAll({
            where: { status: "HISTORED" }, include: [
                {
                    model: User, as: "user"
                }
            ]
        });
    }
};

exports.getOneRequestById = (idR) => {
    return Request.findOne({
        where: { id: idR }, include: [
            {
                model: User, as: "user"
            }
        ]
    });
};

exports.getRequestById = (idR, statusR, idU = 0) => {
    if (idU != 0) {
        return Request.findAll({
            where: { id: idR, userId: idU, status: statusR }, include: [
                {
                    model: User, as: "user"
                }
            ]
        });
    }
    else {
        return Request.findAll({
            where: { id: idR, status: statusR }, include: [
                {
                    model: User, as: "user"
                }
            ]
        });
    }
};

exports.addRequest = (request, idU = 0) => {
    if (idU != 0) {
        request.userId = idU;
        return Request.create(request);
    } else {
        return Request.create(request);
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
    if (idU != 0) {
        return Request.update({ status: 'ACCEPTED' }, { where: { id: idR, userId: idU } });
    }
    else {
        return Request.update({ status: 'ACCEPTED' }, { where: { id: idR } });
    }
};

exports.refuseRequest = (idR, idU = 0) => {
    if (idU != 0) {
        return Request.update({ status: 'REFUSED' }, { where: { id: idR, userId: idU } });
    }
    else {
        return Request.update({ status: 'REFUSED' }, { where: { id: idR } });
    }
};

exports.historyRequest = (idR, idU = 0) => {
    if (idU != 0) {
        return Request.update({ status: 'HISTORED' }, { where: { id: idR, userId: idU } });
    }
    else {
        return Request.update({ status: 'HISTORED' }, { where: { id: idR } });
    }
};