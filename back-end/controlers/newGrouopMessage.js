const conversationModel = require("../models/conversationModel");
const messageModel = require("../models/messageModel");
const groupModel = require("../models/groupModel");

const newGrouopMessage = async (req, res) => {
    const { selectedGroupId, message } = req.query;
    try {
        const group = await groupModel.findOne({_id: selectedGroupId});
        const messageDoc = new messageModel({
            conversationId: group.conversasionId,
            messageContent: message,
            senderId: req.user.id,
        });
        const responce = await messageDoc.save();
        res.status(201).send(responce);
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
};

module.exports = newGrouopMessage;
