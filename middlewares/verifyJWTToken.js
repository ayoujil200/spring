const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const fs = require("fs");
const FILE_LOCATION = __dirname + "../../public/invalidJWTs/invalidJWTs.txt";

exports.verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).send({
            success: true, data: {
                message: "le token n'existe pas!"
            }
        });
    }

    if (isTokenExistInDB(token)) {
        return res.status(401).send({
            success: true, data: {
                message: "le token est invalide!"
            }
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                success: true, data: {
                    message: "non authorisé!"
                }
            });
        }
        next();
    });
};

function isTokenExistInDB(token) {
    fs.readFile(FILE_LOCATION, function (err, data) {
        if (err) throw err;
        if (data.toString().indexOf(token) >= 0)
            return true;
        return false;
    });
}