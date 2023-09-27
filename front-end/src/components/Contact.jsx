import React, { useContext, useEffect, useState } from "react";
import { ContactState } from "../Context";

const Contact = ({ contact, onChildClick }) => {
    
    const defaultProfile =
        "https://png.pngitem.com/pimgs/s/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

    const handleClick = ()=>{
        onChildClick(contact);
    }
    return (
        <div className="contact" key={contact.id} onClick={handleClick}>
            <div className="profileImg">
                <img
                    src={contact.profile ? contact.profile : defaultProfile}
                    alt=""
                    width={100}
                />
            </div>
            <div className="contact-info">
                <h1 className="name">{contact.name}</h1>
                <p className="lastmessage">
                    {contact.typingStatus
                        ? "Typing..."
                        : contact.lastMessage}
                </p>
            </div>
            <div className="status">
                {contact.isOnline ? (
                    <span className="onlineIndecator"></span>
                ) : (
                    <p className="lastseen">{contact.lastSeen}</p>
                )}
            </div>
        </div>
    );
};

export default Contact;
