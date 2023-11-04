import React, { useState, useContext, useEffect } from "react";
import "../Styles/contactList.css";
import { FaSistrix } from "react-icons/fa6";
import { BiMessageSquareAdd } from "react-icons/bi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AddContactModal from "./modals/AddContactModal";
import { context } from "../context/UserContext";
import ErrorModal from "./modals/ErrorModal";
import axios from "axios";
import { getCookie } from "../Cookie/cookieConfigure";
import { auth } from "../Cookie/auth";
import ProfileModal from "./modals/ProfileModal";
import Loadding from "./modals/Loadding";
import Success from "./modals/Success";
import { ImCross } from "react-icons/im";
import { MdOutlineGroupAdd } from "react-icons/md";
import Contact from "./Contact";
import CreateGroup from "./modals/CreateGroup";
const API = "http://localhost:5500/getusercredential";

const ContactList = () => {
    const navigator = useNavigate();
    const [error, setError] = useState();
    const [success, setSuccess] = useState(false);
    const [loadding, setLoadding] = useState(true);
    const { user, setUser, contacts, setSelectedContact } = useContext(context);
    const [showProfile, setShowProfile] = useState(false);
    const [contactInputField, setContactInputField] = useState("");
    const [isAddContactModalVisible, setIsAddContactModalVisible] =
        useState(false);
    const [isUserSearchName, setIsUserSearchName] = useState(false);
    const [searchedContact, setSearchedContact] = useState([]);
    const [exitSearchContact, setExitSearchContact] = useState(false);
    const [isSearchLoadding, setIsSearchLoadding] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errormsg, setErrormsg] = useState("");
    const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] =
        useState(false);

    useEffect(() => {
        const token = getCookie("token");
        const isVarifiedToken = auth(token);
        if (!isVarifiedToken) {
            navigator("/login");
            return;
        }
        const fetchData = async () => {
            setLoadding(true);
            try {
                const responce = await axios.get(API, {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                });
                const profileBinaryData = responce.data.profile.data;
                const credential = responce.data.credential;

                // converting binary data to file
                const unit8Array = new Uint8Array(profileBinaryData);
                const profilePhotoLink = URL.createObjectURL(
                    new Blob([unit8Array])
                );
                setUser({ profile: profilePhotoLink, ...credential });
            } catch (error) {
                setIsError(true);
                setErrormsg(error.message);
                console.log(error);
            }
            setLoadding(false);
        };
        fetchData();
    }, [setLoadding, setUser]);

    const handleSearchInput = (e) => {
        setContactInputField(e.target.value);
    };

    const searchContact = async () => {
        if (contactInputField) {
            setIsSearchLoadding(true);
            setExitSearchContact(true);
            setIsUserSearchName(true);
            if (contacts.length) {
                contacts.forEach((contact) => {
                    if (contact.phone === contactInputField) {
                        setSearchedContact((prev) => contact);
                        console.log(contact);
                        return 0;
                    }
                });
            } else {
                const payload = {
                    phone: contactInputField,
                };
                const endPoint = "http://localhost:5500/contact/searchuser";
                try {
                    const responce = await axios.get(endPoint, {
                        headers: {
                            Authorization: `Bearer ${getCookie("token")}`,
                        },
                        params: payload,
                    });
                    const unit8Array = new Uint8Array(
                        responce.data.profile.data
                    );
                    const profileLink = URL.createObjectURL(
                        new Blob([unit8Array])
                    );
                    const { name, gmail, lastActive, phone, status } =
                        responce.data;
                    const contact = {
                        name,
                        gmail,
                        phone,
                        status,
                        lastActive,
                        profile: profileLink,
                    };
                    setSearchedContact((prev) => contact);
                } catch (error) {
                    console.log(error);
                    setErrormsg(error.response.data || "not found");
                    setIsError(true);
                }
            }
            setIsSearchLoadding(false);
        } else {
            alert("enter a valid name");
        }
    };

    const closeSearchContact = () => {
        setExitSearchContact(false);
        setIsUserSearchName(false);
        setSearchedContact([]);
    };

    const handleSelectedContact = () => {
        setSelectedContact(searchedContact);
    };

    const closeErrorModel = (value) => {
        setIsError(value);
        setExitSearchContact(false);
        setIsUserSearchName(false);
        setSearchedContact([]);
    };

    const closeModal = () => {
        setIsCreateGroupModalVisible((prev) => false);
    };

    return (
        <div className="contactListArea">
            <div>
                <div className="contactLlstHead">
                    <button
                        className="profile"
                        onClick={() => {
                            setShowProfile(true);
                        }}
                    >
                        <img
                            src={
                                user?.profile
                                    ? user.profile
                                    : "https://www.pngitem.com/pimgs/m/146-1468281_profile-icon-png-transparent-profile-picture-icon-png.png"
                            }
                            alt="profile"
                            width={50}
                        />
                    </button>
                    <p className="user-name">{user?.name.toLowerCase()}</p>
                    <button
                        onClick={() => {
                            setIsAddContactModalVisible(true);
                        }}
                        className="contactBtn"
                    >
                        <BiMessageSquareAdd />
                    </button>
                    <button
                        className="contactBtn"
                        onClick={() => {
                            setIsCreateGroupModalVisible(true);
                        }}
                    >
                        <MdOutlineGroupAdd />
                    </button>
                </div>
                <div id="contactSearchDiv">
                    <input
                        type="text"
                        value={contactInputField}
                        onChange={handleSearchInput}
                        placeholder="search contact by number"
                        id="contactSearchInput"
                    />
                    {exitSearchContact ? (
                        <ImCross id="searchIcon" onClick={closeSearchContact} />
                    ) : (
                        <FaSistrix id="searchIcon" onClick={searchContact} />
                    )}
                </div>
                <h1 id="chatHeading">Chats</h1>
            </div>
            {isSearchLoadding && <Loadding />}
            {isError && (
                <ErrorModal errorMsg={errormsg} handleError={closeErrorModel} />
            )}
            {isUserSearchName ? (
                <Contact
                    contact={searchedContact}
                    onChildClick={handleSelectedContact}
                />
            ) : (
                <div className="chatListdiv">
                    <ul className="navigation">
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
            )}
            {loadding && <Loadding />}
            {isAddContactModalVisible && (
                <AddContactModal
                    closeModal={setIsAddContactModalVisible}
                    handleError={setError}
                    handleSuccess={setSuccess}
                />
            )}
            {error && <ErrorModal handleError={setError} errorMsg={error} />}
            {success && (
                <Success
                    closeModal={setSuccess}
                    successMsg={"contact added successfull"}
                />
            )}
            {showProfile && <ProfileModal closeModal={setShowProfile} />}
            {isCreateGroupModalVisible && (
                <CreateGroup closeModal={closeModal} />
            )}
        </div>
    );
};

export default ContactList;
