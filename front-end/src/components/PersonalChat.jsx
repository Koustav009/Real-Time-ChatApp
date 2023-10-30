import React, { useEffect, useContext, useState, useCallback } from "react";
import axios from "axios";
import { context } from "../context/UserContext";
import { getCookie } from "../Cookie/cookieConfigure";
import Contact from "./Contact";

const API = "http://localhost:5500/getallcontacts";
const LIMIT = 4;
function PersonalChat() {
    const {
        contacts,
        setContacts,
        page,
        setPage,
        setSelectedContact,
        hasMore,
        setHasMore,
    } = useContext(context);
    const [loadding, setLoadding] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setLoadding(true);
            const responce = await axios.get(API, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
                params: {
                    page,
                    limit: LIMIT,
                },
            });
            if (!responce) throw new Error("error in fetching contacts");
            if (responce.data.length === 0) {
                setHasMore(false);
            }

            // setting the contacts with profile photo
            setContacts((prevContacts) => {
                responce.data.map((contact) => {
                    const unit8array = new Uint8Array(contact.profile.data);
                    const blobData = new Blob([unit8array]);
                    contact.profile = URL.createObjectURL(blobData);
                    return null;
                });
                return [...prevContacts, ...responce.data];
            });
            setPage((prev) => prev + 1);
            setLoadding(false);
        } catch (error) {
            console.log(error);
            setLoadding(false);
        }
    }, [page, setContacts, setLoadding, setHasMore, setPage]);

    useEffect(() => {
        if (hasMore) {
            fetchData();
        }
    }, [page, setContacts, fetchData, hasMore]);

    const handleScroll = useCallback(
        (e) => {
            const chatListDiv = e.target;
            if (
                chatListDiv.offsetHeight + chatListDiv.scrollTop + 1 >=
                    chatListDiv.scrollHeight &&
                hasMore
            ) {
                setPage((prev) => prev + 1);
            }
        },
        [setPage, hasMore]
    );

    useEffect(() => {
        document
            .querySelector(".chatListdiv")
            .addEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const handleSelectedContact = (contact) => {
        setSelectedContact(contact);
    };
    return (
        <div className="chatlist">
            {contacts.map((contact, index) => {
                return (
                    <Contact
                        key={index}
                        contact={contact}
                        onChildClick={handleSelectedContact}
                    />
                );
            })}
            {loadding && <p>loadding...</p>}
        </div>
    );
}

export default PersonalChat;
