import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProfileArea from "../components/ProfileArea";
import MessageArea from "../components/MessageArea";
import ContactList from "../components/ContactList";
import { getCookie } from "../Cookie/cookieConfigure";
import { auth } from "../Cookie/auth";
import "../Styles/chatpage.css";
import { context } from "../context/UserContext";
import axios from "axios";

const Chatpage = () => {
    const navigator = useNavigate();
    const { user, setUser } = useContext(context);
    const API = "http://localhost:5500/getallcontact";

    // cheacking if the user has his sassion
    useEffect(() => {
        const token = getCookie("token");
        const userInfo = auth(token);

        const fetchData = async () => {
            try {
                const responce = await axios.get(API, {
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                    params: {
                        phone: userInfo.phone,
                    },
                });
                setUser(responce.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (!userInfo) {
            navigator("/login");
        } else {
            fetchData();
        }
        
    }, [API, navigator]);

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
