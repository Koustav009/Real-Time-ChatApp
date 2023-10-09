const UserModel = require("../models/userModel");

const addContact = async (req, res) => {
    const userNumber = req.user.phone;
    const { receiverNumber } = req.body;
    if (userNumber === receiverNumber) {
        return res.status(409).send("you can't add");
    }
    try {
        const receiverUser = await UserModel.findOne({
            phone: receiverNumber,
        });
        if (!receiverUser) throw new Error();
        const senderUser = await UserModel.findOne({
            phone: userNumber,
        }).populate({
            path: "contactList",
            select: "-_id phone",
        });
        const allContacts = senderUser.contactList.map(
            (contact) => contact.phone
        );
        const isAlreadyInContact = allContacts.find((value) => {
            return value == receiverNumber;
        });
        if (!isAlreadyInContact) {
            const senderUser = await UserModel.findOne({
                phone: userNumber,
            });
            senderUser.contactList.push(receiverUser._id);
            await senderUser.save();
            return res.status(200).send("contact added successfull");
        } else {
            return res.status(409).send("all already exists");
        }
    } catch (error) {
        return res.status(404).send("not found");
    }
};

module.exports = addContact;
