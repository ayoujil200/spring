const userController = require("../controllers/user.controller");
const requestController = require("../controllers/request.controller");
const Pusher = require("pusher");
const fs = require('fs');
const FILE_LOCATION = __dirname + "../../public/img/users/";
const pusher = new Pusher({
    appId: "1526658",
    key: "24ee4bb0fa386b1aa173",
    secret: "67f064cc99efe7afcf90",
    cluster: "ap2",
    useTLS: true
});

exports.getUsers = async (req, res, next) => {
    var users = await userController.getUsers();
    var usersArray = [];
    users.forEach(function (user) {
        console.log(user.getRoles().length);
        if (user.getRoles().length == 1)
            usersArray.push(user);
    });
    res.render("manager/list_users", { "users": usersArray });
};

exports.getRequestById = async (req, res, next) => {
    let g = await requestController.getRequestById(parseInt(req.body.q), req.body.type);
    res.render("manager/list_requests", { "status": req.body.type, "requests": g });
};

exports.enableUser = async (req, res, next) => {
    if (userController.enableUser(req.params.id)) {
        req.flash("successMessage", "l'utilisateur est déblouqé!");
        res.redirect('back');
    }
    else {
        req.flash("dangerMessage", "il y'a une erreur!");
        res.redirect('back');
    }
};

exports.disableUser = async (req, res, next) => {
    if (userController.disableUser(req.params.id)) {
        req.flash("warningMessage", "l'utilisateur est blouqé!");
        res.redirect('back');
    }
    else {
        req.flash("dangerMessage", "il y'a une erreur!");
        res.redirect('back');
    }
};

exports.getViewProfile = async (req, res, next) => {

};

const generateRandomString = (myLength) => {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};

exports.editProfile = async (req, res, next) => {
    if (req.files) {
        const { image } = req.files;
        imageName = req.session.user.id + "_" + generateRandomString(10) + "_" + image.name;
        image.mv(FILE_LOCATION + imageName);
        if (req.session.user.image != "default.png") {
            if (fs.existsSync(FILE_LOCATION + req.session.user.image))
                fs.unlinkSync(FILE_LOCATION + req.session.user.image)
        }
        userController.updateUserImage(req.session.user.id, imageName);
        req.session.user.image = imageName;
        req.session.save();
    }
    if (req.body.first_name && req.body.last_name && req.body.password) {
        let newUser = { first_name: req.body.first_name, last_name: req.body.last_name, password: req.body.password };
        if (userController.editProfile(newUser, req.session.user.id, true)) {
            req.session.user.first_name = newUser.first_name;
            req.session.user.last_name = newUser.last_name;
            req.session.save();
            req.flash("successMessage", "votre profile bien modifié!");
            req.flash("status", "WAITED");
            res.redirect('/manager/home/requests/accepted');
        } else {
            req.flash("warningMessage", "Il y'a une erreur!");
            req.flash("status", "WAITED");
            res.redirect('/manager/home/requests/accepted');
        }
    }
    else if (req.body.first_name && req.body.last_name && !req.body.password) {
        let newUser = { first_name: req.body.first_name, last_name: req.body.last_name };
        if (userController.editProfile(newUser, req.session.user.id, false)) {
            req.session.user.first_name = newUser.first_name;
            req.session.user.last_name = newUser.last_name;
            req.session.save();
            req.flash("successMessage", "Votre profile bien modifié!");
            req.flash("status", "WAITED");
            res.redirect('/manager/home/requests/accepted');
        } else {
            req.flash("warningMessage", "Il y'a une erreur!");
            req.flash("status", "WAITED");
            res.redirect('/manager/home/requests/accepted');
        }
    }
    else if (req.body.first_name || req.body.last_name) {
        req.flash("warningMessage", "Svp, les champs suivants nom, prenom sont obligatoires!");
        req.flash("status", "WAITED");
        res.redirect('/manager/home/requests/accepted');
    }
};

exports.getAcceptedRequests = async (req, res, next) => {
    res.render("manager/list_requests", { "status": "ACCEPTED", "requests": await requestController.getAcceptedRequests() });
};

exports.getRefusedRequests = async (req, res, next) => {
    res.render("manager/list_requests", { "status": "REFUSED", "requests": await requestController.getRefusedRequests() });
};

exports.getWaitingRequests = async (req, res, next) => {
    res.render("manager/list_requests", { "status": "WAITED", "requests": await requestController.getWatingRequests() });
};

exports.getHistoryRequests = async (req, res, next) => {
    res.render("manager/list_requests", { "status": "HISTORED", "requests": await requestController.getHistoryRequests() });
};

exports.accepteRequest = async (req, res, next) => {
    let request = await requestController.getOneRequestById(req.params.id);
    requestController.accepteRequest(req.params.id);
    const userChannel = "userChannel";
    const userEvent = "userEvent_" + request.userId;
    pusher.trigger(userChannel, userEvent, {
        message: "votre demande a été accepté par le manager!"
    });
    req.flash("successMessage", "La demande bien accepté :)");
    req.flash("status", "WAITED");
    res.redirect('/manager/home/requests/accepted');
};

exports.refuseRequest = async (req, res, next) => {
    const request = await requestController.getOneRequestById(req.body.id);
    requestController.refuseRequest(req.body.id);
    console.log("id: " + req.body.id);
    console.log("explication: " + req.body.explication);
    pusher.trigger("userChannel", "userEvent_" + request.userId, {
        message: "votre demande a été refusé par le manager! (<b>pourquoi?: " + req.body.explication + ")</b>"
    });
    req.flash("warningMessage", "La demande bien refusé :(");
    req.flash("status", "WAITED");
    res.redirect('/manager/home/requests/refused');
};

exports.historyRequest = async (req, res, next) => {
    requestController.historyRequest(req.params.id);
    req.flash("successMessage", "La demande bien historisé :)");
    req.flash("status", "ACCEPTED");
    res.redirect('/manager/home/requests/history');
};