const userController = require("../controllers/user.controller");
const requestController = require("../controllers/request.controller");
const FILE_LOCATION = __dirname + "../../public/img/users/";
const Pusher = require("pusher");
const pusher = new Pusher({
    appId: "1526658",
    key: "24ee4bb0fa386b1aa173",
    secret: "67f064cc99efe7afcf90",
    cluster: "ap2",
    useTLS: true
});

exports.getAcceptedRequests = async (req, res, next) => {
    res.render("requester/list_requests", { "status": "ACCEPTED", "requests": await requestController.getAcceptedRequests(req.session.user.id) });
};

exports.getRefusedRequests = async (req, res, next) => {
    res.render("requester/list_requests", { "status": "REFUSED", "requests": await requestController.getRefusedRequests(req.session.user.id) });
};

exports.getWaitingRequests = async (req, res, next) => {
    res.render("requester/list_requests", { "status": "WAITED", "requests": await requestController.getWatingRequests(req.session.user.id) });
};

exports.getHistoryRequests = async (req, res, next) => {
    res.render("requester/list_requests", { "status": "HISTORED", "requests": await requestController.getHistoryRequests(req.session.user.id) });
};

exports.historyRequest = async (req, res, next) => {
    requestController.historyRequest(req.params.id, req.session.user.id);
    req.flash("successMessage", "La demande bien historisé :)");
    req.flash("status", "ACCEPTED");
    res.redirect('/requester/home/requests/history');
};

exports.getRequestById = async (req, res, next) => {
    let g = await requestController.getRequestById(parseInt(req.body.q), req.body.type, req.session.user.id);
    res.render("requester/list_requests", { "status": req.body.type, "requests": g });
};

exports.addRequest = async (req, res, next) => {
    if (req.body.reason && req.body.destination_city && req.body.transport && req.body.start_date && req.body.end_date && req.body.total_fees) {
        var request = { reason: req.body.reason, destination_city: req.body.destination_city, transport: req.body.transport, start_date: req.body.start_date, end_date: req.body.end_date, total_fees: req.body.total_fees };
        let returnedReq = requestController.addRequest(request, req.session.user.id);
        if (returnedReq != null) {
            pusher.trigger("c1", "v1", {
                message: "une nouvelle demande a été recue!"
            });
            req.flash("successMessage", "La demande bien envoyé :)");
            req.flash("status", "WAITED");
            res.redirect('/requester/home/requests/accepted');
        } else {
            req.flash("warningMessage", "il y'a une erreur!");
            req.flash("status", "WAITED");
            res.redirect('/requester/home/requests/accepted');
        }
    }
    else {
        req.flash("warningMessage", "Svp, tous les champs sont obligatoires!");
        req.flash("status", "WAITED");
        res.redirect('/requester/home/requests/accepted');
    }
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
            res.redirect('/requester/home/requests/accepted');
        } else {
            req.flash("warningMessage", "Il y'a une erreur!");
            req.flash("status", "WAITED");
            res.redirect('/requester/home/requests/accepted');
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
            res.redirect('/requester/home/requests/accepted');
        } else {
            req.flash("warningMessage", "Il y'a une erreur!");
            req.flash("status", "WAITED");
            res.redirect('/requester/home/requests/accepted');
        }
    }
    else if (req.body.first_name || req.body.last_name) {
        req.flash("warningMessage", "Svp, les champs suivants nom, prenom sont obligatoires!");
        req.flash("status", "WAITED");
        res.redirect('/requester/home/requests/accepted');
    }
};