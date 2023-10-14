import React, { createContext, useState } from "react";

export const context = createContext();

export const UserContext = ({ children }) => {
    const [user, setUser] = useState();
    const [selectedContact, setSelectedContact] = useState();
    const [contacts, setContacts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    return (
        <context.Provider
            value={{
                user,
                setUser,
                selectedContact,
                setSelectedContact,
                contacts,
                setContacts,
                page,
                setPage,
                hasMore,
                setHasMore,
            }}
        >
            {children}
        </context.Provider>
    );
};
