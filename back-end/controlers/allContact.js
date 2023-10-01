const UserModel = require("../models/userModel");

const allContact = async (req, res) => {
    const { phone } = req.query;
    try {
        const responce = await UserModel.findOne({ phone })
            .select("-_id -contactList -password")
            .populate({
                path: "contactList",
                select: "-_id -contactList -password",
            });
        res.status(201).json(responce);
    } catch (error) {
        console.log(error);
        res.status(404).send("error");
    }
};


module.exports = allContact;