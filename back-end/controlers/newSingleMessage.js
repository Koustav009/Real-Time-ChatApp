const messageModel = require("../models/messageModel");
const UserModel = require("../models/userModel");
const conversationModel = require("../models/conversationModel");

const newSingleMessage = async (req, res) => {
    try {
        const { selectedUserPhone, message } = req.query;
        const selectedContactUser = await UserModel.findOne({
            phone: selectedUserPhone,
        });

        const conversation = await conversationModel
            .findOne({
                participants: {
                    $all: [req.user.id, selectedContactUser._id],
                },
            })
            .where("isGroupChat")
            .equals(false);

        console.log(conversation);
        if (!conversation) throw new Error("can't send message");

        const messageDoc = new messageModel({
            conversationId: conversation._id,
            senderId: req.user.id,
            messageContent: message.trim(),
        });

        const responce = await messageDoc.save();
        console.log(responce);
        res.send(responce);

    } catch (error) {
        console.log(error);
        res.status(204).send(error.message);
    }
};

module.exports = newSingleMessage;
