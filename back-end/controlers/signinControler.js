const UserModel = require("../models/userModel");
const path = require("path");

const profilesPath = path.join(__dirname, "../profiles/");
const signinControler = async (req, res) => {
    const { profilePhoto } = req.files;
    const { name, phone, password, gmail } = req.body;
    const profileString = Date.now() + "-" + profilePhoto.name;

    try {
        const isUserAvalable = await UserModel.findOne({ phone });
        if (!isUserAvalable) {
            profilePhoto.mv(path.join(profilesPath, profileString));
            const user = UserModel({
                name,
                phone,
                gmail,
                password,
                profile: profileString,
            });
            const responce = await user.save();
            res.json(responce);
        } else {
            res.status(500).send("Number already used");
        }
    } catch (error) {
        res.status(500).send("error");
    }
};

module.exports = signinControler;
