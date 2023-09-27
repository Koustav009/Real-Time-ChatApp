const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");
const signinControler = require("../controlers/signinControler");
const loginControler = require("../controlers/loginControler");
const fileupload = require("express-fileupload");

router.use(fileupload());

router.post("/createuser/signin", signinControler);
router.get("/createuser/login", loginControler);

module.exports = router;