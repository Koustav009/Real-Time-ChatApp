import React, { useContext, useEffect, useState } from "react";
import { context } from "../context/UserContext";
import "../Styles/profileArea.css";
import { FaArrowCircleRight, FaInfo } from "react-icons/fa";
import { GoCircleSlash } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { GrGroup, GrOpera } from "react-icons/gr";
import { RxExit } from "react-icons/rx";
import "../Styles/profileArea.css";
import axios from "axios";
import { getCookie } from "../Cookie/cookieConfigure";
import Loadding from "./modals/Loadding";
import GroupContact from "../components/GroupContact";

function ProfileArea() {
    const { selectedContact, setSelectedContact, contacts, setContacts } =
        useContext(context);
    const [allParticipantsDetails, setAllParticipantsDetails] = useState([]);
    const [isLoadding, setIsLoading] = useState(false);
    const [commonGroups, setCommonGroup] = useState([]);

    const fetchDataForGroup = async () => {
        const endPoint = "http://localhost:5500/contact/findUserByNumber";
        const numbers = [
            ...new Set(
                selectedContact.participants.map(
                    (participant) => participant.phone
                )
            ),
        ];
        try {
            setIsLoading(true);
            const responce = await axios.get(endPoint, {
                headers: {
                    authorization: `Bearer ${getCookie("token")}`,
                },
                params: { numbers },
            });
            responce.data.map((user) => {
                user.profile = URL.createObjectURL(
                    new Blob([new Uint8Array(user.profile.data)])
                );
            });
            setAllParticipantsDetails([...new Set(responce.data)]);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const fetchCommonGroup = async () => {
        const endPoint = "http://localhost:5500/contact/findCommonGroup";
        try {
            setIsLoading(true);
            const responce = await axios.get(endPoint, {
                headers: {
                    authorization: `Bearer ${getCookie("token")}`,
                },
                params: { phone: selectedContact.phone },
            });
            if (!responce) {
                throw new Error("not found");
            }
            responce.data.map((group) => {
                group.profile = URL.createObjectURL(
                    new Blob([new Uint8Array(group.profile.data)])
                );
            });
            setCommonGroup((prev) => responce.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedContact && selectedContact.isGroupChat) {
            fetchDataForGroup();
        } else if (selectedContact && !selectedContact.isGroupChat) {
            fetchCommonGroup();
        }
    }, [selectedContact]);

    const handleChildClick = (contact) => {
        setSelectedContact(contact);
    };

    const handleExitClick = () => {
        alert("exit");
    };

    const handleBlockChat = () => {
        alert("blocked");
    };

    const handleDeleteChat = async () => {
        const endPoint = "http://localhost:5500/contact/deleteChat";
        try {
            setIsLoading(true);
            const responce = await axios.delete(endPoint, {
                headers: {
                    authorization: `Bearer ${getCookie("token")}`,
                },
                params: {
                    phone: selectedContact.phone,
                },
            });
            if (!responce) {
                throw new Error("error in fetching data");
            }
            console.log(contacts);
            setContacts((prev) => {
                return [
                    ...new Set(
                        contacts.filter((contact) => {
                            return contact.phone !== selectedContact.phone;
                        })
                    ),
                ];
            });
            setSelectedContact((prev) => null);
            console.log(contacts);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    return (
        <div
            className="profile-area"
            style={{ border: selectedContact ? "none" : "1px solid" }}
        >
            {selectedContact ? (
                selectedContact.isGroupChat ? (
                    <div className="profile-area-info-container">
                        <div className="profile-pic-area">
                            <div className="pic">
                                <img
                                    src={selectedContact.profile}
                                    alt="profile"
                                    width={50}
                                />
                                <p className="profile-name">
                                    {selectedContact.name}
                                </p>
                                <p className="profile-number">
                                    {selectedContact.phone}
                                </p>
                            </div>
                        </div>
                        <div className="profile-body">
                            <p className="profile-body-header">participants</p>
                            {allParticipantsDetails.map(
                                (participant, index) => {
                                    return (
                                        <div
                                            className="group-participant-contact"
                                            key={index}
                                            onClick={() =>
                                                handleChildClick(participant)
                                            }
                                        >
                                            <img
                                                src={participant.profile}
                                                alt="profile"
                                                width={100}
                                            />
                                            <p>{participant.name}</p>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                        <div className="profile-footer">
                            <div
                                className="profile-exit"
                                onClick={handleExitClick}
                            >
                                <RxExit />
                                <p className="exit-group">exit group</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="profile-area-info-container">
                        <div className="profile-pic-area">
                            <div className="pic">
                                <img
                                    src={selectedContact.profile}
                                    alt="profile"
                                    width={50}
                                />
                                <p className="profile-name">
                                    {selectedContact.name}
                                </p>
                                <p className="profile-number">
                                    {selectedContact.phone}
                                </p>
                            </div>
                        </div>
                        <div className="profile-info-about">
                            <FaInfo />
                            <div className="about">
                                <p className="about-head">About</p>
                                <p className="about-value">
                                    {selectedContact?.about ? (
                                        selectedContact.about
                                    ) : (
                                        <>hey i am using chatHub</>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="profile-info-match">
                            <p className="group-info">
                                <GrGroup className="group-icon" />
                                <span>Groups in common</span>
                            </p>
                            <div className="groups-name">
                                {commonGroups &&
                                    commonGroups.map((group, index) => {
                                        return (
                                            <GroupContact
                                                key={index}
                                                handleChildClick={
                                                    handleChildClick
                                                }
                                                group={group}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="profile-footer">
                            <div
                                className="profile-chat"
                                onClick={handleDeleteChat}
                            >
                                <MdDelete />
                                <p className="block-text">Delete chat</p>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <h3 className="non-selected-text">
                    select a contact to view profile
                </h3>
            )}
            {isLoadding && <Loadding />}
        </div>
    );
}

export default ProfileArea;
