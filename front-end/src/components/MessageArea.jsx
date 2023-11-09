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
import axios from "axios";
import { getCookie } from "../Cookie/cookieConfigure";
import Message from "./Message";
import Loadding from "../components/modals/Loadding";
// import { socket } from "../socket";

const MessageArea = () => {
    const { selectedContact } = useContext(context);
    const [inputMessage, setInputMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoadding, setIsLoadding] = useState(false);

    const sendMsg = () => {};
    useEffect(() => {
        const fetchSingleChatMsg = async () => {
            try {
                setIsLoadding(true);
                const endPoint =
                    "http://localhost:5500/contact/getSingleChatMsg";
                const responce = await axios.get(endPoint, {
                    headers: {
                        authorization: `Bearer ${getCookie("token")}`,
                    },
                    params: {
                        selectedUserPhone: selectedContact.phone,
                    },
                });
                if (!responce) throw new Error("no messages");
                setMessages((prev) => [...prev, ...responce.data]);
                setIsLoadding(() => false);
            } catch (error) {
                setIsLoadding(() => false);
                console.log(error);
            }
        };

        const fetchGroupChatMsg = async () => {
            try {
                setIsLoadding(true);
                const endPoint =
                    "http://localhost:5500/contact/getGroupChatMsg";
                const responce = await axios.get(endPoint, {
                    headers: {
                        authorization: `Bearer ${getCookie("token")}`,
                    },
                    params: {
                        groupId: selectedContact.id,
                    },
                });
                if(!responce) throw new Error("no messages");
                setMessages(prev=>[...prev, ...responce.data]);
                console.log(responce.data);
                setIsLoadding(false);
            } catch (error) {
                setIsLoadding(false);
                console.log(error);
            }
        };

        if (selectedContact) {
            if (selectedContact.hasOwnProperty("isGroupChat")) {
                fetchGroupChatMsg();
            } else {
                fetchSingleChatMsg();
            }
        }
        return () => {
            setMessages((prev) => []);
        };
    }, [selectedContact]);

    return (
        <div
            className="message-container"
            style={
                selectedContact
                    ? { backgroundColor: "#63a7be" }
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
                                {selectedContact.isGroupChat
                                    ? null
                                    : selectedContact.status === "online"
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
                        {messages.length ? (
                            messages.map((message, index) => {
                                return (
                                    <Message key={index} message={message} />
                                );
                            })
                        ) : (
                            <span className="no-message">no messages</span>
                        )}
                        {isLoadding && <Loadding />}
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
                            value={inputMessage}
                            autoFocus
                            onChange={(e) => {
                                setInputMessage((prev) => e.target.value);
                            }}
                            placeholder="Type Here"
                        />

                        <VscSend className="send-btn" onClick={sendMsg} />
                    </div>
                    {showEmojiPicker && (
                        <div className="emoji-picker">
                            <Picker
                                data={data}
                                onEmojiSelect={(e) => {
                                    setInputMessage((prev) => prev + e.native);
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
