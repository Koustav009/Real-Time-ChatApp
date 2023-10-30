const express = require("express");
const auth = require("../meddleware/auth");
const fileupload = require("express-fileupload");
const addContact = require("../controlers/addContact");
const loginControler = require("../controlers/loginControler");
const signinControler = require("../controlers/signinControler");
const searchControler = require("../controlers/searchControler");
const findUserByNumber = require("../controlers/findUserByNumber");
const getGroupControler = require("../controlers/getGroupControler");
const getusercredential = require("../controlers/getusercredential");
const createGroupControler = require("../controlers/createGroupControler");
const getallcontactControler = require("../controlers/getallcontactControler");
const router = express.Router();

router.use(fileupload());

router.get("/createuser/login", loginControler);
router.post("/createuser/signin", signinControler);
router.post("/contact/addcontact", auth, addContact);
router.get("/contact/searchuser", auth, searchControler);
router.get("/contact/getGroups", auth, getGroupControler);
router.get("/getusercredential", auth, getusercredential);
router.get("/getallcontacts", auth, getallcontactControler);
router.post("/contact/createGroup", auth, createGroupControler);
router.get("/contact/findUserByNumber", auth, findUserByNumber);
router.all("*", (req, res) => res.status(404).send("not found"));

module.exports = router;
