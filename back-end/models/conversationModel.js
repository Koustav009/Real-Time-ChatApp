const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
    }],
    lastMessage: {
        type: String,
        default: null,
    },
    unseenMessageCount: {
        type: Number,
        default: 0,
    }
});

const ConversationModel = mongoose.model("ConversationModel", conversationSchema);

module.exports = ConversationModel;
