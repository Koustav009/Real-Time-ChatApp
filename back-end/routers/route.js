const express = require("express");
const auth = require("../meddleware/auth");
const fileupload = require("express-fileupload");
const addContact = require("../controlers/addContact");
const loginControler = require("../controlers/loginControler");
const signinControler = require("../controlers/signinControler");
const getusercredential = require("../controlers/getusercredential");
const createGroupControler = require("../controlers/createGroupControler");
const getallcontactControler = require("../controlers/getallcontactControler");
const router = express.Router();

router.use(fileupload());

router.get("/createuser/login", loginControler);
router.post("/createuser/signin", signinControler);
router.post("/contact/addcontact", auth, addContact);
router.get("/getusercredential", auth, getusercredential);
router.get("/getallcontacts", auth, getallcontactControler);
router.post("/contact/createGroup", auth, createGroupControler);
router.all("*", (req, res) => res.status(404).send("not found"));

module.exports = router;
