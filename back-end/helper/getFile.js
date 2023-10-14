const fs = require("fs");
const path = require("path");

const getFile = (fileName) => {
    const filePath = path.join(process.cwd(), "profiles", fileName);
    const file = fs.readFileSync(filePath); 
    return file;
};

module.exports = getFile;
