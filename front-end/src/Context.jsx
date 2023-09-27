import React, { createContext, useContext, useState } from "react";

export const ContactContext = createContext();

function Context({ children }) {
    const [selectedContact, setSelectedContact] = useState({});
    return (
        <ContactContext.Provider value={{ selectedContact, setSelectedContact }}>
            {children}
        </ContactContext.Provider>
    );
}

export default Context;
