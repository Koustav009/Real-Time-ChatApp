import React, { useState, useEffect, useContext } from "react";
import Contact from "./Contact";
import { contacts } from "../Database/Contacts";
import { ContactContext } from "../Context";

function PersonalChat() {
    const { setSelectedContact } = useContext(ContactContext);
    const [newSelectedContact, setewSelectedContact] = useState({});
    // this  selectedContactFromChild come form contact component
    const handleClick = (selectedContactFromChild) => {
        setewSelectedContact((prevState) => {
            return selectedContactFromChild;
        });
    };
    useEffect(() => {
        setSelectedContact((prevState) => {
            return newSelectedContact;
        });
    }, [newSelectedContact]);
    return (
        <div className="chatlist">
            {contacts.map((contact, index) => {
                return (
                    <Contact
                        contact={contact}
                        key={index}
                        onChildClick={handleClick}
                    />
                );
            })}
        </div>
    );
}

export default PersonalChat;
