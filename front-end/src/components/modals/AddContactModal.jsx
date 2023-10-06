import React, { useState, useContext } from "react";
import "../../Styles/addContactModal.css";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { context } from "../../context/UserContext";

const API = "http://localhost:5500/contact/addcontact";

function AddContactModal({ closeModal, handleError }) {
    const [inputData, setInputData] = useState("");

    const { user } = useContext(context);

    const handleClick = async (e) => {
        e.preventDefault();
        const payload = {
            receiverNumber: inputData,
            userNumber: user.phone,
        };
        try {
            await axios.post(API, payload);
            closeModal(false);
        } catch (error) {
            console.log(error);
            closeModal(false);
            handleError(true);
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
