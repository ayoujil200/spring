const db = require("../../models/index.model");
const User = db.user;
var bcrypt = require("bcryptjs");

exports.getRegisterView = (req, res, next) => {
    res.render("auth/register");
};

exports.register = (req, res, next) => {
    const _first_name = req.body.first_name;
    const _last_name = req.body.last_name;
    const _username = req.body.username;
    const _email = req.body.email;
    const _password = req.body.password;

    if (!_first_name || !_last_name || !_username || !_email || !_password) {
        req.flash("warningMessage", "svp, tous les champs sont obligatoires!");
        res.redirect('back');
    }
    else {
        User.create({
            first_name: _first_name,
            last_name: _last_name,
            username: _username,
            email: _email,
            password: bcrypt.hashSync(_password, 8)
        }).then(user => {
            // user role = 2 (demandeur le role par defaut)
            user.setRoles([2]).then(() => {
                req.flash("successMessage", "accéder au votre compte :)");
                res.redirect('/login');
            });
        })
            .catch(err => {
                req.flash("dangerMessage", "erreur!");
                res.redirect('back');
            });
    }
};