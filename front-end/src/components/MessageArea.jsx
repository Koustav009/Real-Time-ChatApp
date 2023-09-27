import React, { useState, useContext, useEffect } from "react";
import "../Styles/messageArea.css";
import { ContactContext } from "../Context";
import { chats } from "../Database/Contacts";

const MessageArea = () => {
    const { selectedContact } = useContext(ContactContext);

    return (
        <div className="messageArea">
            <p>messages</p>
        </div>
    );
};

export default MessageArea;
