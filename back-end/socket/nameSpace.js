const namespace = (io) => {
    io.on("connection", (socket) => {
        console.log("connected");
        socket.on("new-msg", (selectedContact)=>{
            console.log(selectedContact);
        });
    });
};

module.exports = namespace;
