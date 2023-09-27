const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");
const colors = require("colors");
const db = require("./configuration/config.js");
const router = require("./routers/route");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.use(router);

app.listen(PORT, () => {
    console.log(`server listen on http://localhost:${PORT}`.bold.blue);
});
