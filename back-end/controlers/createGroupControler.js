const ObjectId = require("mongoose").Types.ObjectId;
const UserModel = require("../models/userModel");
const ConversationModel = require("../models/conversationModel");
const GroupModel = require("../models/groupModel");

const createGroupControler = async (req, res) => {
    try {
        const { groupName, numbers } = req.body;
        const participants = [];

        // getting all the participants _id
        const ownUser = await UserModel.findOne({ _id: req.user.id }).select(
            "groupList"
        );
        participants.push(ownUser);

        for (let i = 0; i < numbers.length; i++) {
            const user = await UserModel.findOne({ phone: numbers[i] }).select("groupList");
            participants.push(user);
        }

        const participantsPhone = participants.map(
            (participant) => participant._id
        );
        participantsPhone.push(req.user._id);

        // creating the Conversation Model
        const newConversationModel = new ConversationModel({
            participants: participantsPhone,
            isGroupChat: true,
        });
        const conversationModelResponce = await newConversationModel.save();

        // creating new group
        const newGroupModel = new GroupModel({
            name: groupName,
            conversasionId: conversationModelResponce._id,
            admin: new ObjectId(req.user.id),
        });

        const responce = await newGroupModel.save();

        // adding group id to all the participant's users document
        participants.map(async (participant) => {
            participant.groupList.push(new ObjectId(responce._id));
            await participant.save();
        });

        if (!responce) {
            throw new Error("can't create group");
        }
        return res.status(201).send("group created successfull...");
    } catch (error) {
        return res.status(404).send(error.message);
    }
};

module.exports = createGroupControler;
