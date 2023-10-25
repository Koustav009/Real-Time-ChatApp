const ObjectId = require("mongoose").Types.ObjectId;
const UserModel = require("../models/userModel");
const ConversationModel = require("../models/conversationModel");
const GroupModel = require("../models/groupModel");

const createGroupControler = async (req, res) => {
    // remove me
    const payload = {
        numbers: [9641462817, 9641462811, 9641462812, 9641462813, 9641462814],
        groupName: "codding hub",
    };

    // addmin id
    const userId = req.user.id;
    try {
        const { groupName, numbers } = req.body;
        const participants = [];
        for(i in numbers){
            const id = await UserModel.find({phone: i})
            participants.push(new ObjectId (id)); 
        }
        console.log(participants);
        const newConversationModel = new ConversationModel({
            participants,
            isGroupChat: true,
        });
        const conversationModelResponce = await newConversationModel.save();
        console.log(conversationModelResponce);

        const newGroupModel = new GroupModel({
            name: groupName,
            conversasionId: conversationModelResponce._id,
            admin: new ObjectId(userId),
        })

        const responce = await newGroupModel.save();
        console.log(responce);
        if(!responce){
            throw new Error("can't create group");
        }
        return res.status(201).send("group created successfull...");

    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(404).send(error.message);
    }
};

module.exports = createGroupControler;
