import React, { useContext, useState } from "react";
import "../../Styles/addContactModal.css";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { getCookie } from "../../Cookie/cookieConfigure";

const API = "http://localhost:5500/contact/addcontact";

function AddContactModal({ closeModal, handleError, handleSuccess }) {
    const [inputData, setInputData] = useState("");

    const handleClick = async (e) => {
        e.preventDefault();
        const payload = {
            receiverNumber: inputData,
        };
        try {
            await axios.post(API, payload, {
                headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                },
            });
            window.location.reload(false);
            closeModal(false);
            handleSuccess(true);
        } catch (error) {
            closeModal(false);
            handleError(error.response.data);
        }
    };

    return (
        <div className="add-contact-modal-background">
            <div id="add-contact-modal">
                <div id="add-contact-modal-head">
                    <p>add your contact</p>
                    <button
                        onClick={() => {
                            closeModal(false);
                        }}
                    >
                        <ImCross />
                    </button>
                </div>
                <input
                    type="number"
                    value={inputData}
                    autoFocus
                    onChange={(e) => {
                        setInputData(e.target.value);
                    }}
                    placeholder="phone number"
                    id="add-contact-modal-body"
                />
                <div id="add-contact-modal-footer">
                    <button id="closeBtn" onClick={handleClick}>
                        Add
                    </button>
                    <button
                        id="closeBtn"
                        onClick={() => {
                            closeModal(false);
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddContactModal;
