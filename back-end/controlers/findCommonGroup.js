const UserModel = require("../models/userModel");
const {getGroupFile} = require("../helper/getFile");

const findCommonGroup = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            phone: req.query.phone,
        }).select("_id");

        const response = await UserModel.findOne({ _id: req.user.id })
            .select("groupList -_id")
            .populate({
                path: "groupList",
                select: "conversasionId -_id name profile",
            });

        for (let i = 0; i < response.groupList.length; i++) {
            await response.groupList[i].populate({
                path: "conversasionId",
                select: "participants -_id",
            });
        }

        //finding any matching group
        const matchingGroups = [];
        response.groupList.forEach((group) => {
            group.conversasionId.participants.forEach((id) => {
                if (id.equals(user._id)) {
                    matchingGroups.push({
                        name: group.name,
                        profile: getGroupFile(group.profile),
                    });
                }
            });
        });

        res.send(matchingGroups);
    } catch (error) {
        res.send(error);
    }
};

module.exports = findCommonGroup;
