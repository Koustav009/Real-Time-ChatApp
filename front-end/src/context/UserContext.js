import React, { createContext, useEffect, useState } from "react";

export const context = createContext();

export const UserContext = ({ children }) => {
    const [user, setUser] = useState();
    return (
        <context.Provider value={{ user, setUser }}>
            {children}
        </context.Provider>
    );
};