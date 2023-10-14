const express = require("express");
const auth = require("../meddleware/auth");
const fileupload = require("express-fileupload");
const addContact = require("../controlers/addContact");
const loginControler = require("../controlers/loginControler");
const signinControler = require("../controlers/signinControler");
const getusercredential = require("../controlers/getusercredential");
const getallcontactControler = require("../controlers/getallcontactControler");
const router = express.Router();

router.use(fileupload());

router.post("/createuser/signin", signinControler);
router.get("/createuser/login", loginControler);
router.post("/contact/addcontact", auth, addContact);
router.get("/getusercredential", auth, getusercredential);
router.get("/getallcontacts", auth, getallcontactControler);
module.exports = router;
