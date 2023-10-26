const UserModel = require("../models/userModel");
const getFile = require("../helper/getFile");

const searchControler = async (req, res) => {
    const { phone } = req.query;
    try {
        const responce = await UserModel.findOne({ phone });
        if(responce){
            const { name, phone, gmail, profile, status, lastActive } = responce;
            const obj = {
                name,
                phone,
                gmail,
                profile: getFile(profile),
                status,
                lastActive,
            };
            res.status(201).json(obj);
        }
        else{
            throw new Error("not found");
        }
    } catch (error) {
        return res.status(404).send("not found");
    }
};

module.exports = searchControler;
