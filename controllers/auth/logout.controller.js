exports.logout = async (req, res, next) => {
    res.locals.loggedin = false;
    res.locals.user = null;
    res.locals.roles = null;
    req.session.destroy();
    res.redirect('/login');
};