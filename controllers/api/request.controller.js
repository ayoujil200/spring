const requestService = require("../../services/request.service");
const jwt = require("jsonwebtoken");
const config = require("../../configs/auth.config");

exports.getAllRequests = async (req, res, next) => {
    try {
        let roles = [];
        const token = req.headers["authorization"];
        let tokenData = jwt.verify(token, config.secret);
        tokenData.roles.forEach(async (role) => {
            roles.push(role.name);
        });
        if (roles.includes("manager") && roles.includes("demandeur")) {
            res.status(200).json({
                success: true, data: {
                    requests: await requestService.getAllRequests()
                }
            });
        }
        else if (!roles.includes("manager") && roles.includes("demandeur")) {
            res.status(200).json({
                success: true, data: {
                    requests: await requestService.getAllRequests(tokenData.user.id)
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false
        });
    }
};

exports.getAcceptedRequests = async (req, res, next) => {
    try {
        let roles = [];
        const token = req.headers["authorization"];
        let tokenData = jwt.verify(token, config.secret);
        tokenData.roles.forEach(async (role) => {
            roles.push(role.name);
        });
        if (roles.includes("manager") && roles.includes("demandeur")) {
            res.status(200).json({
                success: true, data: {
                    requests: await requestService.getAcceptedRequests()
                }
            });
        }
        else if (!roles.includes("manager") && roles.includes("demandeur")) {
            res.status(200).json({
                success: true, data: {
                    requests: await requestService.getAcceptedRequests(tokenData.user.id)
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false
        });
    }
};

exports.getRefusedRequests = async (req, res, next) => {
    try {
        let roles = [];
        const token = req.headers["authorization"];
        let tokenData = jwt.verify(token, config.secret);
        tokenData.roles.forEach(async (role) => {
            roles.push(role.name);
        });
        if (roles.includes("manager") && roles.includes("demandeur")) {
            res.status(200).json({
                success: true, data: {
                    requests: await requestService.getRefusedRequests()
                }
            });
        }
        else if (!roles.includes("manager") && roles.includes("demandeur")) {
            res.status(200).json({
                success: true, data: {
                    requests: await requestService.getRefusedRequests(tokenData.user.id)
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false
        });
    }
};

exports.getHistoryRequests = async (req, res, next) => {
    try {
        let roles = [];
        const token = req.headers["authorization"];
        let tokenData = jwt.verify(token, config.secret);
        tokenData.roles.forEach(async (role) => {
            roles.push(role.name);
        });
        if (roles.includes("manager") && roles.includes("demandeur")) {
            res.status(200).json({
                success: true, data: {
                    requests: await requestService.getHistoryRequests()
                }
            });
        }
        else if (!roles.includes("manager") && roles.includes("demandeur")) {
            res.status(200).json({
                success: true, data: {
                    requests: await requestService.getHistoryRequests(tokenData.user.id)
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false
        });
    }
};

exports.getWaitingRequests = async (req, res, next) => {
    try {
        let roles = [];
        const token = req.headers["authorization"];
        let tokenData = jwt.verify(token, config.secret);
        tokenData.roles.forEach(async (role) => {
            roles.push(role.name);
        });
        if (roles.includes("manager") && roles.includes("demandeur")) {
            res.status(200).json({
                success: true, data: {
                    requests: await requestService.getWatingRequests()
                }
            });
        }
        else if (!roles.includes("manager") && roles.includes("demandeur")) {
            res.status(200).json({
                success: true, data: {
                    requests: await requestService.getWatingRequests(tokenData.user.id)
                }
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false
        });
    }
};

exports.getRequestById = async (req, res, next) => {
    try {
        let roles = [];
        const token = req.headers["authorization"];
        let tokenData = jwt.verify(token, config.secret);
        tokenData.roles.forEach(async (role) => {
            roles.push(role.name);
        });
        if (roles.includes("manager") && roles.includes("demandeur")) {
            res.status(200).json({
                success: true, data: {
                    request: await requestService.getOneRequestById(req.params.id)
                }
            });
        }
        else if (!roles.includes("manager") && roles.includes("demandeur")) {
            let request = await requestService.getOneRequestById(req.params.id);
            if (tokenData.user.id == request.userId) {
                res.status(200).json({
                    success: true, data: {
                        request: await requestService.getOneRequestById(req.params.id)
                    }
                });
            } else {
                res.status(401).json({
                    success: false, data: {
                        message: "action non authorisé!"
                    }
                });
            }
        }
    } catch (err) {
        console.log("erreur: " + err.message);
        res.status(500).json({
            success: false
        });
    }
};

exports.acceptRequest = async (req, res) => {
    try {
        let roles = [];
        const token = req.headers["authorization"];
        let tokenData = jwt.verify(token, config.secret);
        tokenData.roles.forEach(async (role) => {
            roles.push(role.name);
        });
        if (roles.includes("manager") && roles.includes("demandeur")) {
            let request = await requestService.getOneRequestById(req.params.id);
            if (request.status == "WAITED") {
                res.status(200).json({
                    success: await requestService.accepteRequest(req.params.id), data: {
                        message: "la demande a été bien accepté"
                    }
                });
            }
            else {
                res.status(401).json({
                    success: false, data: {
                        message: "cette demande elle peut pas passer vers l'etat que vous demandé!"
                    }
                });
            }
        }
        else if (!roles.includes("manager") && roles.includes("demandeur")) {
            let request = await requestService.getOneRequestById(req.params.id);
            if (tokenData.user.id == request.userId) {
                if (request.status == "WAITED") {
                    res.status(200).json({
                        success: await requestService.accepteRequest(req.params.id), data: {
                            message: "la demande a été bien accepté"
                        }
                    });
                }
                else {
                    res.status(401).json({
                        success: false, data: {
                            message: "cette demande elle peut pas passer vers l'etat que vous demandé!"
                        }
                    });
                }
            } else {
                res.status(401).json({
                    success: false, data: {
                        message: "action non authorisé!"
                    }
                });
            }
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false, data: {
                message: "il y'a un erreur!"
            }
        });
    }
};

exports.refuseRequest = async (req, res) => {
    try {
        let roles = [];
        const token = req.headers["authorization"];
        let tokenData = jwt.verify(token, config.secret);
        tokenData.roles.forEach(async (role) => {
            roles.push(role.name);
        });
        if (roles.includes("manager") && roles.includes("demandeur")) {
            let request = await requestService.getOneRequestById(req.params.id);
            if (request.status == "WAITED") {
                res.status(200).json({
                    success: await requestService.refuseRequest(req.params.id), data: {
                        message: "la demande a été bien refusé"
                    }
                });
            }
            else {
                res.status(401).json({
                    success: false, data: {
                        message: "cette demande elle peut pas passer vers l'etat que vous demandé!"
                    }
                });
            }
        }
        else if (!roles.includes("manager") && roles.includes("demandeur")) {
            let request = await requestService.getOneRequestById(req.params.id);
            if (tokenData.user.id == request.userId) {
                if (request.status == "WAITED") {
                    res.status(200).json({
                        success: await requestService.refuseRequest(req.params.id), data: {
                            message: "la demande a été bien refusé"
                        }
                    });
                }
                else {
                    res.status(401).json({
                        success: false, data: {
                            message: "cette demande elle peut pas passer vers l'etat que vous demandé!"
                        }
                    });
                }
            } else {
                res.status(401).json({
                    success: false, data: {
                        message: "action non authorisé!"
                    }
                });
            }
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false, data: {
                message: "il y'a un erreur!"
            }
        });
    }
};

exports.historyRequest = async (req, res) => {
    try {
        let roles = [];
        const token = req.headers["authorization"];
        let tokenData = jwt.verify(token, config.secret);
        tokenData.roles.forEach(async (role) => {
            roles.push(role.name);
        });
        if (roles.includes("manager") && roles.includes("demandeur")) {
            let request = await requestService.getOneRequestById(req.params.id);
            if (request.status == "ACCEPTED" || request.status == "REFUSED") {
                res.status(200).json({
                    success: await requestService.historyRequest(req.params.id), data: {
                        message: "la demande a été bien historisé"
                    }
                });
            }
            else {
                res.status(401).json({
                    success: false, data: {
                        message: "cette demande elle peut pas passer vers l'etat que vous demandé!"
                    }
                });
            }
        }
        else if (!roles.includes("manager") && roles.includes("demandeur")) {
            let request = await requestService.getOneRequestById(req.params.id);
            if (tokenData.user.id == request.userId) {
                if (request.status == "ACCEPTED" || request.status == "REFUSED") {
                    res.status(200).json({
                        success: await requestService.historyRequest(req.params.id), data: {
                            message: "la demande a été bien historisé"
                        }
                    });
                }
                else {
                    res.status(401).json({
                        success: false, data: {
                            message: "cette demande elle peut pas passer vers l'etat que vous demandé!"
                        }
                    });
                }
            } else {
                res.status(401).json({
                    success: false, data: {
                        message: "action non authorisé!"
                    }
                });
            }
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            success: false, data: {
                message: "il y'a un erreur!"
            }
        });
    }
};

exports.updateRequest = async (req, res) => {
    try {
        if (req.query.request == null) {
            res.status(401).json({
                message: "request not found"
            });
        }

        res.status(200).json({
            success: true, data: {
                request: await requestService.updateRequest(req.query.request)
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.addRequest = async (req, res, next) => {
    try {
        const request = req.body.request;
        let roles = [];
        const token = req.headers["authorization"];
        let tokenData = jwt.verify(token, config.secret);
        tokenData.roles.forEach(async (role) => {
            roles.push(role.name);
        });
        
        if (roles.includes("manager") && roles.includes("demandeur")) {
            if (request.reason && request.destination_city && request.transport && request.start_date && request.end_date && request.total_fees && request.userId) {
                res.status(201).json({
                    success: true, data: {
                        request: await requestService.addRequest(request),
                        message: "le demande a été crée avec succés"
                    }
                });
            }
            else {
                res.status(500).json({
                    success: false, data: {
                        request: null,
                        message: "les champs suivants doivent remplis! (reason, destination_city, transport, start_date, end_date, total_fees, userId)"
                    }
                });
            }
        }
        else if (!roles.includes("manager") && roles.includes("demandeur")) {
            if (request.reason && request.destination_city && request.transport && request.start_date && request.end_date && request.total_fees && request.userId) {
                res.status(201).json({
                    success: true, data: {
                        request: await requestService.addRequest(request),
                        message: "le demande a été crée avec succés"
                    }
                });
            }
            else {
                res.status(500).json({
                    success: false, data: {
                        request: null,
                        message: "les champs suivants doivent remplis! (reason, destination_city, transport, start_date, end_date, total_fees, userId)"
                    }
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false
        });
    }
};