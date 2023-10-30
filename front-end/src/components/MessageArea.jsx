import React, { useState, useContext, useEffect } from "react";
import { context } from "../context/UserContext";
import {
    BsTelephoneFill,
    BsEmojiSmile,
    BsThreeDotsVertical,
} from "react-icons/bs";
import { BiSolidVideo } from "react-icons/bi";
import { VscSend } from "react-icons/vsc";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "../Styles/message-area.css";

const MessageArea = () => {
    const { selectedContact } = useContext(context);

    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    
    return (
        <div
            className="message-container"
            style={
                selectedContact
                    ? {
                          backgroundColor: "#2995af",
                      }
                    : {
                          border: "1px solid",
                          color: "var(--text-color)",
                          display: "grid",
                          placeItems: "center",
                          height: "100%",
                      }
            }
        >
            {selectedContact ? (
                <>
                    <div className="message-container-header">
                        <img
                            src={selectedContact.profile}
                            alt="profile"
                            className="message-area-profile"
                            width={"100px"}
                        />
                        <p className="message-container-header-name">
                            {selectedContact.name.split(" ")[0].toLowerCase()}
                            <span
                                className={
                                    selectedContact.status === "online"
                                        ? "clr-g"
                                        : null
                                }
                            >
                                {selectedContact.status === "online"
                                    ? "online"
                                    : new Date(
                                          selectedContact.lastActive
                                      ).toLocaleTimeString()}
                            </span>
                        </p>
                        <BsTelephoneFill className="message-container-header-call" />
                        <BiSolidVideo className="message-container-header-video-call" />
                        <BsThreeDotsVertical className="message-container-header-video-call" />
                    </div>
                    <div className="message-area">
                        <p style={{ textAlign: "right" }} className="right">
                            hi
                            <span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "left" }} className="left">
                            hello<span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "right" }} className="right">
                            how are you<span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "left" }} className="left">
                            i am fine<span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "right" }} className="right">
                            hi
                            <span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "left" }} className="left">
                            hello<span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "right" }} className="right">
                            how are you<span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "left" }} className="left">
                            i am fine<span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "left" }} className="left">
                            i am fine i am fine i am fine i am fine i am fine i
                            am fine i am fine i am fine i am fine i am fine i am
                            fine i am fine i am fine i am fine i am fine i am
                            fine i am fine i am fine{" "}
                            <span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "left" }} className="right">
                            i am fine i am fine i am fine i am fine i am fine i
                            am fine i am fine i am fine i am fine i am fine i am
                            fine i am fine i am fine i am fine i am fine i am
                            fine i am fine i am fine{" "}
                            <span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "right" }} className="right">
                            hi
                            <span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "left" }} className="left">
                            hello<span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "right" }} className="right">
                            how are you<span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "left" }} className="left">
                            i am fine<span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "right" }} className="right">
                            hi
                            <span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "left" }} className="left">
                            hello<span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "right" }} className="right">
                            how are you<span className="time">10:20:01</span>
                        </p>
                        <p style={{ textAlign: "left" }} className="left">
                            i am fine<span className="time">10:20:01</span>
                        </p>
                    </div>
                    <div className="message-container-input-area">
                        <BsEmojiSmile
                            className="emoji-btn"
                            onClick={() => {
                                setShowEmojiPicker((prev) => !prev);
                            }}
                            focusable={true}
                        />
                        <input
                            type="text"
                            name="message"
                            value={message}
                            autoFocus
                            onChange={(e) => {
                                setMessage((prev) => e.target.value);
                            }}
                            placeholder="Type Here"
                        />

                        <VscSend className="send-btn" />
                    </div>
                    {showEmojiPicker && (
                        <div className="emoji-picker">
                            <Picker
                                data={data}
                                onEmojiSelect={(e) => {
                                    setMessage((prev) => prev + e.native);
                                }}
                                className="picker"
                            />
                        </div>
                    )}
                </>
            ) : (
                <h3 className="non-selected-text">
                    click any contact to see the message
                </h3>
            )}
        </div>
    );
};

export default MessageArea;
