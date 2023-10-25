import React, { useContext } from "react";
import { context } from "../context/UserContext";
import "../Styles/profileArea.css";
import { RxCross2 } from "react-icons/rx";
import { FaInfo } from "react-icons/fa";
import { GoCircleSlash } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import "../Styles/profileArea.css";

function ProfileArea() {
    const { selectedContact } = useContext(context);

    return (
        <div
            className="profile-area"
            style={{ border: selectedContact ? "none" : "1px solid" }}
        >
            {selectedContact ? (
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
                                {selectedContact?.about
                                    ? selectedContact.about
                                    : "hey i am using chatHub"}
                            </p>
                        </div>
                    </div>
                    <div className="profile-info-match">
                        <p className="group-info">
                            <GrGroup /> Groups in common
                        </p>
                        <div className="groups-name">
                            {/* fetch data from API*/}
                        </div>
                    </div>
                    <div className="profile-footer">
                        <div className="profile-block">
                            <GoCircleSlash />
                            <p className="block-text">
                                Block {selectedContact.name.toLowerCase()}
                            </p>
                        </div>
                        <div className="profile-chat">
                            <MdDelete />
                            <p className="block-text">Delete chat</p>
                        </div>
                    </div>
                </div>
            ) : (
                <h3 className="non-selected-text">
                    select a contact to view profile
                </h3>
            )}
        </div>
    );
}

export default ProfileArea;
