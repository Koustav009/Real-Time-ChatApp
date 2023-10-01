import React from "react";
import Contact from "./Contact";
import { contacts } from "../Database/Contacts";

function PersonalChat() {
    const handleClick = ()=>{
        alert("Selected");
    }

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
