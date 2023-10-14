const mongoose = require("mongoose");
const validation = require("validator");
const crypto = require("crypto-js");
require("dotenv").config();
const SALT = process.env.SALT;

const defaultProfile =
    "https://www.pngitem.com/pimgs/m/146-1468281_profile-icon-png-transparent-profile-picture-icon-png.png";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validation.isMobilePhone(value, "en-IN");
            },
            message: "invalid phone number",
        },
    },
    gmail: {
        type: String,
        validate: {
            validator: function (value) {
                return validation.isEmail(value);
            },
            message: "invalid gmail",
        },
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        default: defaultProfile,
    },
    status: {
        type: String,
        default: "online",
        enum: {
            values: ["online", "ofline"],
            message: "{VALUE} is not supported",
        },
    },
    lastActive: {
        type: Date,
        default: new Date(),
    },
    contactList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
        },
    ],
    groupList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
        },
    ],
});

userSchema.pre("save", async function (next) {
    if (!this.isModified()) {
        next();
    }
    const hashedPassword = crypto.SHA256(this.password, SALT, crypto.enc.Hex);
    this.password = hashedPassword.toString(crypto.enc.Hex);
    next();
});

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
