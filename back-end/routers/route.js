const express = require("express");
const router = express.Router();
const fileupload = require("express-fileupload");
const UserModel = require("../models/userModel");
const signinControler = require("../controlers/signinControler");
const loginControler = require("../controlers/loginControler");
const addContact = require("../controlers/addContact");
const getusercredential = require("../controlers/getusercredential");
const auth = require("../meddleware/auth");

router.use(fileupload());

router.post("/createuser/signin", signinControler);
router.get("/createuser/login", loginControler);
router.post("/contact/addcontact", auth, addContact);
router.get("/getusercredential", auth, getusercredential);
module.exports = router;
