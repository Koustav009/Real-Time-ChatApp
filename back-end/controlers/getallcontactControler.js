const UserModel = require("../models/userModel");
const { getFile } = require("../helper/getFile");

const getallcontactControler = async (req, res, err) => {
    const { page, limit } = req.query;
    try {
        const responce = await UserModel.findOne({
            phone: req.user.phone,
        })
            .select("contactList -_id")
            .populate({
                path: "contactList",
                select: "-password -contactList -groupList -_id",
            });
        const startingRange = (page - 1) * limit;
        const endingRange = Math.min(page * limit, responce.contactList.length);

        const users = responce.contactList.slice(startingRange, endingRange);

        const result = users.map((item) => {
            const { name, phone, gmail, profile, status, lastActive, about} = item;
            const obj = {
                name,
                phone,
                gmail,
                profile: getFile(profile),
                status,
                about,
                lastActive,
            };
            return obj;
        });

        res.json(result);
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = getallcontactControler;
