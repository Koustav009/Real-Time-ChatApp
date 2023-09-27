import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:5500/contact/addcontact";

function AddContactModal() {
    const [inputData, setInputData] = useState("");

    const handleClick = async (e) => {
        e.preventDefault();
        const payload = {
            inputData,
        };
        const responce = await axios.post(API, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(responce);
    };

    const handleClose = () => {
        // instate of i will add use contaxt
        document
            .querySelector("#add-contact-modal")
            .setAttribute("style", "display: none;");
    };

    return (
        <div
            id="add-contact-modal"
            style={{
                backgroundColor: "red",
            }}
        >
            <input
                type="text"
                value={inputData}
                onChange={(e) => {
                    setInputData(e.target.value);
                }}
                placeholder="phone number"
                id="add-contact-phone"
            />
            <button onClick={handleClose}>Close</button>
            <button onClick={handleClick}>Add</button>
        </div>
    );
}

export default AddContactModal;
