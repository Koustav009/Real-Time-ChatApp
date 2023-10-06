const UserModel = require("../models/userModel");
const fs = require("fs");
const path = require("path");

const allContact = async (req, res) => {
    const { phone } = req.query;
    const profilePhotoPath =  path.join(process.cwd(), "/profiles");
    try {
        const responce = await UserModel.findOne({ phone })
            .select("-_id -contactList -password -status -lastActive")
            .populate({
                path: "contactList",
                select: "-_id -contactList -password",
            });
            // console.log(responce);
            // const profilePhotoName = responce.
            

        res.status(201).json(responce);
    } catch (error) {
        console.log(error);
        res.status(404).send("error");
    }
};


module.exports = allContact;