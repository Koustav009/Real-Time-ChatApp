const { Schema, model } = require("mongoose");

const groupSchema = Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
    },
    conversasionId: {
        type: Schema.Types.ObjectId,
        ref: "ConversationModel",
    },
    admin: [
        {
            type: Schema.Types.ObjectId,
            ref: "UserModel",
            required: true,
        },
    ],
});


const GroupSchema = model("GroupSchema", groupSchema);


module.exports = GroupSchema;