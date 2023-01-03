const db = require("../../../models/index.model");
const config = require("../../../configs/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(async user => {
            if (!user) {
                return res.status(404).send({
                    success: false, data: {
                        message: "L'utilisateur n'existe pas!"
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
                        accessToken: null,
                        message: "Mot de passe incorrect!"
                    }
                });
            }

            if (user.status != "ENABLED") {
                return res.status(401).send({
                    success: false, data: {
                        message: "L'utilisateur a été bloqué!"
                    }
                });
            }

            var token = jwt.sign({ user: user, roles: await user.getRoles() }, config.secret, {
                expiresIn: 21600 // token valid for 6 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    success: true, data: {
                        message: "le token bien signé!",
                        accessToken: token
                    }
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                success: false, data: {
                    message: "il y'a un erreur!",
                    accessToken: null
                }
            });
        });
};