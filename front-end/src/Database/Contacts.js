const demoProfile =
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80";
const contacts = [
    {
        id: 2,
        name: "souvik",
        phoneNo: 9641462817,
        profile: demoProfile,
        typingStatus: false,
        isOnline: true,
        lastSeen: "10:34",
        lastMessage: "good morning",
    },
    {
        id: 3,
        name: "Raju",
        profile: "",
        phoneNo: 9641462817,
        typingStatus: false,
        isOnline: false,
        lastSeen: "10:34",
        lastMessage: "bye tack care",
    },
    {
        id: 4,
        name: 9641462817,
        profile: "",
        phoneNo: 9641462817,
        typingStatus: true,
        isOnline: true,
        lastSeen: "10:34",
        lastMessage: "hi i am sasi",
    },
];

const chats = [
    {
        sender_id: 1,
        recessiver_id: 2,
        message: "hello",
    },
    {
        sender_id: 2,
        recessiver_id: 1,
        message: "hi",
    },
];

export { contacts, chats};
