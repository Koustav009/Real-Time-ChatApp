const UserModel = require("../models/userModel");
const fs = require("fs");
const path = require("path");

const getusercredential = async (req, res) => {
    const phone = req.user.phone;
    const profilePhotoPath = path.join(process.cwd(), "/profiles");
    try {
        const responce = await UserModel.findOne({ phone }).select(
            "-_id -contactList -password -status -lastActive -groupList"
        );

        console.log(responce);
        // sending profile photo
        const file_path = path.join(process.cwd(), "profiles");
        const profile = fs.readFileSync(path.join(file_path, responce.profile));
        res.status(201).json({
            profile,
            credential: {
                name: responce.name,
                phone: responce.phone,
                gmail: responce.gmail,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(404).send("error");
    }
};

module.exports = getusercredential;
