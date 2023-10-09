import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileArea from "../components/ProfileArea";
import MessageArea from "../components/MessageArea";
import ContactList from "../components/ContactList";
import { getCookie } from "../Cookie/cookieConfigure";
import { auth } from "../Cookie/auth";
import "../Styles/chatpage.css";

const Chatpage = () => {
    const navigator = useNavigate();
    // cheacking if the user has his token
    useEffect(() => {
        const token = getCookie("token");
        const userInfo = auth(token);
        if (!userInfo) {
            navigator("/login");
        }
    }, [navigator]);

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
