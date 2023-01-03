const userService = require("../services/user.service");

exports.getUsers = async () => {
    return await userService.getAllUsers();
};

exports.enableUser = async (idU) => {
    return await userService.enableUser(idU);
};

exports.disableUser = async (idU) => {
    return await userService.disableUser(idU);
};

exports.editProfile = async (user, userId, isPassword) => {
    return await userService.updateUser(user, userId, isPassword);
};

exports.updateUserImage = async (userId, newImage) => {
    return await userService.updateUserImage(userId, newImage);
};