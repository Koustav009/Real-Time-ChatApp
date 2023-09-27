const UserModel = require("../models/userModel");

const addContact = async (req, res) => {
    const { senderPhone, receiverPhone } = req.body;
    try {
        const receiverUserId = await UserModel.findOne({
            phone: receiverPhone,
        }).select("_id");

        if (receiverUserId) {
            const senderUser = await UserModel.findOne({
                phone: senderPhone,
            });
            
            senderUser.contactList.push(receiverUserId);
            const responce = await senderUser.save();
            res.status(200).send("contact added successfull");
        }
    } catch (error) {
        console.log(error);
        res.status(204).send("Error in adding");
    }
};

module.exports = addContact;
