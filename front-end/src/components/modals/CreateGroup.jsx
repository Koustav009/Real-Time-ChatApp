import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { GoPersonAdd } from "react-icons/go";

const CreateGroup = () => {
    const [groupName, setGroupName] = useState("");
    const [phone, setPhone] = useState();
    const ContactModal = ({name, profile}) => {
        return (
            <div className="contactModal-container">
                <p className="contactModal-name">{name}</p>
                <img src={profile} alt="img" className="contactModal-img" width={20}/>
                <ImCross />
            </div>
        );
    };
    return (
        <div className="create-group-modal-bg">
            <div className="create-group-modal-header">
                <div className="title">create group</div>
                <ImCross />
            </div>
            <div className="create-group-modal-body">
                <input
                    type="text"
                    className="group-name-input"
                    value={groupName}
                    placeholder="group name"
                    onChange={(e) => {
                        setGroupName((prev) => e.target.value);
                    }}
                />
                <div className="select-contact-input">
                    <input
                        type="number"
                        className="group-name-input"
                        value={phone}
                        placeholder="select contact by number"
                        onChange={(e) => {
                            setPhone((prev) => e.target.value);
                        }}
                    />
                    <GoPersonAdd className="add-icon" />
                </div>
                <div className="selected-contacts">
                    <ContactModal name={"pralay"} profile={"blob:http://localhost:3000/24b2e697-76cd-43bf-b349-3958202e958c"}/>
                    <ContactModal name={"pralay"} profile={"blob:http://localhost:3000/24b2e697-76cd-43bf-b349-3958202e958c"}/>
                    <ContactModal name={"pralay"} profile={"blob:http://localhost:3000/24b2e697-76cd-43bf-b349-3958202e958c"}/>
                    <ContactModal name={"pralay"} profile={"blob:http://localhost:3000/24b2e697-76cd-43bf-b349-3958202e958c"}/>
                    <ContactModal name={"pralay"} profile={"blob:http://localhost:3000/24b2e697-76cd-43bf-b349-3958202e958c"}/>
                </div>
            </div>
            <div className="create-group-modal-footer">
                <button>create</button>
                <button>close</button>
            </div>
        </div>
    );
};

export default CreateGroup;
