const db = require("../../../models/index.model");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    if (req.body.first_name && req.body.last_name && req.body.username && req.body.email && req.body.password) {
        User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })
            .then(user => {
                user.setRoles([2]).then(() => {
                    res.status(201).send({
                        success: true, data: {
                            message: "User was registered successfully!"
                        }
                    });
                });
            })
            .catch(err => {
                res.status(500).send({
                    success: false, data: {
                        message: err.errors[0].message
                    }
                });
            });
    }
    else {
        res.status(500).send({
            success: false, data: {
                message: "tous les champs sont obligatoires!"
            }
        });
    }
};