const db = require("../models/index.model");
const User = db.user;
const Role = db.role;
const bcrypt = require("bcryptjs");

exports.getAllUsers = () => {
    return User.findAll({
        include: [Role]
    });
};

exports.getUserById = (id) => {
    return User.findByPk(id);
};

exports.getUserByEmail = (userEmail) => {
    return User.findOne({ where: { email: userEmail } });
};

exports.addUser = (user) => {
    return User.create(user);
};

exports.updateUser = (user, userId, isPassword) => {
    if (isPassword) {
        return User.update({
            first_name: user.first_name,
            last_name: user.last_name,
            password: bcrypt.hashSync(user.password, 8)
        }, { where: { id: userId } });
    } else {
        return User.update({
            first_name: user.first_name,
            last_name: user.last_name
        }, { where: { id: userId } });
    }
};

exports.updateUserImage = (userId, newImage) => {
    return User.update({
        image: newImage
    }, { where: { id: userId } });
};

exports.enableUser = (idU) => {
    return User.update({ status: 'ENABLED' }, { where: { id: idU } })
};

exports.disableUser = (idU) => {
    return User.update({ status: 'DISABLED' }, { where: { id: idU } })
};
