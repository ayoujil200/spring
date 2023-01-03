const db = require("../../../models/index.model");
const config = require("../../../configs/auth.config");
const User = db.user;
const fs = require('fs');
const FILE_LOCATION = __dirname + "../../../../public/invalidJWTs/invalidJWTs.txt";
var bcrypt = require("bcryptjs");

exports.logout = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    success: false, data: {
                        message: "l'utilisateur n'existe pas!"
                    }
                });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    success: false, data: {
                        message: "le mot de passe est invalid!"
                    }
                });
            }

            const token = req.headers["authorization"];

            if (!token) {
                response.status(403).send({
                    success: false, data: {
                        message: "le token n'existe pas!"
                    }
                });
            }

            //ajouter le token dans la blacklist si il n'existe pas avant
            if (!isTokenExistInDB(token)) {
                if (!addTokenToDBOfInvalidateTokens(token))
                    res.status(500).send({
                        success: false, data: {
                            message: "il y a une erreur!!"
                        }
                    });
            }

            res.status(200).send({
                success: true, data: {
                    message: "vous etes deconnecté!"
                }
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false, data: {
                    message: "il y a une erreur!!"
                }
            });
        });
};

function addTokenToDBOfInvalidateTokens(token) {
    try {
        fs.appendFileSync(FILE_LOCATION, token + "\n");
        return true;
    } catch (error) {
        return false;
    }
}

function isTokenExistInDB(token) {
    let file = fs.readFileSync(FILE_LOCATION, "utf8");
    let arr = file.split('\n');
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === token)
            return true;
    }

    return false;
}