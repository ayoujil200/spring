exports.checkRequesterRole = async (req, res, next) => {
    if (!req.session.loggedin || !req.session.user || req.session.roles.length != 1) {
        res.redirect('/login');
    }

    next();
};