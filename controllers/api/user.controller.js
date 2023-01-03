const userService = require("../../services/user.service");
const jwt = require("jsonwebtoken");
const config = require("../../configs/auth.config");

exports.getAllUsers = async (req, res, next) => {
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
                    users: await userService.getAllUsers()
                }
            });
        }
        else {
            res.status(401).json({
                success: false, data: {
                    message: "action non authorisé!"
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
};

exports.getUserById = async (req, res, next) => {
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
                    user: await userService.getUserById(req.params.id)
                }
            });
        }
        else {
            res.status(401).json({
                success: false, data: {
                    message: "action non authorisé!"
                }
            });
        }
    } catch (err) {
        console.log("erreur: " + err.message);
        res.status(500).json({
            success: false, data: {
                message: "il y'a une erreur!"
            }
        });
    }
};

exports.enableUser = async (req, res) => {
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
                    user: await userService.enableUser(req.params.id)
                }
            });
        }
        else {
            res.status(401).json({
                success: false, data: {
                    message: "action non authorisé!"
                }
            });
        }
    } catch (err) {
        console.log("erreur: " + err.message);
        res.status(500).json({
            success: false, data: {
                message: "il y'a une erreur!"
            }
        });
    }
};

exports.disableUser = async (req, res) => {
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
                    user: await userService.disableUser(req.params.id)
                }
            });
        }
        else {
            res.status(401).json({
                success: false, data: {
                    message: "action non authorisé!"
                }
            });
        }
    } catch (err) {
        console.log("erreur: " + err.message);
        res.status(500).json({
            success: false, data: {
                message: "il y'a une erreur!"
            }
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        if (req.query.user == null || getUserById(req.query.user.id) == null) {
            res.status(401).json({
                message: "utilisateur non trouvé!"
            });
        }

        res.status(200).json({
            success: true, data: {
                user: await userService.updateUser(req.query.user)
            }
        });
    } catch (err) {
        console.log("erreur: " + err.message);
        res.status(500).json({
            success: false, data: {
                message: "il y'a une erreur!"
            }
        });
    }
};

