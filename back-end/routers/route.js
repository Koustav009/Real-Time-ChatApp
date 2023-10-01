const express = require("express");
const router = express.Router();
const fileupload = require("express-fileupload");
const UserModel = require("../models/userModel");
const signinControler = require("../controlers/signinControler");
const loginControler = require("../controlers/loginControler");
const addContact = require("../controlers/addContact");
const allContact = require("../controlers/allContact");

router.use(fileupload());

router.post("/createuser/signin", signinControler);
router.get("/createuser/login", loginControler);
router.post("/contact/addcontact", addContact);
router.get("/getallcontact", allContact);
module.exports = router;
