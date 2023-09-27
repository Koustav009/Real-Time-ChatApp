import React, { useState } from "react";
import ProfileArea from "../components/ProfileArea";
import MessageArea from "../components/MessageArea";
import ContactList from "../components/ContactList";
import '../Styles/chatpage.css'

const Chatpage = () => {
    const [selectedContact, setSelectedContact] = useState();
    return (
        <div className="chatpageDiv">
            <ContactList
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
            />
            <MessageArea />
            <ProfileArea />
        </div>
    );
};

export default Chatpage;
