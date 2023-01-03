exports.checkManagerSessionRole = async (req, res, next) => {
    if (!req.session.loggedin || !req.session.user || req.session.roles.length != 2) {
        console.log("hohoho");
        res.redirect('/login');
    }

    next();
};