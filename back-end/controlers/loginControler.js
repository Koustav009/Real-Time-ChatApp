const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const UserModel = require("../models/userModel");
const JWTPRIVATE = process.env.JWTPRIVATE;

const generateToken = (payload) => {
    return jwt.sign(payload, JWTPRIVATE, {
        expiresIn: "2day",
    });
};

const loginControler = async (req, res) => {
    const { phone, password } = req.query;
    try {
        const user = await UserModel.findOne({ phone });
        console.log(user);
        if (user) {
            const isValidPassword = await bcrypt.compare(
                password,
                user.password
            );
            console.log(isValidPassword);
            if (isValidPassword) {
                const payload = {
                    name: user.name,
                    phone: user.phone,
                };
                const token = generateToken(payload);
                res.status(201).json({token});
            } else {
                res.status(401).send("invalid credentials");
            }
        } else {
            res.status(404).send("User Not Found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = loginControler;