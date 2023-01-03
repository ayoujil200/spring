const userService = require("../../services/user.service");
var bcrypt = require("bcryptjs");

exports.getLoginView = async (req, res) => {
    res.render('auth/login');
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        req.flash("warningMessage", "svp, tous les champs sont obligatoires!");
        res.redirect('back');
    }
    else {
        const user = await userService.getUserByEmail(req.body.email);
        if (user) {
            const password_valid = await bcrypt.compare(req.body.password, user.password);
            if (password_valid) {
                if (user.status === "ENABLED") {
                    req.session.loggedin = true;
                    req.session.user = user;
                    req.session.roles = await user.getRoles();

                    if (req.session.roles.length == 2)
                        res.redirect('/manager/home/requests/waiting');
                    else if (req.session.roles.length == 1)
                        res.redirect('/requester/home/requests/waiting');
                }
                else {
                    req.flash("warningMessage", "Votre compte a été bloqué! contacter l'administrateur.");
                    res.redirect('back');
                }
            } else {
                req.flash("warningMessage", "svp, votre le mot de passe et incorrect!");
                res.redirect('back');
            }

        } else {
            req.flash("warningMessage", "svp, cet utilisateur n'existe pas!");
            res.redirect('back');
        }
    }
};