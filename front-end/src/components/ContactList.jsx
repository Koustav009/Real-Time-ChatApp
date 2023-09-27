import React, { useState } from "react";
import "../Styles/contactList.css";
import { FaSistrix } from "react-icons/fa6";
import { BiMessageSquareAdd } from "react-icons/bi";
import { NavLink, Outlet } from "react-router-dom";
import AddContactModal from "./modals/AddContactModal";

const ContactList = () => {
    const [contactInputField, setContactInputField] = useState("");
    const [isAddContactModalVisible, setIsAddContactModalVisible] = useState(false);

    const handleSearchInput = (e) => {
        setContactInputField(e.target.value);
    };

    const searchContact = () => {
        if (contactInputField) {
            alert(contactInputField);
        } else {
            alert("enter a valid name");
        }
    };

    return (
        <div className="contactListArea">
            {isAddContactModalVisible ? <AddContactModal /> : null}
            <div>
                <div id="contactSearchDiv">
                    <input
                        type="text"
                        value={contactInputField}
                        onChange={handleSearchInput}
                        placeholder="search contact"
                        id="contactSearchInput"
                    />
                    <FaSistrix id="searchIcon" onClick={searchContact} />
                </div>
                <h1 id="chatHeading">Chats</h1>
            </div>
            <div className="chatListdiv">
                <ul className="navigation">
                    <li>
                        <NavLink
                            to="allchat"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            All
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="personalchat"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            Personal
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="groupchats"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            Group
                        </NavLink>
                    </li>
                </ul>
                <Outlet />
            </div>
            <button
                onClick={() => {
                    setIsAddContactModalVisible(true);
                }}
                id="contactAddBtn"
            >
                <BiMessageSquareAdd />
            </button>
        </div>
    );
};

export default ContactList;
