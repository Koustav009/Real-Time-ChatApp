const UserModel = require("../models/userModel");
const { getFile } = require("../helper/getFile");

const getusercredential = async (req, res) => {
    const phone = req.user.phone;
    try {
        const responce = await UserModel.findOne({ phone }).select(
            "-_id -contactList -password -status -lastActive -groupList"
        );
        if (!responce) {
            return res.status(404).send("user not found");
        }
        res.status(201).json({
            profile: getFile(responce.profile),
            credential: {
                name: responce.name,
                phone: responce.phone,
                gmail: responce.gmail,
                about: responce.about,
            },
        });
    } catch (error) {
        res.status(404).send("error");
    }
};

module.exports = getusercredential;
