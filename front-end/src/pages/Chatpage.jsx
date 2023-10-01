import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileArea from "../components/ProfileArea";
import MessageArea from "../components/MessageArea";
import ContactList from "../components/ContactList";
import { getCookie } from "../Cookie/cookieConfigure";
import jwtDecoder from "jwt-decode";
import "../Styles/chatpage.css";
import { auth } from "../Cookie/auth";

const Chatpage = () => {
    const navigator = useNavigate();

    // cheacking if the user has his sassion
    useEffect(()=>{
        const token = getCookie("token");
        const user = auth(token);
        if(!user){
            navigator("/login");
        }
    }, []);

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
