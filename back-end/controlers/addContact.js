const UserModel = require("../models/userModel");

const addContact = async (req, res) => {
    const { userNumber, receiverNumber } = req.body;
    try {

        const receiverUser = await UserModel.findOne({
            phone: receiverNumber,
        });
        const senderUser = await UserModel.findOne({
            phone: userNumber,
        }).populate({
            path: "contactList",
            select: "-_id phone"
        });

        console.log(receiverUser);
        
        const allContacts = senderUser.contactList.map(contact=>contact.phone);
        const isAlreadyInContact = allContacts.find((value)=>{
            return value == receiverNumber;
        });
        if (!isAlreadyInContact) {
            const senderUser = await UserModel.findOne({
                phone: userNumber,
            });
            
            senderUser.contactList.push(receiverUser._id);
            await senderUser.save();
            res.status(200).send("contact added successfull");
        }
        else{
            res.status(409).send("all already exists");
        }
    } catch (error) {
        console.log(error);
        res.status(404).send("not found");
    }
};

module.exports = addContact;
