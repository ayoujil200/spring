const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");
const db = require("../models");
const User = db.user;
const FILE_LOCATION = __dirname + "../../../../public/invalidJWTs/invalidJWTs.txt";

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "le token n'existe pas!"
    });
  }

  if (isTokenExistInDB(token)) {
    return res.status(401).send({
      message: "le token est invalide!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "non authorisé!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isManager = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "manager") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "le role manager est obligatoire!"
      });
      return;
    });
  });
};

isDemandeur = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "demandeur") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "le role demandeur est obligatoire!"
      });
    });
  });
};

isDemandeurOrManager = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "demandeur") {
          next();
          return;
        }

        if (roles[i].name === "manager") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "le role manager ou demandeur est obligatoire!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isManager: isManager,
  isDemandeur: isDemandeur,
  isDemandeurOrManager: isDemandeurOrManager
};
module.exports = authJwt;

function isTokenExistInDB(token) {
  fs.readFile(FILE_LOCATION, function (err, data) {
    if (err) throw err;
    if (data.toString().indexOf(token) >= 0)
      return true;
    return false;
  });
}